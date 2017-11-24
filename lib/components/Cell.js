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
    const { cell, toolsVisibility, changeCellContent } = this.props
    const { id, type, partial, dependentCellID, dependent, hide, showLangOption, programmable, programResult, content, positionIndex } = cell
    const rows = content.split('\n').length
    const renderTextarea = ! hide ?
      <textarea
        className="cell-textarea" rows={rows}
        value={ content }
        onChange={({ target: { value } }) => changeCellContent(id, value)}
      /> : undefined

    const renderExpandAllCellBtn = hide === 'all' ?
      <button id="expand-all-cell-btn" onClick={() => this.props.showCell(id)}><span className="fa fa-angle-double-down"></span> Show More</button> : undefined

    return (
      <div className={ `cell-component fadeIn col-${ partial } ${ partial === 'half' ? `col-${ dependent }` : '' }` }>
        { renderTextarea }

        <CellContent cell={ cell } visibility={ hide === 'all' } />

        { renderExpandAllCellBtn }
        <CellTools cell={ cell } visibility={ toolsVisibility } />
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
