import { createActions } from 'redux-actions'

export const {
  toggleVirtualFolder,
  toggleNewVirtualFolderInput,
  newVirtualFolderInputChange,
  newVirtualFolder,
  toggleNewNotebookInput,
  newNotebookInputChange,
  newNotebook,
  cancelAllInput,
} = createActions({
  TOGGLE_VIRTUAL_FOLDER: id => id,
  TOGGLE_NEW_VIRTUAL_FOLDER_INPUT: id => id,
  NEW_VIRTUAL_FOLDER_INPUT_CHANGE: (id, value) => ({ id, value }),
  NEW_VIRTUAL_FOLDER: id => id,
  TOGGLE_NEW_NOTEBOOK_INPUT: folderID => folderID,
  NEW_NOTEBOOK_INPUT_CHANGE: (id, value) => ({ id, value }),
  NEW_NOTEBOOK: folderID => folderID,
  CANCEL_ALL_INPUT: () => undefined,
})
