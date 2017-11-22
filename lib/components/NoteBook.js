import React from 'react'
import { connect } from 'react-redux'
// import { newCell, deleteCell } from '../actions/CellActions'
import Cell from './Cell'

class NoteBook extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const renderCells = this.props.cells.map(({ id, type, content }) => <Cell key={ id } cellId={ id } type={ type }>{ content }</Cell>)

    return (
      <div className="notebook-component">
        { renderCells }
      </div>
    )
  }
}

function mapStateToProps({ CellReducers: { cells } }) {
  return { cells }
}

// function mapDispatchToProps(dispatch) {}

NoteBook = connect(mapStateToProps)(NoteBook)
export default NoteBook
