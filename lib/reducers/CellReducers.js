import { handleActions } from 'redux-actions'

let counter = 1

let defaultState = {
  cells: [
    {
      id: 1, type: 'markdown', content: '# Welcome!', partial: 'full',
      dependentCellID: null, dependent: null
    },
  ],
  cellIDCounter: counter,
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
  NEW_CELL: ({ cells }, { payload: type }) => ({
    cellIDCounter: ++counter,
    cells: [...cells, {
      id: counter, type, content: 'New Section', partial: 'full',
      dependentCellID: null, dependent: null
    }]
  }),
  DELETE_CELL: ({ cellIDCounter, cells }, { payload: id }) => {
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
      let deleteCellID, fullCellID
      if (cell.dependent === 'main') {
        deleteCellID = cell.id
        fullCellID = cells[i + 1].id
      } else {
        fullCellID = cells[i - 1].id
        deleteCellID = cell.id
      }

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
      cellIDCounter,
      cells: cells.filter((cell) => cell.id !== id)
    }
  },
  SPLIT_CELL: (state, { payload: id }) => {
    let type, i

    const result = {
      ...state,
      cells: state.cells.select(id, (cell, index) => {
        cell.partial = 'half'
        type = cell.type
        i = index
        cell.dependentCellID = i + 1
        cell.dependent = 'main'
        return cell
      })
    }
    result.cells.insert(i + 1, { id: ++counter, type, content: 'New Section', partial: 'half', dependentCellID: i, dependent: 'sub' })
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
}, defaultState)
