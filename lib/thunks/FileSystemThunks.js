import { setFileSystemState } from '../actions/FileSystemActions'
import { setCellState } from '../actions/CellActions'
import axios from 'axios'

let baseURL = 'http://localhost:3001'

export function loadFileSystem() {
  return (dispatch, getState) => {
    /* Load file system's state */
    axios.post(`${baseURL}/load_file_system`)
      .then(({ data }) => {
        dispatch(setFileSystemState(data))
        return axios.post(`${baseURL}/load_notebook`, { id: data.targetNotebook })
      })
      .then( ({ data }) => dispatch(setCellState(data)) )
  }
}