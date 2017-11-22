import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { reducers } from './reducers/reducers'
import NoteBook from './components/NoteBook'

let store = createStore( combineReducers(reducers) )

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <NoteBook />
      </Provider>
    )
  }
}
