import { combineEpics } from 'redux-observable'
import {
  saveNotebookEpic,
  saveNotebookProcessEpic
} from './NotebookEpics'
import {
  saveFileSystemEpic,
  selectNotebookEpic
} from './FileSystemEpics'

export const epics = combineEpics(
  saveNotebookEpic,
  saveNotebookProcessEpic,
  saveFileSystemEpic,
  selectNotebookEpic
)
