import React, { useState } from 'react'
import { P } from '../app'

import Type from './type'

export default ({ attacker, opponent }) => {
  let [suggestions, setSuggestions] = useState({})
  let [attackerPrimary, setAttackerPrimary] = useState(undefined)
  let [attackerSecondary, setAttackerSecondary] = useState(undefined)
  let [opponentPrimary, setOpponentPrimary] = useState(undefined)
  let [opponentSecondary, setOpponentSecondary] = useState(undefined)

  let foundPrimary = P.getTypeByName(opponent.primary)
  let foundSecondary = P.getTypeByName(opponent.secondary)

  if (
    attackerPrimary != attacker.primary ||
    attackerSecondary != attacker.secondary ||
    opponentPrimary != opponent.primary ||
    opponentSecondary != opponent.secondary
  ) {
    let newSuggestions = {}

    let stabbed = {}

    const populate = (opponentType, whomst, factor) => {
      for (let attackType of opponentType.damage_relations[whomst]) {
        let value = factor
        let stab = 0

        stab = (
          (attackType.name === attacker.primary ||
            attackType.name === attacker.secondary) &&
          stabbed[attackType.name] === undefined
        ) ? 1.5 : 1

        if (stab != 1) {
          stabbed[attackType.name] = true
        }

        if (!newSuggestions.hasOwnProperty(attackType.name)) {
          newSuggestions[attackType.name] = 1
        }

        newSuggestions[attackType.name] *= factor * stab
      }

      setSuggestions((suggestions) => suggestions = {
        ...suggestions,
        ...newSuggestions,
      })
    }

    const populateAll = (opponentType) => {
      populate(opponentType, 'double_damage_from', 2)
      populate(opponentType, 'half_damage_from', 0.5)
      populate(opponentType, 'no_damage_from', 0)
    }

    if (foundPrimary) {
      foundPrimary.then((primaryType) => {
        setSuggestions({
          normal: 1,
          fire: 1,
          fighting: 1,
          water: 1,
          flying: 1,
          grass: 1,
          poison: 1,
          electric: 1,
          ground: 1,
          psychic: 1,
          rock: 1,
          ice: 1,
          bug: 1,
          dragon: 1,
          ghost: 1,
          dark: 1,
          steel: 1,
          fairy: 1,
        })
        populateAll(primaryType)
        return foundSecondary || Promise.resolve(null)
      }).then((secondaryType) => {
        secondaryType && populateAll(secondaryType)
      })
    }

    setAttackerPrimary(attacker.primary)
    setAttackerSecondary(attacker.secondary)
    setOpponentPrimary(opponent.primary)
    setOpponentSecondary(opponent.secondary)
  }

  let inverseSuggestions = {}
  for (let key of Object.keys(suggestions)) {
    if (inverseSuggestions[suggestions[key]] === undefined) {
      inverseSuggestions[suggestions[key]] = []
    }
    inverseSuggestions[suggestions[key]].push(key)
  }

  return <div>
    <div className="flex flex-col-reverse w-full container">
      {
        Object.keys(inverseSuggestions).sort().map((strength, i) => <React.Fragment key={i}>
          <div className="flex flex-col">
            <div>{strength}&times;</div>
            <div className="flex flex-row flex-wrap">
              {inverseSuggestions[strength].map((name, j) => {
                return <Type
                  name={name}
                  height={strength  > 1 ? "h-32" : "h-24"}
                  key={j}
                />
              })}
            </div>
          </div>
        </React.Fragment>)
      }
    </div>
  </div>
}
