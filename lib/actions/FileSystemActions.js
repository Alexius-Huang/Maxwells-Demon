import { createActions } from 'redux-actions'

export const {
  toggleNotebookModal,
  newNotebook,
  renameNotebook,
  deleteNotebook
} = createActions({
  TOGGLE_NOTEBOOK_MODAL: folder => folder,
  NEW_NOTEBOOK: (folder, name) => ({ folder, name }),
  RENAME_NOTEBOOK: (id, name) => ({ id, name }),
  DELETE_NOTEBOOK: id => id,  
})
