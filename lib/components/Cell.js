import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeCellType, changeCellContent, splitCell, mergeCell, deleteCell } from '../actions/CellActions'
import { Converter as MarkdownConverter } from 'showdown'

class Cell extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { cellId, index, type, changeCellContent, partial, dependentCellID, dependent } = this.props
    const rows = this.props.children.split('\n').length
    const renderCellOperationBtn = partial === 'full' ?
      <button onClick={() => this.props.splitCell(cellId)}><span className="fa fa-columns"></span></button> :
      <button onClick={() => this.props.mergeCell(index)}><span className="fa fa-compress"></span></button>

    return (
      <div className={ `cell-component fadeIn col-${ partial } ${ partial === 'half' ? `col-${ dependent }` : '' }` }>
        <textarea
          className="cell-textarea" rows={ rows }
          value={ this.props.children }
          onChange={ ({ target: { value } }) => changeCellContent(cellId, value) }
        />
        <div
          className={ `cell-content ${ type }` }
          dangerouslySetInnerHTML={{ __html: new MarkdownConverter().makeHtml(this.props.children) }}
        ></div>

        <div className="control-panel">
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
  return bindActionCreators({ changeCellContent, changeCellType, splitCell, mergeCell, deleteCell }, dispatch)
}

Cell = connect(mapStateToProps, mapDispatchToProps)(Cell)
export default Cell
