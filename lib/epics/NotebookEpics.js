import 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import { ofType, mapTo } from 'redux-observable'

let baseURL = 'http://localhost:3001'

const saveNotebookRequest = ({ getState }) =>
  ajax.post(
    `${baseURL}/save_notebook`,
    { state: getState().CellReducers },
    { 'Content-Type': 'application/json' }
  )

const saveNotebookActions = [
  'SAVE_NOTEBOOK',
  'NEW_CELL',
  'DELETE_CELL',
  'SPLIT_CELL',
  'MERGE_CELL',
  'SWITCH_CELL',
  'CHANGE_CELL_TYPE',
  'CHANGE_CELL_CONTENT'
]

export const saveNotebookEpic = (action$, store) =>
  action$
    .ofType(...saveNotebookActions)
    .debounceTime(1000)
    .mergeMap(action => saveNotebookRequest(store))
    .map(() => ({ type: 'SAVE_NOTEBOOK_SUCCESS'}))
