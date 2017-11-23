import React from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import Icon from '../Icon'

class NotebookTitle extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { id, name } = this.props

    return (
      <p className="virtual-notebook-name" data-notebook-id={id}>
        <Icon name="book" /> {name}
      </p>
    )
  }
}

// function mapStateToProps(state) {
//   return {}
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({}, dispatch)
// }

// NotebookTitle = connect(undefined, undefined)(NotebookTitle)
export default NotebookTitle
