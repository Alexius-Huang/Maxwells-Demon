import { handleActions } from 'redux-actions'

let counter = 1

let defaultState = {
  cells: [
    { id: 1, type: 'markdown', content: '# Welcome!' },
  ],
  cellIDCounter: counter
}

export const CellReducers = handleActions({
  NEW_CELL: ({ cells }, { payload: type }) => ({
    cellIDCounter: ++counter,
    cells: [...cells, { id: counter, type, content: 'New Section' }]
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
