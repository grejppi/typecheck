import React, { useState } from 'react'
import { P } from '../app'

import './effectiveness.pcss'

export default ({ attacker, opponent }) => {
  let [effectiveness, setEffectiveness] = useState(undefined)

  let foundType = P.getTypeByName(attacker.move)

  foundType && foundType.then((attackType) => {
    let value = 1
    let stab = 0

    const setValue = (which) => {
      const opponentType = (t) => t.name === which
      const any = (whomst) => attackType.damage_relations[whomst].some(opponentType)

      console.log(attackType.damage_relations)

      if (any('double_damage_to')) {
        console.log(`double damage to ${which} from ${attackType.name}`)
        value *= 2
      } else if (any('half_damage_to')) {
        console.log(`half damage to ${which} from ${attackType.name}`)
        value *= 0.5
      } else if (any('no_damage_to')) {
        console.log(`no damage to ${which} from ${attackType.name}`)
        value *= 0
      } else {
        console.log(`normal damage to ${which} from ${attackType.name}`)
        value *= 1
      }
    }

    setValue(opponent.primary)
    if (opponent.secondary) {
      setValue(opponent.secondary)
    }

    stab = !!(
      attacker.move === attacker.primary ||
      attacker.move === attacker.secondary
    ) ? 1.5 : 1

    setEffectiveness(value * stab)
  })

  return <>
    {(attacker.move && opponent.primary) ?
      <span>{effectiveness}&times;</span> :
      <span className="Spin fas fa-spinner text-gray-300"></span>
    }
  </>
}
