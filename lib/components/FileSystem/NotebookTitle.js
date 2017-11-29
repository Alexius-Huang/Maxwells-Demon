import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from '../Icon'
import { selectNotebook } from '../../actions/FileSystemActions'

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
    selectNotebook
  }, dispatch)
}

NotebookTitle = connect(undefined, mapDispatchToProps)(NotebookTitle)
export default NotebookTitle
