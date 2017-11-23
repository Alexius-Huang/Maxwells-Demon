import React from 'react'
import NoteBook from './components/NoteBook'
import FileSystem from './components/FileSystem'
import TopNavigationBar from './components/TopNavigationBar'

export default class App extends React.Component {
  render() {
    return (
      <div id="app-wrapper">
        <TopNavigationBar />
        <FileSystem />
        <NoteBook />
      </div>
    )
  }
}
