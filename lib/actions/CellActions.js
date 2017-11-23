import { createActions } from 'redux-actions'

export const {
  newCell,
  deleteCell,
  splitCell,
  mergeCell,
  switchCell,
  changeCellContent,
  changeCellType,
  hideCellTextarea,
  hideCell,
  showCell
} = createActions({
  NEW_CELL: type => type,
  DELETE_CELL: id => id,
  SPLIT_CELL: id => id,
  MERGE_CELL: cellPositionIndex => cellPositionIndex,
  SWITCH_CELL: id => id,
  CHANGE_CELL_CONTENT: (id, content) => ({ id, content }),
  CHANGE_CELL_TYPE: (id, type) => ({ id, type }),
  HIDE_CELL_TEXTAREA: id => id,
  HIDE_CELL: id => id,
  SHOW_CELL: id => id
})
