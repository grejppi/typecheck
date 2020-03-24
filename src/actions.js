import { Pokedex } from 'pokeapi-js-wrapper'
const P = new Pokedex()

export const Actions = {
  REQUEST_ATTACKER: 'REQUEST_ATTACKER',
  RECEIVE_ATTACKER: 'RECEIVE_ATTACKER',
  REQUEST_OPPONENT: 'REQUEST_OPPONENT',
  RECEIVE_OPPONENT: 'RECEIVE_OPPONENT',
  RECEIVE_ATTACK_TYPE_SUGGESTIONS: 'RECEIVE_ATTACK_TYPE_SUGGESTIONS',
  SWAP: 'SWAP',
}

function requestAttacker(pokemon) {
  return { type: Actions.REQUEST_ATTACKER, pokemon }
}

function receiveAttacker(data) {
  return { type: Actions.RECEIVE_ATTACKER, ...data }
}

function requestOpponent(pokemon) {
  return { type: Actions.REQUEST_OPPONENT, pokemon }
}

function receiveOpponent(data) {
  return { type: Actions.RECEIVE_OPPONENT, ...data }
}

function receiveAttackTypeSuggestions(suggestions) {
  return { type: Actions.RECEIVE_ATTACK_TYPE_SUGGESTIONS, suggestions }
}

export function swap() {
  return { type: Actions.SWAP }
}

function populate(suggestionsByType, attacker, opponentType, damage, factor) {
  for (let attackType of opponentType.damage_relations[damage]) {
    let stab = (
      (attackType.name === attacker.primary ||
        attackType.name === attacker.secondary) &&
      suggestionsByType.__stabbed__[attackType.name] === undefined
    )

    if (stab) {
      suggestionsByType.__stabbed__[attackType.name] = true
    }

    suggestionsByType[attackType.name] *= factor * (1 + stab * 0.5)
  }
}

function populateAll(suggestionsByType, attacker, opponentType) {
  const f = (damage, factor) => populate(
    suggestionsByType,
    attacker,
    opponentType,
    damage,
    factor,
  )

  f('double_damage_from', 2)
  f('half_damage_from', 0.5)
  f('no_damage_from', 0)
}

export function createAttackTypeSuggestions(attacker, opponent) {
  return dispatch => {
    let suggestionsByType = {
      __stabbed__: [],
      ...[
        'normal', 'fire', 'fighting', 'water',
        'flying', 'grass', 'poison', 'electric',
        'ground', 'psychic', 'rock', 'ice',
        'bug', 'dragon', 'ghost', 'dark',
        'steel', 'fairy',
      ]
        .reduce(
          (map, type) => {
            map[type] = 1
            return map
          },
          {},
        ),
    }

    let primary = P.getTypeByName(opponent.primary)
    if (!primary) {
      return
    }

    return primary
      .then(
        response => {
          populateAll(suggestionsByType, attacker, response)
          return P.getTypeByName(opponent.secondary) || Promise.resolve(null)
        }
      )
      .then(
        response => {
          response && populateAll(suggestionsByType, attacker, response)
          delete suggestionsByType.__stabbed__
          let suggestions = {}

          for (let type of Object.keys(suggestionsByType)) {
            let damage = suggestionsByType[type]
            if (suggestions[damage] === undefined) {
              suggestions[damage] = []
            }
            suggestions[damage].push(type)
          }

          dispatch(receiveAttackTypeSuggestions(suggestions))
        }
      )
  }
}

function setPokemonInner(dispatch, args) {
  dispatch(args.request(args.pokemon))
  let name = args.pokemon

  return P.getPokemonSpeciesByName(args.pokemon)
    .then(
      response => {
        name = (
          response.names.find(v => v.language.name == 'en')
          || { name: args.pokemon }
        ).name
        let variety = response.varieties.find(v => v.is_default).pokemon.name
        return P.getPokemonByName(variety)
      }
    )
    .then(
      response => {
        let primary = null
        let secondary = null

        for (let entry of response.types) {
          entry.slot == 1 && (primary = entry.type.name)
          entry.slot == 2 && (secondary = entry.type.name)
        }

        let sprite = response.sprites.front_default

        dispatch(args.receive({ name, primary, secondary, sprite }))
      }
    )
}

export function setAttacker(pokemon) {
  return dispatch => setPokemonInner(
    dispatch,
    {
      pokemon,
      request: requestAttacker,
      receive: receiveAttacker,
    },
  )
}

export function setOpponent(pokemon) {
  return dispatch => setPokemonInner(
    dispatch,
    {
      pokemon,
      request: requestOpponent,
      receive: receiveOpponent,
    },
  )
}
