import React from 'react'
import ReactDOM from 'react-dom'

import './app.pcss'

import Attack from './components/attack'
import Type from './components/type'
import Effectiveness from './components/effectiveness'

const Pokedex = require('pokeapi-js-wrapper')
const P = new Pokedex.Pokedex()
export { P }

const App = () => {
  return (
    <>
      <Attack />
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)
