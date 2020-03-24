import React from 'react'
import { connect } from 'react-redux'

import Card from './card'
import './suggestions.pcss'

import { createAttackTypeSuggestions } from '../actions'

const mapStateToProps = state => { return { state } }

function Suggestions({ dispatch, state }) {
  if (state.attackTypeSuggestions.didInvalidate) {
    dispatch(createAttackTypeSuggestions(state.attacker, state.opponent))
  }

  return (
    <div className='flex flex-col-reverse w-full container'>
      {!state.attackTypeSuggestions.didInvalidate &&
        Object.keys(state.attackTypeSuggestions.suggestions).sort().map(
          damage => {
            return (
              <div className='flex flex-col' key={damage}>
                <div>{damage}&times;</div>
                <div className='flex flex-row flex-wrap'>
                  {state.attackTypeSuggestions.suggestions[damage].map(
                    type => <Card
                      text={type}
                      height={damage > 1 ? 'h-32' : 'h-24'}
                      key={type}
                    />
                  )}
                </div>
              </div>
            )
          }
        )
      }
    </div>
  )
}

export default connect(mapStateToProps)(Suggestions)
