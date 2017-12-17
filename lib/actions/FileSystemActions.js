import { createActions } from 'redux-actions'

export const {
  setFileSystemState,
  toggleVirtualFolder,
  toggleNewVirtualFolderInput,
  newVirtualFolderInputChange,
  newVirtualFolder,
  toggleNewNotebookInput,
  newNotebookInputChange,
  cancelAllInput,
  selectNotebook,
  saveFileSystem,
} = createActions({
  SET_FILE_SYSTEM_STATE: state => state,
  TOGGLE_VIRTUAL_FOLDER: id => id,
  TOGGLE_NEW_VIRTUAL_FOLDER_INPUT: id => id,
  NEW_VIRTUAL_FOLDER_INPUT_CHANGE: (id, value) => ({ id, value }),
  NEW_VIRTUAL_FOLDER: id => id,
  TOGGLE_NEW_NOTEBOOK_INPUT: folderID => folderID,
  NEW_NOTEBOOK_INPUT_CHANGE: (id, value) => ({ id, value }),
  CANCEL_ALL_INPUT: () => undefined,
  SELECT_NOTEBOOK: id => id,
  SAVE_FILE_SYSTEM: () => undefined
})
