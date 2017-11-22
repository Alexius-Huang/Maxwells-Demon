import React from 'react'
import { toggleNotebookModal } from '../actions/FileSystemActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class FileSystem extends React.Component {
  constructor(props) {
    super(props)
  }

  recursiveRenderFolderStructure(structure, index = 0) {
    return (
      <div className="virtual-folder" key={ index }>
        <p><span className="fa fa-folder"></span> { structure.folderName }</p>
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
    toggleNotebookModal
  }, dispatch)
}

FileSystem = connect(mapStateToProps, mapDispatchToProps)(FileSystem)
export default FileSystem
