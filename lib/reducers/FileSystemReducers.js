import { handleActions } from 'redux-actions'

let defaultState = {
  structure: {
    folderName: 'global',
    subFolders: [
      { folderName: 'test1', subFolders: [] },
      { folderName: 'test2', subFolders: [] },
      { folderName: 'test3', subFolders: [] },
      { folderName: 'test4', subFolders: [

        { folderName: 'test6', subFolders: [] },

        { folderName: 'test7', subFolders: [] },

        { folderName: 'test8', subFolders: [] },
      ] },
      { folderName: 'test5', subFolders: [] },
    ]
  },
  notebooks: [
    {
      id: 1,
      folder: 'global',
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
