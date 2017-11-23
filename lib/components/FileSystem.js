import React from 'react'
import {
  toggleVirtualFolder,
  toggleNewVirtualFolderInput,
  newVirtualFolderInputChange,
  newVirtualFolder,
  cancelVirtualFolderInput
} from '../actions/FileSystemActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from './Icon'

class FileSystem extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    /* Render Individual Notebooks */
    for (let { id, folderId, name } of this.props.notebooks) {
      let folder = document.querySelector(`.virtual-folder[data-folder-id="${folderId}"]`)
      let input = document.querySelector(`.virtual-folder-new-input-wrapper[data-folder-id="${folderId}"]`)
      let p = document.createElement('p')
      p.setAttribute('class', 'virtual-notebook-name')
      p.setAttribute('data-notebook-id', id)
      p.innerHTML = `<span class="fa fa-book"></span> ${name}`
      folder.insertBefore(p, input)
    }
  }

  recursiveRenderFolderStructure(structure, index = 0) {
    const renderNewFolderBtn = (
      <button
        className="new-folder"
        onClick={(event) => {
          event.stopPropagation()
          if ( ! structure.expand )         { this.props.toggleVirtualFolder(structure.id) }
          if ( ! structure.newFolderInput ) { this.props.toggleNewVirtualFolderInput(structure.id) }
          document.getElementById(`virtual-folder-new-input-${structure.id}`).focus()
        }}
      ><Icon name="folder-o" /><Icon name="plus" /></button>
    )

    const renderNewFileBtn = (
      <button
        className="new-file"
        onClick={(event) => {
          event.stopPropagation()
          console.log('new file')
        }}
      ><Icon name="file-o" /><Icon name="plus" /></button>
    )

    const renderVirtualFolderName = (
      <p
        className="virtual-folder-name"
        onClick={(event) => {
          event.stopPropagation()
          this.props.toggleVirtualFolder(structure.id)
        }}
      >
        <Icon name={ `folder${ structure.expand ? '-open' : '' }` } /> {structure.folderName}
        { renderNewFolderBtn }
        { renderNewFileBtn }
      </p>
    )

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
          onClick={() => this.props.cancelVirtualFolderInput(structure.id) }
        ><Icon name="times" /></button>
      </div>
    )

    const renderVirtualSubfolderStructure = structure.subFolders.map((folder, i) => this.recursiveRenderFolderStructure(folder, index + i))

    return (
      <div
        className="virtual-folder"
        key={ index }
        data-expand={ structure.expand }
        data-folder-id={ structure.id }
      >
        { renderVirtualFolderName }
        { renderVirtualFolderInput }
        { renderVirtualSubfolderStructure }
      </div>
    )
  }

  render() {
    const renderFolderStructure = this.recursiveRenderFolderStructure(this.props.structure)

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
    cancelVirtualFolderInput
  }, dispatch)
}

FileSystem = connect(mapStateToProps, mapDispatchToProps)(FileSystem)
export default FileSystem
