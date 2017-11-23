import { handleActions } from 'redux-actions'

let counter = 1

let defaultState = {
  cells: [
    {
      id: 1, type: 'markdown', content: '# Welcome!', partial: 'full',
      dependentCellID: null, dependent: null, hide: false
    },
  ],
  cellIDCounter: counter,
  toolsVisibility: true
}

Array.prototype.select = function(id, callback) {
  return this.map((item, index) => (item.id === id) ? callback(item, index) : item )
}
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
}
Array.prototype.remove = function (index) {
  this.splice(index, 1);
}

export const CellReducers = handleActions({
  NEW_CELL: ({ cells, toolsVisibility }, { payload: type }) => ({
    toolsVisibility,
    cellIDCounter: ++counter,
    cells: [...cells, {
      id: counter, type, content: 'New Section', partial: 'full',
      dependentCellID: null, dependent: null, hide: false
    }]
  }),
  DELETE_CELL: ({ cellIDCounter, cells, toolsVisibility }, { payload: id }) => {
    let i
    let cell = cells.filter((cell, index) => {
      if (cell.id === id) {
        i = index
        return true
      }
      return false
    })[0]

    /* Expand the other cell when deleted cell is column type half */
    if (cell.partial === 'half') {
      let deleteCellID = cell.id
      let fullCellID = cells[ (cell.dependent === 'main') ? (i + 1) : (i - 1) ].id

      return {
        cellIDCounter,
        cells: cells
          .filter((cell) => cell.id !== deleteCellID)
          .map((cell) => {
            if (cell.id === fullCellID) {
              cell.dependent = null
              cell.dependentCellID = null
              cell.partial = 'full'
            }
            return cell
          })
      }
    }

    return {
      toolsVisibility,
      cellIDCounter,
      cells: cells.filter((cell) => cell.id !== id)
    }
  },
  SPLIT_CELL: (state, { payload: id }) => {
    let type, i
    const result = {
      ...state,
      cells: state.cells.select(id, (cell, index) => {
        i = index
        cell.partial = 'half'
        type = cell.type
        cell.dependentCellID = ++counter
        cell.dependent = 'main'
        return cell
      })
    }
    result.cells.insert(i + 1, { id: counter, type, content: 'New Section', partial: 'half', dependentCellID: id, dependent: 'sub', hide: false })
    return result
  },
  MERGE_CELL: (state, { payload: cellPositionIndex }) => {
    let selectedCell = state.cells[cellPositionIndex]
    let updateContent, updateContentCellID, filterCellID
    if (selectedCell.dependent === 'main') {
      updateContent = `${ selectedCell.content }\n${ state.cells[cellPositionIndex + 1].content }`
      updateContentCellID = selectedCell.id
      filterCellID = cellPositionIndex + 1
    } else if (selectedCell.dependent === 'sub') {
      let mainCell = state.cells[cellPositionIndex - 1]
      updateContent = `${ mainCell.content }\n${ selectedCell.content }`
      updateContentCellID = mainCell.id
      filterCellID = cellPositionIndex
    }

    return {
      ...state,
      cells: state.cells.map((cell) => {
        if (updateContentCellID === cell.id) {
          cell.content = updateContent
          cell.partial = 'full'
          cell.dependentCellID = null
          cell.dependent = null
        }
        return cell
      }).filter((_, index) => index !== filterCellID)
    }
    return state
  },
  SWITCH_CELL: (state, { payload: id }) => {
    let dependentCellID, newCell, newDependentCell
    state.cells.select(id, (cell) => {
      dependentCellID = cell.dependentCellID
      newCell = Object.assign({}, cell)
    })

    state.cells.select(dependentCellID, (cell) => {
      newDependentCell = Object.assign({}, cell)
      let contentCache = newCell.content
      newCell.content = newDependentCell.content
      newDependentCell.content = contentCache
    })

    return {
      ...state,
      cells: state.cells.map((cell) => {
        if (cell.id === newCell.id)          return newCell
        if (cell.id === newDependentCell.id) return newDependentCell
        return cell
      })
    }
  },
  CHANGE_CELL_CONTENT: (state, { payload: { id, content } }) => ({
    ...state,
    cells: state.cells.select(id, (cell) => {
      cell.content = content
      return cell
    })
  }),
  CHANGE_CELL_TYPE: (state, { payload: { id, type } }) => ({
    ...state,
    cells: state.cells.select(id, (cell) => {
      cell.type = type
      return cell
    })
  }),
  HIDE_CELL_TEXTAREA: (state, { payload: id }) => ({
    ...state,
    cells: state.cells.select(id, (cell) => { 
      cell.hide = 'textarea'
      return cell
    })
  }),
  HIDE_ALL_CELL_TEXTAREA: (state) => ({
    ...state,
    cells: state.cells.map((cell) => {
      cell.hide = 'textarea'
      return cell
    })
  }),
  HIDE_CELL: (state, { payload: id }) => ({
    ...state,
    cells: state.cells.select(id, (cell) => {
      cell.hide = 'all'
      return cell
    })
  }),
  HIDE_ALL_CELLS: (state) => ({
    ...state,
    cells: state.cells.map((cell) => {
      cell.hide = 'all'
      return cell
    })
  }),
  SHOW_CELL: (state, { payload: id }) => ({
    ...state,
    cells: state.cells.select(id, (cell) => {
      cell.hide = false
      return cell
    })
  }),
  SHOW_ALL_CELLS: (state) => ({
    ...state,
    cells: state.cells.map((cell) => {
      cell.hide = false
      return cell
    })
  }),
  TOGGLE_ALL_CELL_TOOLS: (state) => ({
    ...state,
    toolsVisibility: ! state.toolsVisibility
  }),
}, defaultState)
