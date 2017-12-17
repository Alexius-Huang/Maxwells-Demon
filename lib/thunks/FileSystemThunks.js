import { setFileSystemState, setTargetNotebook, selectNotebook } from '../actions/FileSystemActions'
import { setCellState } from '../actions/CellActions'
import axios from 'axios'

let baseURL = 'http://localhost:3001'

let traverseTree = function (structure, callback) {
  if (callback(structure) === 'break') return
  if (structure.subFolders.length) for (let folder of structure.subFolders) traverseTree(folder, callback)
}

function newNotebookData(id, name) {
  return {
    id: id,
    loaded: true,
    cells: [
      {
        id: 1,
        type: "Markdown",
        content: `# Welcome ${name}!`,
        partial: "full",
        dependentCellID: null,
        dependent: null,
        hide: false,
        showLangOption: false,
        programmable: false,
        programResult: ""
      },
    ],
    cellIDCounter: 1,
    toolsVisibility: true
  }
}

export function loadFileSystem() {
  return (dispatch, getState) => {
    /* Load file system's state */
    axios.post(`${baseURL}/load_file_system`)
      .then(({ data }) => {
        dispatch(setFileSystemState(data))
        return axios.post(`${baseURL}/load_notebook`, { id: data.targetNotebook })
      })
      .then( ({ data }) => dispatch(setCellState(data)) )
  }
}

export function newNotebook(folderID) {
  return (dispatch, getState) => {
    let state = getState().FileSystemReducers
    let structure = { ...state.structure }, name
    let incNotebookCounter = state.notebookCounter + 1
    traverseTree(structure, (folder) => {
      if (folder.id === folderID) {
        folder.newNotebookInput = false
        name = folder.newNotebookInputValue
        folder.newNotebookInputValue = ''
        return 'break'
      }
    })

    let newState = {
      ...state,
      structure,
      notebookCounter: incNotebookCounter,
      notebooks: [...state.notebooks, { id: incNotebookCounter, folderID, name }]
    }

    axios.all([
      axios.post(`${baseURL}/new_notebook`, { id: incNotebookCounter, state: newNotebookData(incNotebookCounter, name) }),
      axios.post(`${baseURL}/save_file_system`, { state: newState })
    ]).then(() => {
      dispatch(setFileSystemState( newState ))
      dispatch(selectNotebook( incNotebookCounter ))
    })
  }
}