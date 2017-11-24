import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeCellType, changeCellContent, showCell } from '../actions/CellActions'
import { Converter as MarkdownConverter } from 'showdown'
import CellTools from './Cell/CellTools'
import Icon from './Icon'

class Cell extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { cellId, cellPositionIndex, type, changeCellContent, partial, dependentCellID, dependent, hide, toolsVisibility } = this.props
    const rows = this.props.children.split('\n').length

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
        <CellTools
          visibility={ toolsVisibility }
          id={ cellId }
          positionIndex={ cellPositionIndex }
          partial={ partial }
          hide={ hide }
        />
      </div>
    )
  }
}

function mapStateToProps({ CellReducers: { toolsVisibility } }) {
  return { toolsVisibility }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeCellContent,
    changeCellType,
    showCell,
  }, dispatch)
}

Cell = connect(mapStateToProps, mapDispatchToProps)(Cell)
export default Cell
