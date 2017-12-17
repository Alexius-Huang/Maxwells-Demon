import { combineEpics } from 'redux-observable'
import {
  saveNotebookEpic
} from './NotebookEpics'
import {
  saveFileSystemEpic,
  selectNotebookEpic
} from './FileSystemEpics'

export const epics = combineEpics(
  saveNotebookEpic,
  saveFileSystemEpic,
  selectNotebookEpic
)
