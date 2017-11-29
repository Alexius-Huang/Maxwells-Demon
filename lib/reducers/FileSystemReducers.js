import { handleActions } from 'redux-actions'
import axios from 'axios'

let defaultState = { loaded: false }
let baseURL = 'http://localhost:3001'

let traverseTree = function(structure, callback) {
  if (callback(structure) === 'break') return
  if (structure.subFolders.length) for (let folder of structure.subFolders) traverseTree(folder, callback)
}
let selectFolder = function(state, id, callback) {
  let structure = Object.assign({}, state.structure)
  traverseTree(structure, (folder) => {
    if (folder.id === id) folder = callback(folder)
  })
  return structure
}

function newNotebookData(id) { 
  return {
    id: id,
    loaded: true,
    cells: [
      {
        id: 1,
        type: "Markdown",
        content: "# Welcome!",
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

export const FileSystemReducers = handleActions({
  SET_FILE_SYSTEM_STATE: (state, { payload }) => ({
    ...payload
  }),
  TOGGLE_VIRTUAL_FOLDER: (state, { payload: id }) => ({
    ...state,
    structure: selectFolder(state, id, (folder) => {
      folder.expand = !folder.expand
      return folder
    })
  }),
  TOGGLE_NEW_VIRTUAL_FOLDER_INPUT: (state, { payload: id }) => ({
    ...state,
    structure: selectFolder(state, id, (folder) => {
      folder.newFolderInput = !folder.newFolderInput
      folder.newNotebookInput = false
      folder.newNotebookInputValue = ''
      return folder
    })
  }),
  NEW_VIRTUAL_FOLDER_INPUT_CHANGE: (state, { payload: { id, value } }) => ({
    ...state,
    structure: selectFolder(state, id, (folder) => {
      folder.newFolderInputValue = value
      return folder
    })
  }),
  NEW_VIRTUAL_FOLDER: (state, { payload: id }) => {
    let structure = Object.assign({}, state.structure)
    let incFolderCounter = state.folderCounter + 1
    traverseTree(structure, (folder) => {
      if (folder.id === id) {
        folder.subFolders.push({
          id: incFolderCounter,
          folderName: folder.newFolderInputValue,
          subFolders: [],
          expand: false
        })
        folder.newFolderInput = false
        folder.newFolderInputValue = ''
        return 'break'
      }
    })

    let newState = { ...state, structure, folderCounter: incFolderCounter }
    axios.post(`${ baseURL }/save_file_system`, { state: newState })
    return newState
  },
  TOGGLE_NEW_NOTEBOOK_INPUT: (state, { payload: folderID }) => ({
    ...state,
    structure: selectFolder(state, folderID, (folder) => {
      folder.newNotebookInput = !folder.newNotebookInput
      folder.newFolderInput = false
      folder.newFolderInputValue = ''
      return folder
    })
  }),
  NEW_NOTEBOOK_INPUT_CHANGE: (state, { payload: { id, value } }) => ({
    ...state,
    structure: selectFolder(state, id, (folder) => {
      folder.newNotebookInputValue = value
      return folder
    })
  }),
  NEW_NOTEBOOK: (state, { payload: folderID }) => {
    let structure = Object.assign({}, state.structure), name
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

    axios.post(`${ baseURL }/new_notebook`, { id: incNotebookCounter, state: newNotebookData(incNotebookCounter) })
    axios.post(`${ baseURL }/save_file_system`, { state: newState })
    return newState
  },
  CANCEL_ALL_INPUT: (state) => {
    let structure = Object.assign({}, state.structure)
    traverseTree(structure, (folder) => {
      if (folder.newFolderInput || folder.newNotebookInput) {
        folder.newFolderInputValue = ''
        folder.newFolderInput = false
        folder.newNotebookInputValue = ''
        folder.newNotebookInput = false
      }
    })
    return { ...state, structure }
  },
}, defaultState)
