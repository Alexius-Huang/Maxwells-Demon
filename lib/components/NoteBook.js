import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { newCell } from '../actions/CellActions'
import Cell from './Cell'
import Icon from './Icon'

class NoteBook extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { cells } = this.props
    const renderCells = cells.map(({ id, type, content, partial, dependentCellID, dependent, hide }, cellPositionIndex) => 
      <Cell key={ id } cellPositionIndex={ cellPositionIndex } cellId={ id } type={ type } partial={ partial } dependentCellID={ dependentCellID } dependent={ dependent } hide={ hide }>{ content }</Cell>)

    return (
      <div className="notebook-component">
        { renderCells }

        <button
          id="new-cell-btn"
          onClick={ () => this.props.newCell('markdown') }
        ><Icon name="plus"/> New Cell</button>
      </div>
    )
  }
}

function mapStateToProps({ CellReducers: { cells } }) {
  return { cells }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ newCell }, dispatch)
}

NoteBook = connect(mapStateToProps, mapDispatchToProps)(NoteBook)
export default NoteBook
