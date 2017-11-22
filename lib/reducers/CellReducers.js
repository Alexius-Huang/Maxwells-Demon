import { handleActions } from 'redux-actions'

let defaultState = {
  cells: [
    { id: 1, type: 'markdown', content: '# Welcome!' },
  ],
  cellIDCounter: 1
}

export const CellReducers = handleActions({
  NEW_CELL: ({ cellIDCounter, cells }, { payload: type }) => ({
    cellIDCounter: state.cellIDCounter + 1,
    cells: [...cells, { type, content: '' }]
  }),
  DELETE_CELL: ({ cellIDCounter, cells }, { payload: id }) => ({
    cellIDCounter,
    cells: cells.filter((cell) => cell.id !== id )
  }),
  CHANGE_CELL_CONTENT: (state, { payload: { id, content } }) => ({
    ...state,
    cells: state.cells.map((cell) => {
      if (cell.id === id) { cell.content = content }
      return cell
    })
  }),
  CHANGE_CELL_TYPE: (state, { payload: { id, type } }) => ({
    ...state,
    cells: state.cells.map((cell) => {
      if (cell.id === id) { cell.type = type }
      return cell
    })
  }),
}, defaultState)
