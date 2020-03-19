import React, { useState } from 'react'

import Type from './type'
import Effectiveness from './effectiveness'
import Suggestions from './suggestions'

export default () => {
  let [attackerPrimary, setAttackerPrimary] = useState(null)
  let [attackerSecondary, setAttackerSecondary] = useState(null)
  let [attackerMove, setAttackerMove] = useState(null)
  let [opponentPrimary, setOpponentPrimary] = useState(null)
  let [opponentSecondary, setOpponentSecondary] = useState(null)

  let attacker = {
    primary: attackerPrimary,
    secondary: attackerSecondary,
    move: attackerMove,
  }

  let opponent = {
    primary: opponentPrimary,
    secondary: opponentSecondary,
  }

  return <div className="flex flex-row">
    <div className="flex-grow"></div>
    <div className="flex flex-col mx-auto">
      <div className="flex flex-row flex-wrap mx-auto">
        <Type role={!attackerPrimary && 'primary'} name={attackerPrimary} empty={attackerPrimary === null} />
        <Type role={!attackerSecondary && 'secondary'} name={attackerSecondary} empty={attackerSecondary === null} />
        <div className="w-4"></div>
        <Type role='move' name={attackerMove} empty={attackerMove === null} />

        <div className="w-4"></div>
        <Type role={!opponentPrimary && 'primary'} name={opponentPrimary} empty={opponentPrimary === null} />
        <Type role={!opponentSecondary && 'secondary'} name={opponentSecondary} empty={opponentSecondary === null} />
      </div>
      <div className="text-6xl text-center">
        <Effectiveness
          attacker={attacker}
          opponent={opponent}
          />
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
