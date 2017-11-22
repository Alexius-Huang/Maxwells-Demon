import { createActions } from 'redux-actions'

export const {
  newCell,
  deleteCell,
  splitCell,
  mergeCell,
  changeCellContent,
  changeCellType
} = createActions({
  NEW_CELL: type => type,
  DELETE_CELL: id => id,
  SPLIT_CELL: id => id,
  MERGE_CELL: cellPositionIndex => cellPositionIndex,
  CHANGE_CELL_CONTENT: (id, content) => ({ id, content }),
  CHANGE_CELL_TYPE: (id, type) => ({ id, type })
})
