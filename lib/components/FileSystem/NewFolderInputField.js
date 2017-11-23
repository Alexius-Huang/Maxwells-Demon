import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  newVirtualFolderInputChange,
  newVirtualFolder,
  cancelAllInput
} from '../../actions/FileSystemActions'
import Icon from '../Icon'

class NewFolderInputField extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { show, id, value } = this.props

    return (
      <div
        className={`virtual-folder-new-input-wrapper ${ show ? '' : 'hide' }`}
        data-folder-id={id}
      >
        <input
          type="text" placeholder="New Folder Name" className="virtual-folder-new-input"
          id={`virtual-folder-new-input-${id}`} value={value}
          onChange={(event) => this.props.newVirtualFolderInputChange(id, event.target.value)}
        />
        <button
          className="virtual-folder-input-confirm confirm"
          onClick={(event) => {
            if (value) {
              this.props.newVirtualFolder(id)
            } else {
              /* Show Error */
              console.log('Folder name should not be empty')
            }
          }}
        ><Icon name="check" /></button>
        <button
          className="virtual-folder-input-cancel cancel"
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
    newVirtualFolderInputChange,
    newVirtualFolder,
    cancelAllInput
  }, dispatch)
}

NewFolderInputField = connect(undefined, mapDispatchToProps)(NewFolderInputField)
export default NewFolderInputField
