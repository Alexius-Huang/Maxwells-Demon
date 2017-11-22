import React from 'react'
import NoteBook from './components/NoteBook'
import FileSystem from './components/FileSystem'

export default class App extends React.Component {
  render() {
    return (
      <div id="app-wrapper">
        <FileSystem />
        <NoteBook />
      </div>
    )
  }
}
