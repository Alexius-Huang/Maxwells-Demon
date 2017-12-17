import 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import { ofType } from 'redux-observable'

let baseURL = 'http://localhost:3001'

const saveFileSystemRequest = ({ getState }) =>
  ajax.post(
    `${baseURL}/save_file_system`,
    { state: getState().FileSystemReducers },
    { 'Content-Type': 'application/json' }
  )

const loadNotebookRequest = id =>
  ajax.post(
    `${baseURL}/load_notebook`,
    { id },
    { 'Content-Type': 'application/json' }
  )

export const selectNotebookEpic = (action$, store) => 
  action$
    .ofType('SELECT_NOTEBOOK')
    .debounceTime(100)
    .mergeMap(({ payload }) => loadNotebookRequest(payload))
    .map(({ response }) => ({
      type: 'SET_CELL_STATE',
      payload: response
    }))

const saveFileSystemActions = [
  'SAVE_FILE_SYSTEM',
  'SELECT_NOTEBOOK'
]

export const saveFileSystemEpic = (action$, store) =>
  action$
    .ofType(...saveFileSystemActions)
    .debounceTime(1000)
    .mergeMap(action => saveFileSystemRequest(store))
    .map(() => {
      console.log('saved notebook')
      return { type: 'SAVE_FILE_SYSTEM_SUCCESS' }
    })
