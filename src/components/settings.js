import React from 'react'
import { connect } from 'react-redux'

import Card from './card'

import { swap } from '../actions'

const mapStateToProps = state => { return { state } }

function Sprite({ sprite, pokemon, flip }) {
  return (
    <div className='w-32 flex flex-col items-center'>
      <div className='flex-grow'>
        <img
          src={sprite}
          alt={pokemon}
          style={{ transform: `scaleX(${flip ? '-1' : '1'})` }}
        />
      </div>
      <div>{pokemon}</div>
    </div>
  )
}

function Settings({ dispatch, state }) {
  return (
    <div className='flex flex-row flex-wrap mx-auto'>
      <Sprite
        sprite={state.attacker.sprite}
        pokemon={state.attacker.name}
        flip={true}
      />

      <Card text={state.attacker.primary} />
      <Card text={state.attacker.secondary} />
      <div className='w-4'></div>

      <button
        onClick={() => dispatch(swap())}
      >
        <Card
          text='swap'
          icon={<span className='fas fa-exchange-alt'></span>}
        />
      </button>

      <div className='w-4'></div>
      <Card text={state.opponent.primary} />
      <Card text={state.opponent.secondary} />

      <Sprite
        sprite={state.opponent.sprite}
        pokemon={state.opponent.name}
        flip={false}
      />
    </div>
  )
}

export default connect(mapStateToProps)(Settings)
