import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { reducers } from './reducers/reducers'
import { createStore, combineReducers } from 'redux'
import App from './App'

let store = createStore(combineReducers(reducers))

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('main')
)