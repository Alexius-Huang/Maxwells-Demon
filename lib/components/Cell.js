import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeCellType, changeCellContent, splitCell, mergeCell, deleteCell, hideCell, hideCellTextarea, showCell } from '../actions/CellActions'
import { Converter as MarkdownConverter } from 'showdown'

class Cell extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { cellId, index, type, changeCellContent, partial, dependentCellID, dependent, hide } = this.props
    const rows = this.props.children.split('\n').length

    let renderTextareaVisibilityBtn = ! hide ?
      <button onClick={() => this.props.hideCellTextarea(cellId)}><span className="fa fa-angle-up"></span></button> :
      <button onClick={() => this.props.showCell(cellId)}><span className="fa fa-angle-down"></span></button>

    let renderCellVisibilityBtn = hide !== 'all' ?
      <button onClick={() => this.props.hideCell(cellId)}><span className="fa fa-angle-double-up"></span></button> :
      <button onClick={() => this.props.showCell(cellId)}><span className="fa fa-angle-double-down"></span></button>

    const renderCellOperationBtn = partial === 'full' ?
      <button onClick={() => this.props.splitCell(cellId)}><span className="fa fa-columns"></span></button> :
      <button onClick={() => this.props.mergeCell(index)}><span className="fa fa-compress"></span></button>

    const renderTextarea = ! hide ?
      <textarea
        className="cell-textarea" rows={rows}
        value={this.props.children}
        onChange={({ target: { value } }) => changeCellContent(cellId, value)}
      /> : undefined

    const renderContent = (
      <div
        className={`cell-content ${type} ${ hide !== 'all' ? '' : 'hidden-content' }`}
        dangerouslySetInnerHTML={{ __html: new MarkdownConverter().makeHtml(this.props.children) }}
      ></div>
    )

    const renderExpandAllCellBtn = hide === 'all' ?
      <button id="expand-all-cell-btn" onClick={() => this.props.showCell(cellId)}><span className="fa fa-angle-double-down"></span> Show More</button> : undefined

    return (
      <div className={ `cell-component fadeIn col-${ partial } ${ partial === 'half' ? `col-${ dependent }` : '' }` }>
        { renderTextarea }
        { renderContent }
        { renderExpandAllCellBtn }

        <div className="control-panel">
          { renderTextareaVisibilityBtn }
          { renderCellVisibilityBtn }
          { renderCellOperationBtn }
          <button onClick={() => this.props.deleteCell(cellId)} ><span className="fa fa-trash"></span></button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeCellContent,
    changeCellType,
    splitCell,
    mergeCell,
    deleteCell,
    showCell,
    hideCell,
    hideCellTextarea
  }, dispatch)
}

Cell = connect(mapStateToProps, mapDispatchToProps)(Cell)
export default Cell
