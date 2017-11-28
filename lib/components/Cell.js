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
    const { cell, toolsVisibility, changeCellContent, showCell, style } = this.props
    const { id, type, partial, dependentCellID, dependent, hide, showLangOption, programmable, programResult, content, positionIndex } = cell
    const rows = content.split('\n').length
    const { fontSize, lineHeight } = this.props.style.textarea
    const renderTextarea = ! hide ?
      <textarea
        className="cell-textarea" rows={rows}
        style={{ fontSize: `${ fontSize }pt`, lineHeight: `${ lineHeight }pt` }}
        value={ content }
        onChange={({ target: { value } }) => changeCellContent(id, value)}
      /> : undefined

    const renderExpandAllCellBtn = hide === 'all' ?
      <button id="expand-all-cell-btn" onClick={() => showCell(id)}><span className="fa fa-angle-double-down"></span> Show More</button> : undefined

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

function mapStateToProps({ CellReducers: { toolsVisibility }, StyleReducers }) {
  return { toolsVisibility, style: StyleReducers }
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
