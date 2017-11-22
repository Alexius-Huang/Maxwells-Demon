import { handleActions } from 'redux-actions'

let defaultState = {
  structure: {
    folderName: 'global',
    id: 1,
    expand: true,
    subFolders: [
      { folderName: 'test1', subFolders: [], id: 2, expand: false },
      { folderName: 'test2', subFolders: [], id: 3, expand: false },
      { folderName: 'test3', subFolders: [], id: 4, expand: false },
      { folderName: 'test4', subFolders: [

        { folderName: 'test6', subFolders: [], id: 7, expand: false },

        { folderName: 'test7', subFolders: [], id: 8, expand: false },

        { folderName: 'test8', subFolders: [], id: 9, expand: false },
      ], expand: false, id: 5 },
      { folderName: 'test5', subFolders: [], id: 6, expand: false },
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

export const FileSystemReducers = handleActions({
  TOGGLE_NOTEBOOK_MODAL: (state, { payload: folder = null }) => ({
    ...state,
    modal: { toggle: ! state.modal.toggle, targetFolder: folder }
  }),
  // NEW_NOTEBOOK: (folder, name) => ({ folder, name }),
  // RENAME_NOTEBOOK: (id, name) => ({ id, name }),
  // DELETE_NOTEBOOK: id => id,
}, defaultState)
