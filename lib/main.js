import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { reducers } from './reducers/reducers'
import { epics } from './epics/epics'
import { createEpicMiddleware } from 'redux-observable'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import App from './App'

let epic = createEpicMiddleware(epics)

let store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk, epic),
)

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('main')
)