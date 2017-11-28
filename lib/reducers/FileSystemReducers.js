import { handleActions } from 'redux-actions'

let folderCounter = 1, notebookCounter = 1

let defaultState = {
  loaded: false,
  structure: {
    folderName: 'KERNEL',
    id: 1,
    expand: true,
    newFolderInput: false,
    newFolderInputValue: '',
    newNotebookInput: false,
    newNotebookInputValue: '',
    subFolders: []
  },
  notebooks: [
    {
      id: 1,
      folderID: 1,
      name: 'Welcome!'
    }
  ],
  modal: { toggle: false, targetFolder: null }
}

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
    traverseTree(structure, (folder) => {
      if (folder.id === id) {
        folder.subFolders.push({
          id: ++folderCounter,
          folderName: folder.newFolderInputValue,
          subFolders: [],
          expand: false
        })
        folder.newFolderInput = false
        folder.newFolderInputValue = ''
        return 'break'
      }
    })

    return { ...state, structure }
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
    traverseTree(structure, (folder) => {
      if (folder.id === folderID) {
        folder.newNotebookInput = false
        name = folder.newNotebookInputValue
        folder.newNotebookInputValue = ''
        return 'break'
      }
    })

    return {
      ...state,
      structure,
      notebooks: [...state.notebooks, { id: ++notebookCounter, folderID, name }]
    }
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
