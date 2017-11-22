import { createActions } from 'redux-actions'

export const {
  newCell,
  deleteCell,
  changeCellContent,
  changeCellType
} = createActions({
  NEW_CELL: type => type,
  DELETE_CELL: id => id,
  CHANGE_CELL_CONTENT: (id, content) => ({ id, content }),
  CHANGE_CELL_TYPE: (id, type) => ({ id, type })
})
