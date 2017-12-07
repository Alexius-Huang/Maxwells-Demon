import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  newNotebookInputChange,
  cancelAllInput
} from '../../actions/FileSystemActions'
import { newNotebook } from '../../thunks/FileSystemThunks'
import Icon from '../Icon'

class NewNotebookInputField extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { show, id, value } = this.props

    return (
      <div
        className={`notebook-new-input-wrapper ${ show ? '' : 'hide' }`}
        data-folder-id={id}
      >
        <input
          type="text" placeholder="New Notebook Name" className="notebook-new-input"
          id={`notebook-new-input-${id}`} value={value}
          onChange={(event) => this.props.newNotebookInputChange(id, event.target.value)}
        />
        <button
          className="notebook-input-confirm confirm"
          onClick={(event) => {
            if (value) {
              this.props.newNotebook(id)
            } else {
              /* Show Error */
              console.log('Notebook name should not be empty')
            }
          }}
        ><Icon name="check" /></button>
        <button
          className="notebook-input-cancel cancel"
          onClick={() => this.props.cancelAllInput()}
        ><Icon name="times" /></button>
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {}
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    newNotebookInputChange,
    newNotebook,
    cancelAllInput
  }, dispatch)
}

NewNotebookInputField = connect(undefined, mapDispatchToProps)(NewNotebookInputField)
export default NewNotebookInputField
