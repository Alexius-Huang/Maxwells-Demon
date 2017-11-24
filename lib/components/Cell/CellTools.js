import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  showCell,
  hideCell,
  hideCellTextarea,
  mergeCell,
  splitCell,
  switchCell,
  deleteCell,
  showAllCells,
  processCellCode
} from '../../actions/CellActions'
import CellTypeField from './CellTypeField'
import Icon from '../Icon'

class CellTools extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if ( ! this.props.visibility) return <div className="cell-component-tools"></div>

    const { id, positionIndex, partial, hide, type, showLangOption, programmable } = this.props.cell

    let renderTextareaVisibilityBtn = !hide ?
      <button onClick={() => this.props.hideCellTextarea(id)}><Icon name="angle-up" /></button> :
      <button onClick={() => this.props.showCell(id)}><Icon name="angle-down" /></button>

    let renderCellVisibilityBtn = hide !== 'all' ?
      <button onClick={() => this.props.hideCell(id)}><Icon name="angle-double-up" /></button> :
      <button onClick={() => this.props.showCell(id)}><Icon name="angle-double-down" /></button>

    const renderSwitchCellBtn = partial === 'half' ?
      <button onClick={() => this.props.switchCell(id)}><Icon name="arrows-h" /></button> : undefined

    const renderCellOperationBtn = partial === 'full' ?
      <button onClick={() => this.props.splitCell(id)}><Icon name="columns" /></button> :
      <button onClick={() => this.props.mergeCell(positionIndex)}><Icon name="compress" /></button>

    const renderDeleteCellBtn = <button onClick={() => this.props.deleteCell(id)} ><Icon name="trash"/></button>

    const renderRunCodeBtn = programmable ?
      <button onClick={() => this.props.processCellCode(id)}><Icon name="terminal"/></button> : undefined

    return (
      <div className="cell-component-tools">
        <CellTypeField type={ type } id={ id } showLangOption={ showLangOption } />
        {renderRunCodeBtn}
        {renderTextareaVisibilityBtn}
        {renderCellVisibilityBtn}
        {renderSwitchCellBtn}
        {renderCellOperationBtn}
        {renderDeleteCellBtn}
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {}
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    showCell,
    hideCell,
    hideCellTextarea,
    mergeCell,
    splitCell,
    switchCell,
    deleteCell,
    processCellCode
  }, dispatch)
}

CellTools = connect(undefined, mapDispatchToProps)(CellTools)
export default CellTools
