import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { reducers } from './reducers/reducers'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import App from './App'

let store = createStore(
  combineReducers(reducers),
  applyMiddleware(promiseMiddleware)
)

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('main')
)