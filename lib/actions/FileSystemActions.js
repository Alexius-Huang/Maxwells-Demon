import { createActions } from 'redux-actions'

export const {
  toggleVirtualFolder,
  toggleNewVirtualFolderInput,
  newVirtualFolderInputChange,
  newVirtualFolder,
  cancelVirtualFolderInput
  // toggleNotebookModal,
  // newNotebook,
  // renameNotebook,
  // deleteNotebook
} = createActions({
  TOGGLE_VIRTUAL_FOLDER: id => id,
  TOGGLE_NEW_VIRTUAL_FOLDER_INPUT: id => id,
  NEW_VIRTUAL_FOLDER_INPUT_CHANGE: (id, value) => ({ id, value }),
  NEW_VIRTUAL_FOLDER: id => id,
  CANCEL_VIRTUAL_FOLDER_INPUT: id => id,
  // TOGGLE_NOTEBOOK_MODAL: folder => folder,
  // NEW_NOTEBOOK: (folder, name) => ({ folder, name }),
  // RENAME_NOTEBOOK: (id, name) => ({ id, name }),
  // DELETE_NOTEBOOK: id => id,  
})
