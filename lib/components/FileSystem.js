import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from './Icon'
import FolderTitle from './FileSystem/FolderTitle'
import NotebookTitle from './FileSystem/NotebookTitle'
import NewFolderInputField from './FileSystem/NewFolderInputField'
import NewNotebookInputField from './FileSystem/NewNotebookInputField'

class FileSystem extends React.Component {
  constructor(props) {
    super(props)
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
  }, notebooks, index = 0) {

    const renderNotebooks = notebooks
      .filter(({ folderID }) => folderID === id)
      .map(({ name }, index) => <NotebookTitle key={index} name={name} id={id} /> )

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
            this.recursiveRenderFolderStructure(folder, notebooks, index + i))
        }
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

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({}, dispatch)
// }

FileSystem = connect(mapStateToProps, undefined)(FileSystem)
export default FileSystem
