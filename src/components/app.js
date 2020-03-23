import React from 'react'

import Settings from './settings'
import Suggestions from './suggestions'
import './app.pcss'

export default function App() {
  return (
    <div className='flex flex-row'>
      <div className='flex-grow'></div>
      <div className='flex flex-col mx-auto'>
        <Settings />
        <Suggestions />
      </div>
      <div className='flex-grow'></div>
    </div>
  )
}
