import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware } from 'redux'
import { createStore } from 'redux'
import thunk from 'redux-thunk'

import App from './components/app'

import { setAttacker, setOpponent } from './actions'
import rootReducer from './reducers'

const param = (whomst) => (new URL(document.location)).searchParams.get(whomst)

const store = createStore(rootReducer, applyMiddleware(thunk))

store.dispatch(setAttacker(param('attacker') || 'magikarp'))
store.dispatch(setOpponent(param('opponent') || 'stunfisk'))

store.subscribe(() => {
  const state = store.getState()

  window.history.replaceState(
    {},
    '',
    `?attacker=${state.attacker.pokemon}&opponent=${state.opponent.pokemon}`,
  )

  document.title = `${state.attacker.name} vs. ${state.opponent.name}`
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
