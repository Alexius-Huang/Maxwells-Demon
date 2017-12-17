import { combineEpics } from 'redux-observable'
import { saveFileSystemEpic, selectNotebookEpic } from './FileSystemEpics'

export const epics = combineEpics(
  saveFileSystemEpic,
  selectNotebookEpic
)
