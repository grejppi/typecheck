import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware } from 'redux'
import { createStore } from 'redux'
import thunk from 'redux-thunk'

import App from './components/app'

import { setAttacker, setOpponent } from './actions'
import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunk))
store.dispatch(setAttacker('magikarp'))
store.dispatch(setOpponent('stunfisk'))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
