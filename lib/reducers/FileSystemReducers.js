import { handleActions } from 'redux-actions'

let defaultState = {
  structure: {
    folderName: 'Workspace',
    id: 1,
    expand: true,
    newFolderInput: false,
    newFolderInputValue: '',
    subFolders: [
    //   { folderName: 'test1', subFolders: [], id: 2, expand: false },
    //   { folderName: 'test2', subFolders: [], id: 3, expand: false },
    //   { folderName: 'test3', subFolders: [], id: 4, expand: false },
    //   { folderName: 'test4', subFolders: [

    //     { folderName: 'test6', subFolders: [], id: 7, expand: false },

    //     { folderName: 'test7', subFolders: [], id: 8, expand: false },

    //     { folderName: 'test8', subFolders: [], id: 9, expand: false },
    //   ], expand: false, id: 5 },
    //   { folderName: 'test5', subFolders: [], id: 6, expand: false },
    ]
  },
  notebooks: [
    {
      id: 1,
      folderId: 1,
      name: 'Welcome!'
    }
  ],
  modal: { toggle: false, targetFolder: null }
}

let traverseTree = function(structure, callback) {
  callback(structure)
  if (structure.subFolders.length) for (let folder of structure.subFolders) traverseTree(folder, callback)
}

export const FileSystemReducers = handleActions({
  TOGGLE_VIRTUAL_FOLDER: (state, { payload: id }) => {
    let structure = Object.assign({}, state.structure)
    traverseTree(structure, (folder) => {
      if (folder.id === id) folder.expand = ! folder.expand
    })
    return { ...state, structure }
  },
  NEW_VIRTUAL_FOLDER_INPUT: (state, { payload: id }) => {
    let structure = Object.assign({}, state.structure)
    traverseTree(structure, (folder) => {
      if (folder.id === id) folder.newFolderInput = ! folder.newFolderInput
    })
    return { ...state, structure }
  },
  NEW_VIRTUAL_FOLDER_INPUT_CHANGE: (state, { payload: { id, value } }) => {
    let structure = Object.assign({}, state.structure)
    traverseTree(structure, (folder) => {
      if (folder.id === id) folder.newFolderInputValue = value
    })
    return { ...state, structure }
  },
  // TOGGLE_NOTEBOOK_MODAL: (state, { payload: folder = null }) => ({
  //   ...state,
  //   modal: { toggle: ! state.modal.toggle, targetFolder: folder }
  // }),
  // NEW_NOTEBOOK: (folder, name) => ({ folder, name }),
  // RENAME_NOTEBOOK: (id, name) => ({ id, name }),
  // DELETE_NOTEBOOK: id => id,
}, defaultState)
