import { createActions } from 'redux-actions'

export const {
  setFileSystemState,
  toggleVirtualFolder,
  toggleNewVirtualFolderInput,
  newVirtualFolderInputChange,
  newVirtualFolder,
  toggleNewNotebookInput,
  newNotebookInputChange,
  newNotebook,
  cancelAllInput,
  setTargetNotebook
} = createActions({
  SET_FILE_SYSTEM_STATE: state => state,
  TOGGLE_VIRTUAL_FOLDER: id => id,
  TOGGLE_NEW_VIRTUAL_FOLDER_INPUT: id => id,
  NEW_VIRTUAL_FOLDER_INPUT_CHANGE: (id, value) => ({ id, value }),
  NEW_VIRTUAL_FOLDER: id => id,
  TOGGLE_NEW_NOTEBOOK_INPUT: folderID => folderID,
  NEW_NOTEBOOK_INPUT_CHANGE: (id, value) => ({ id, value }),
  NEW_NOTEBOOK: folderID => folderID,
  CANCEL_ALL_INPUT: () => undefined,
  SET_TARGET_NOTEBOOK: id => id
})
