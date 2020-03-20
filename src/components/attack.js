import React, { useState } from 'react'

import { P, capitalize } from '../app'

import Type from './type'
import Effectiveness from './effectiveness'
import Suggestions from './suggestions'

export default () => {
  let [attackerPokemon, setAttackerPokemon] = useState('magikarp')
  let [opponentPokemon, setOpponentPokemon] = useState('stunfisk')

  let [attackerSprite, setAttackerSprite] = useState(null)
  let [opponentSprite, setOpponentSprite] = useState(null)

  let [attackerPrimary, setAttackerPrimary] = useState(null)
  let [attackerSecondary, setAttackerSecondary] = useState(null)
  let [opponentPrimary, setOpponentPrimary] = useState(null)
  let [opponentSecondary, setOpponentSecondary] = useState(null)

  const setTypes = (pkmn, setPrimary, setSecondary) => {
    let primary = null
    let secondary = null
    for (let type of pkmn.types) {
      if (type.slot == 1) {
        primary = type.type.name
      } else if (type.slot == 2) {
        secondary = type.type.name
      }
    }
    setPrimary(primary)
    setSecondary(secondary)
  }

  P.getPokemonByName(attackerPokemon).then((pkmn) => {
    setTypes(pkmn, setAttackerPrimary, setAttackerSecondary)
    setAttackerSprite(pkmn.sprites.front_default)
    return P.getPokemonByName(opponentPokemon)
  }).then((pkmn) => {
    setTypes(pkmn, setOpponentPrimary, setOpponentSecondary)
    setOpponentSprite(pkmn.sprites.front_default)
  })

  let attacker = {
    primary: attackerPrimary,
    secondary: attackerSecondary,
  }

  let opponent = {
    primary: opponentPrimary,
    secondary: opponentSecondary,
  }

  let properAttackerPokemon = capitalize(attackerPokemon)
  let properOpponentPokemon = capitalize(opponentPokemon)

  return <div className="flex flex-row">
    <div className="flex-grow"></div>
    <div className="flex flex-col mx-auto">
      <div className="flex flex-row flex-wrap mx-auto">
        <div className="w-32 flex flex-col items-center">
          <div><img
            src={attackerSprite}
            alt={properAttackerPokemon}
            style={{transform: 'scaleX(-1)'}}
          /></div>
          <div>{properAttackerPokemon}</div>
        </div>

        <Type role={!attackerPrimary && 'primary'} name={attackerPrimary} empty={attackerPrimary === null} />
        <Type role={!attackerSecondary && 'secondary'} name={attackerSecondary} empty={attackerSecondary === null} />
        <div className="w-4"></div>

        <button
          onClick={() => {
            setAttackerPokemon(opponentPokemon)
            setOpponentPokemon(attackerPokemon)
          }}
          disabled={!attackerPokemon || !opponentPokemon}
        >
          <Type role='swap' name="swap" />
        </button>

        <div className="w-4"></div>
        <Type role={!opponentPrimary && 'primary'} name={opponentPrimary} empty={opponentPrimary === null} />
        <Type role={!opponentSecondary && 'secondary'} name={opponentSecondary} empty={opponentSecondary === null} />

        <div className="w-32 flex flex-col items-center">
          <img src={opponentSprite} alt={properOpponentPokemon} />
          <div>{properOpponentPokemon}</div>
        </div>
      </div>
      <div>
        <Suggestions
          attacker={attacker}
          opponent={opponent}
        />
      </div>
    </div>
    <div className="flex-grow"></div>
  </div>
}
