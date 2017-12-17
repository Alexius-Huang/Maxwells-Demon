import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadFileSystem } from '../thunks/FileSystemThunks'
import { saveFileSystem } from '../actions/FileSystemActions'
import FolderStructure from './FileSystem/FolderStructure'

class FileSystem extends React.Component {
  constructor(props) {
    super(props)
  }

  /* Async Request for File System */
  componentDidMount() {
    this.props.loadFileSystem()
  }

  render() {
    if ( ! this.props.loaded) return <div className="filesystem-component"></div>
    const { structure, notebooks, targetNotebook } = this.props

    return (
      <div className="filesystem-component">
        <FolderStructure structure={structure} notebooks={notebooks} targetNotebook={targetNotebook} />
      </div>
    )
  }
}

function mapStateToProps({ FileSystemReducers: { loaded, structure, notebooks, targetNotebook } }) {
  return { loaded, structure, notebooks, targetNotebook }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadFileSystem,
    saveFileSystem
  }, dispatch)
}

FileSystem = connect(mapStateToProps, mapDispatchToProps)(FileSystem)
export default FileSystem
