import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from '../Icon'
import { selectNotebook } from '../../actions/FileSystemActions'
import { setCellState } from '../../actions/CellActions'
import axios from 'axios'

let baseURL = 'http://localhost:3001'

class NotebookTitle extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { id, name, current } = this.props

    return (
      <p
        className={`virtual-notebook-name ${ current ? 'current' : '' }`}
        data-notebook-id={id}
        onClick={() => {
          if ( ! current) {
            this.props.selectNotebook(id)
            axios.post(`${ baseURL }/load_notebook`, { id: id })
                 .then(({ data }) => this.props.setCellState(data))
          }
        }}
      >
        <Icon name="book" /> {name}
      </p>
    )
  }
}

// function mapStateToProps(state) {
//   return {}
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectNotebook,
    setCellState
  }, dispatch)
}

NotebookTitle = connect(undefined, mapDispatchToProps)(NotebookTitle)
export default NotebookTitle
