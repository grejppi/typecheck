import React from 'react'
import ReactDOM from 'react-dom'

import './app.pcss'

import Attack from './components/attack'
import Type from './components/type'
import Effectiveness from './components/effectiveness'

import { Pokedex } from 'pokeapi-js-wrapper'
const P = new Pokedex()

const capitalize = (s) => s.substring(0, 1).toUpperCase() + s.substring(1)

export { P, capitalize }

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
