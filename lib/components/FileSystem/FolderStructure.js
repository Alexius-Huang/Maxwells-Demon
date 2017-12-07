import React from 'react'
import Icon from '../Icon'
import FolderTitle from './FolderTitle'
import NotebookTitle from './NotebookTitle'
import NewFolderInputField from './NewFolderInputField'
import NewNotebookInputField from './NewNotebookInputField'
import { loadFileSystem } from '../../thunks/FileSystemThunks'

class FolderStructure extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { structure, notebooks, targetNotebook } = this.props
    const {
      id,
      expand,
      folderName,
      subFolders,
      newFolderInput,
      newFolderInputValue,
      newNotebookInput,
      newNotebookInputValue,
    } = structure

    let currentFolderID = id
    const renderNotebooks = notebooks
      .filter(({ folderID }) => folderID === currentFolderID)
      .map(({ name, id }, index) => <NotebookTitle current={id === targetNotebook} key={index} name={name} id={id} />)

    const renderSubFolders = subFolders && subFolders.length !== 0 ? subFolders.map((folder, i) =>
      <FolderStructure key={i} structure={folder} notebooks={notebooks} targetNotebook={targetNotebook} />
    ) : undefined

    return (
      <div
        className="virtual-folder"
        data-expand={expand}
        data-folder-id={id}
      >
        <FolderTitle
          expand={expand}
          folderName={folderName}
          id={id}
          folderInputValue={newFolderInputValue}
          notebookInputValue={newNotebookInputValue}
        />
        {renderNotebooks}

        <NewFolderInputField show={newFolderInput} id={id} value={newFolderInputValue} />
        <NewNotebookInputField show={newNotebookInput} id={id} value={newNotebookInputValue} />

        {renderSubFolders}
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {}
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({}, dispatch)
// }

// FolderStructure = connect(undefined, undefined)(FolderStructure)
export default FolderStructure
