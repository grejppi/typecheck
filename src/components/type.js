import React from 'react'

import { capitalize } from '../app'

import './type.pcss'

const rgb = (r, g, b) => `rgb(${[r, g, b]})`;

const Colors = {
  // Sourced from https://bulbapedia.bulbagarden.net/wiki/Type
  normal: rgb(168, 168, 120),
  fire: rgb(240, 128, 48),
  fighting: rgb(192, 48, 40),
  water: rgb(104, 144, 240),
  flying: rgb(168, 144, 240),
  grass: rgb(120, 200, 80),
  poison: rgb(160, 64, 160),
  electric: rgb(248, 208, 48),
  ground: rgb(224, 192, 104),
  psychic: rgb(248, 88, 136),
  rock: rgb(184, 160, 56),
  ice: rgb(152, 216, 216),
  bug: rgb(168, 184, 32),
  dragon: rgb(112, 56, 248),
  ghost: rgb(112, 88, 152),
  dark: rgb(112, 88, 72),
  steel: rgb(184, 184, 208),
  fairy: rgb(238, 153, 172),
}

const UnknownColor = rgb(104, 160, 144)

const Roles = {
  primary: <span className="font-black">1</span>,
  secondary: <span className="font-black">2</span>,
  move: <span className="fas fa-compress-arrows-alt"></span>,
  swap: <span className="fas fa-exchange-alt"></span>,
}

const Re = /[aeiou]/g;

export default ({ role, name, empty, width, height }) => {
  let properName = name ? capitalize(name) : ''

  let abbrName = properName.length > 3 ?
    properName.replace(Re, '').substring(0, 3) :
    properName

  if (abbrName.length < 3) {
    abbrName += properName.substring(properName.length - (3 - abbrName.length))
  }

  return <div className={`w-24 ${height || 'h-32'} flex`}>
    {empty !== true && <div
      className="TypeCard rounded shadow flex flex-col flex-grow m-1 text-center"
      style={{backgroundColor: Colors[name] || UnknownColor}}
    >
      <div className="flex-grow flex items-center justify-center text-white text-4xl font-hairline">
        {role ? Roles[role] : abbrName}
      </div>
      <div className="TypeCardLabel bg-white rounded m-1 mt-0 text-sm">
        {properName}
      </div>
    </div>}

    {empty === true && <div
      className="TypeCard Empty rounded shadow-inner flex flex-col flex-grow m-1 text-center bg-gray-100"
    >
      <div className="invisible px-2 rounded m-1 mt-0 text-sm">
        &#8205;
      </div>
    </div>}
  </div>
}
