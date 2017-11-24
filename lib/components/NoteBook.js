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
    const renderCells = cells.map((cell, cellPositionIndex) => (
      <Cell
        key={ cellPositionIndex }
        cell={ Object.assign({}, { ...cell, positionIndex: cellPositionIndex }) }
      />
    ))

    return (
      <div className="notebook-component">
        { renderCells }

        <button
          id="new-cell-btn"
          onClick={ () => this.props.newCell('Markdown') }
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
