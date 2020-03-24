import { Actions } from './actions'

const DefaultState = {
  attacker: {
    pokemon: null,
    name: null,
    primary: null,
    secondary: null,
    sprite: null,
    didInvalidate: true,
  },
  opponent: {
    pokemon: null,
    name: null,
    primary: null,
    secondary: null,
    sprite: null,
    didInvalidate: true,
  },
  attackTypeSuggestions: {
    suggestions: null,
    didInvalidate: true,
  },
}

function requestPokemon(state, action, whomst) {
  return {
    ...state,
    [whomst]: {
      pokemon: action.pokemon,
      name: null,
      primary: null,
      secondary: null,
      sprite: null,
      didInvalidate: true,
    },
    attackTypeSuggestions: {
      suggestions: null,
      didInvalidate: true,
    },
  }
}

function receivePokemon(state, { name, primary, secondary, sprite }) {
  return { ...state, name, primary, secondary, sprite, didInvalidate: false }
}

const ActionMap = {
  [Actions.REQUEST_ATTACKER]: (state, action) => Object.assign(
    {},
    {
      ...state,
      ...requestPokemon(state, action, 'attacker'),
    },
  ),

  [Actions.RECEIVE_ATTACKER]: (state, action) => Object.assign(
    {},
    {
      ...state,
      attacker: receivePokemon(state.attacker, action),
    },
  ),

  [Actions.REQUEST_OPPONENT]: (state, action) => Object.assign(
    {},
    {
      ...state,
      ...requestPokemon(state, action, 'opponent'),
    },
  ),

  [Actions.RECEIVE_OPPONENT]: (state, action) => Object.assign(
    {},
    {
      ...state,
      opponent: receivePokemon(state.opponent, action),
    },
  ),

  [Actions.RECEIVE_ATTACK_TYPE_SUGGESTIONS]: (state, action) => Object.assign(
    {},
    {
      ...state,
      attackTypeSuggestions: {
        suggestions: action.suggestions,
        didInvalidate: false,
      },
    },
  ),

  [Actions.SWAP]: (state, action) => Object.assign(
    {},
    {
      ...state,
      attacker: { ...state.opponent },
      opponent: { ...state.attacker },
      attackTypeSuggestions: { didInvalidate: true },
    },
  ),
}

export default function rootReducer(
  state = DefaultState,
  action = {},
) {
  if (ActionMap[action.type]) {
    return ActionMap[action.type](state, action)
  }
  return state
}
