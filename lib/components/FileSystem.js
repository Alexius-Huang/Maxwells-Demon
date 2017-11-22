import React from 'react'
import {
  toggleVirtualFolder,
  newVirtualFolderInput,
  newVirtualFolderInputChange
} from '../actions/FileSystemActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class FileSystem extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    /* Render Individual Notebooks */
    for (let { id, folderId, name } of this.props.notebooks) {
      let folder = document.querySelector(`[data-folder-id="${folderId}"]`)
      let p = document.createElement('p')
      p.setAttribute('class', 'virtual-notebook')
      p.setAttribute('data-notebook-id', id)
      p.innerHTML = `<span class="fa fa-book"></span> ${name}`
      folder.appendChild(p)
    }
  }

  recursiveRenderFolderStructure(structure, index = 0) {
    return (
      <div
        className="virtual-folder"
        key={ index }
        data-expand={ structure.expand }
        data-folder-id={ structure.id }
      >
        <p onClick={(event) => {
          event.stopPropagation()
          this.props.toggleVirtualFolder(structure.id)
        }}><span className={ `fa fa-folder${ structure.expand ? '-open' : '' }` }></span> { structure.folderName }</p>

        <input
          className={ `virtual-folder-new-input ${structure.newFolderInput ? 'hide' : ''}` }
          type="text"
          onChange={ (event) => this.props.newVirtualFolderInputChange(structure.id, event.target.value) }
          value={ structure.newFolderInputValue }
        />

        { structure.subFolders.map((folder, i) => this.recursiveRenderFolderStructure(folder, index + i)) }
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
    newVirtualFolderInput,
    newVirtualFolderInputChange
  }, dispatch)
}

FileSystem = connect(mapStateToProps, mapDispatchToProps)(FileSystem)
export default FileSystem
