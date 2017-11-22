import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { newCell, deleteCell } from '../actions/CellActions'
import Cell from './Cell'

class NoteBook extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { cells } = this.props
    const renderCells = cells.map(({ id, type, content }) => <Cell key={ id } cellId={ id } type={ type }>{ content }</Cell>)

    return (
      <div className="notebook-component">
        { renderCells }

        <button
          id="new-cell-btn"
          onClick={ () => this.props.newCell('markdown') }
        ><span className="fa fa-plus"></span> New Cell</button>
      </div>
    )
  }
}

function mapStateToProps({ CellReducers: { cells } }) {
  return { cells }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ newCell, deleteCell }, dispatch)
}

NoteBook = connect(mapStateToProps, mapDispatchToProps)(NoteBook)
export default NoteBook
