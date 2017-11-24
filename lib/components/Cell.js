import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeCellType, changeCellContent, showCell } from '../actions/CellActions'
import CellContent from './Cell/CellContent'
import CellTools from './Cell/CellTools'
import Icon from './Icon'

class Cell extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { cellId, cellPositionIndex, type, changeCellContent, partial, dependentCellID, dependent, hide, toolsVisibility, showLangOption, programmable, programResult, content } = this.props
    const rows = content.split('\n').length
    const renderTextarea = ! hide ?
      <textarea
        className="cell-textarea" rows={rows}
        value={ content }
        onChange={({ target: { value } }) => changeCellContent(cellId, value)}
      /> : undefined

    const renderExpandAllCellBtn = hide === 'all' ?
      <button id="expand-all-cell-btn" onClick={() => this.props.showCell(cellId)}><span className="fa fa-angle-double-down"></span> Show More</button> : undefined

    return (
      <div className={ `cell-component fadeIn col-${ partial } ${ partial === 'half' ? `col-${ dependent }` : '' }` }>
        { renderTextarea }

        <CellContent hidden={hide === 'all'} type={type} content={ content } programResult={ programResult } />

        { renderExpandAllCellBtn }
        <CellTools
          visibility={ toolsVisibility }
          id={ cellId }
          positionIndex={ cellPositionIndex }
          partial={ partial }
          hide={ hide }
          type={ type }
          showLangOption={ showLangOption }
          programmable={ programmable }
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
