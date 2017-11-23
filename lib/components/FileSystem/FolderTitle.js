import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  toggleVirtualFolder,
  toggleNewVirtualFolderInput,
  newVirtualFolderInputChange,
  toggleNewNotebookInput,
  newNotebookInputChange,
  cancelAllInput
} from '../../actions/FileSystemActions'
import Icon from '../Icon'

class FolderTitle extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { expand, folderName, id, folderInputValue, notebookInputValue } = this.props

    const renderNewFolderBtn = (
      <button
        className="new-folder"
        onClick={(event) => {
          event.stopPropagation()
          if (!expand) { this.props.toggleVirtualFolder(id) }

          let preserveInputValue = folderInputValue || ''
          this.props.cancelAllInput()
          this.props.toggleNewVirtualFolderInput(id)
          this.props.newVirtualFolderInputChange(id, preserveInputValue)

          document.getElementById(`virtual-folder-new-input-${id}`).focus()
        }}
      ><Icon name="folder-o" /><Icon name="plus" /></button>
    )

    const renderNewNotebookBtn = (
      <button
        className="new-file"
        onClick={(event) => {
          event.stopPropagation()
          if (!expand) { this.props.toggleVirtualFolder(id) }

          let preserveInputValue = notebookInputValue || ''
          this.props.cancelAllInput()
          this.props.toggleNewNotebookInput(id)
          this.props.newNotebookInputChange(id, preserveInputValue)

          document.getElementById(`notebook-new-input-${id}`).focus()
        }}
      ><Icon name="file-o" /><Icon name="plus" /></button>
    )

    let iconName = folderName === 'KERNEL' ? 'cubes' : `folder${ expand ? '-open' : '' }`

    return (
      <p
        className="virtual-folder-name"
        onClick={(event) => {
          if (folderName === 'KERNEL') return
          event.stopPropagation()
          this.props.toggleVirtualFolder(id)
        }}
      >
        <Icon name={ iconName } /> {folderName}
        {renderNewFolderBtn}
        {renderNewNotebookBtn}
      </p>
    )
  }
}

// function mapStateToProps(state) {
//   return {}
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleVirtualFolder,
    toggleNewVirtualFolderInput,
    newVirtualFolderInputChange,
    toggleNewNotebookInput,
    newNotebookInputChange,
    cancelAllInput
  }, dispatch)
}

FolderTitle = connect(undefined, mapDispatchToProps)(FolderTitle)
export default FolderTitle
