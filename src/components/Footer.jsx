import React from 'react'
import { CurrentTrack } from './CurrentTrack'
import { PlayerControls } from './PlayerControls'
import { Volume } from './Volume'

export const Footer = () => {
  return (
    <div className='Container bg-[#181818] h-[100%] w-[100%] border-t-2 border-[#282828] grid grid-cols-[1fr,2fr,1fr] items-center justify-center px-4  '>
      <CurrentTrack/>
      <PlayerControls/>
      <Volume/>
    </div>
  )
}
