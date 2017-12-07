import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from './Icon'
import FolderTitle from './FileSystem/FolderTitle'
import NotebookTitle from './FileSystem/NotebookTitle'
import NewFolderInputField from './FileSystem/NewFolderInputField'
import NewNotebookInputField from './FileSystem/NewNotebookInputField'
import { loadFileSystem } from '../thunks/FileSystemThunks'
import axios from 'axios'

let baseURL = 'http://localhost:3001'

class FileSystem extends React.Component {
  constructor(props) {
    super(props)
  }

  /* Async Request for File System */
  componentDidMount() {
    this.props.loadFileSystem()
  }

  recursiveRenderFolderStructure({
    id,
    expand,
    folderName,
    subFolders,
    newFolderInput,
    newFolderInputValue,
    newNotebookInput,
    newNotebookInputValue,
  }, notebooks, targetNotebook, index = 0) {

    let currentFolderID = id
    const renderNotebooks = notebooks
      .filter(({ folderID }) => folderID === currentFolderID)
      .map(({ name, id }, index) => <NotebookTitle current={ id === targetNotebook } key={index} name={name} id={id} />)

    return (
      <div
        className="virtual-folder"
        key={ index }
        data-expand={ expand }
        data-folder-id={ id }
      >
        <FolderTitle
          expand={ expand }
          folderName={ folderName }
          id={ id }
          folderInputValue={ newFolderInputValue }
          notebookInputValue={ newNotebookInputValue }
        />
        { renderNotebooks }

        <NewFolderInputField   show={ newFolderInput   } id={ id } value={ newFolderInputValue   } />
        <NewNotebookInputField show={ newNotebookInput } id={ id } value={ newNotebookInputValue } />

        {
          /* Recursively render rest of the folder structure */
          subFolders.map((folder, i) =>
            this.recursiveRenderFolderStructure(folder, notebooks, targetNotebook, index + i))
        }
      </div>
    )
  }

  render() {
    if ( ! this.props.loaded) return <div className="filesystem-component"></div>
    const renderFolderStructure = this.recursiveRenderFolderStructure(this.props.structure, this.props.notebooks, this.props.targetNotebook)

    return (
      <div className="filesystem-component">
        { renderFolderStructure }
      </div>
    )
  }
}

function mapStateToProps({ FileSystemReducers: { loaded, modal, structure, notebooks, targetNotebook } }) {
  return { loaded, modal, structure, notebooks, targetNotebook }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadFileSystem
  }, dispatch)
}

FileSystem = connect(mapStateToProps, mapDispatchToProps)(FileSystem)
export default FileSystem
