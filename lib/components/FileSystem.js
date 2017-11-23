import React from 'react'
import {
  toggleVirtualFolder,
  toggleNewVirtualFolderInput,
  newVirtualFolderInputChange,
  newVirtualFolder,
  toggleNewNotebookInput,
  newNotebookInputChange,
  newNotebook,
  cancelAllInput
} from '../actions/FileSystemActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from './Icon'

class FileSystem extends React.Component {
  constructor(props) {
    super(props)
  }

  recursiveRenderFolderStructure(structure, notebooks, index = 0) {
    const renderNewFolderBtn = (
      <button
        className="new-folder"
        onClick={(event) => {
          event.stopPropagation()
          if (!structure.expand) { this.props.toggleVirtualFolder(structure.id) }

          let preserveInputValue = structure.newFolderInputValue || ''
          this.props.cancelAllInput()
          this.props.toggleNewVirtualFolderInput(structure.id)
          this.props.newVirtualFolderInputChange(structure.id, preserveInputValue)

          document.getElementById(`virtual-folder-new-input-${structure.id}`).focus()
        }}
      ><Icon name="folder-o" /><Icon name="plus" /></button>
    )

    const renderNewNotebookBtn = (
      <button
        className="new-file"
        onClick={(event) => {
          event.stopPropagation()
          if (!structure.expand) { this.props.toggleVirtualFolder(structure.id) }

          let preserveInputValue = structure.newNotebookInputValue || ''
          this.props.cancelAllInput()
          this.props.toggleNewNotebookInput(structure.id)
          this.props.newNotebookInputChange(structure.id, preserveInputValue)

          document.getElementById(`notebook-new-input-${structure.id}`).focus()
        }}
      ><Icon name="file-o" /><Icon name="plus" /></button>
    )

    const renderVirtualFolderName = structure.folderName !== 'KERNEL' ? (
      <p
        className="virtual-folder-name"
        onClick={(event) => {
          event.stopPropagation()
          this.props.toggleVirtualFolder(structure.id)
        }}
      >
        <Icon name={ `folder${ structure.expand ? '-open' : '' }` } /> {structure.folderName}
        { renderNewFolderBtn }
        { renderNewNotebookBtn }
      </p>
    ) : (
      <p className="virtual-folder-name">
        <Icon name="cubes" /> KERNEL
        {renderNewFolderBtn}
        {renderNewNotebookBtn}
      </p>
    )

    const renderNotebooks = notebooks
      .filter(({ folderID }) => folderID === structure.id)
      .map(({ name }, index) => (
        <p className="virtual-notebook-name" key={index} data-notebook-id={structure.id}>
          <Icon name="book" /> { name }
        </p>
      ))

    const renderVirtualFolderInput = (
      <div
        className={`virtual-folder-new-input-wrapper ${structure.newFolderInput ? '' : 'hide'}`}
        data-folder-id={ structure.id }
      >
        <input
          type="text" placeholder="New Folder Name" className="virtual-folder-new-input"
          id={`virtual-folder-new-input-${structure.id}`} value={structure.newFolderInputValue}
          onChange={(event) => this.props.newVirtualFolderInputChange(structure.id, event.target.value)}
        />
        <button
          className="virtual-folder-input-confirm confirm"
          onClick={(event) => {
            if (structure.newFolderInputValue) {
              this.props.newVirtualFolder(structure.id)
            } else {
              /* Show Error */
              console.log('Folder name should not be empty')
            }
          }}
        ><Icon name="check" /></button>
        <button
          className="virtual-folder-input-cancel cancel"
          onClick={() => this.props.cancelAllInput() }
        ><Icon name="times" /></button>
      </div>
    )

    const renderNotebookInput = (
      <div
        className={`notebook-new-input-wrapper ${structure.newNotebookInput ? '' : 'hide'}`}
        data-folder-id={structure.id}
      >
        <input
          type="text" placeholder="New Notebook Name" className="notebook-new-input"
          id={`notebook-new-input-${structure.id}`} value={structure.newNotebookInputValue}
          onChange={(event) => this.props.newNotebookInputChange(structure.id, event.target.value)}
        />
        <button
          className="notebook-input-confirm confirm"
          onClick={(event) => {
            if (structure.newNotebookInputValue) {
              this.props.newNotebook(structure.id)
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

    const renderVirtualSubfolderStructure = structure.subFolders.map((folder, i) => this.recursiveRenderFolderStructure(folder, notebooks, index + i))

    return (
      <div
        className="virtual-folder"
        key={ index }
        data-expand={ structure.expand }
        data-folder-id={ structure.id }
      >
        { renderVirtualFolderName }
        { renderNotebooks }
        { renderVirtualFolderInput }
        { renderNotebookInput }
        { renderVirtualSubfolderStructure }
      </div>
    )
  }

  render() {
    const renderFolderStructure = this.recursiveRenderFolderStructure(this.props.structure, this.props.notebooks)

    return (
      <div className="filesystem-component">
        { renderFolderStructure }
      </div>
    )
  }
}

function mapStateToProps({ FileSystemReducers: { modal, structure, notebooks } }) {
  return { modal, structure, notebooks }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleVirtualFolder,
    toggleNewVirtualFolderInput,
    newVirtualFolderInputChange,
    newVirtualFolder,
    toggleNewNotebookInput,
    newNotebookInputChange,
    newNotebook,
    cancelAllInput
  }, dispatch)
}

FileSystem = connect(mapStateToProps, mapDispatchToProps)(FileSystem)
export default FileSystem
