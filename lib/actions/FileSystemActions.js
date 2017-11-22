import { createActions } from 'redux-actions'

export const {
  toggleVirtualFolder,
  newVirtualFolderInput,
  newVirtualFolderInputChange,
  toggleNotebookModal,
  newNotebook,
  renameNotebook,
  deleteNotebook
} = createActions({
  TOGGLE_VIRTUAL_FOLDER: id => id,
  NEW_VIRTUAL_FOLDER_INPUT: id => id,
  NEW_VIRTUAL_FOLDER_INPUT_CHANGE: (id, value) => ({ id, value }),
  TOGGLE_NOTEBOOK_MODAL: folder => folder,
  NEW_NOTEBOOK: (folder, name) => ({ folder, name }),
  RENAME_NOTEBOOK: (id, name) => ({ id, name }),
  DELETE_NOTEBOOK: id => id,  
})
