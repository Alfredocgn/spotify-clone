import React from 'react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { Body } from './Body'
import { Footer } from './Footer'

export const Spotify = () => {
  return (
    <div className='Container w-[100vw] h-[100vh] overflow-hidden grid grid-rows-[85vh,15vh] '>
      <div className='spotify_body grid grid-cols-[15vw,85vw] h-[100%] w-[100%] bg-gradient-to-b from-transparent to-black  bg-[rgb(32,86,100)] '>
        <Sidebar/>
        <div className='body h-[100%] w-[100%] overflow-auto  '>
          <Navbar/>
          <div className='body_contents'>
            <Body/>
          </div>
        </div>
      </div>
      <div className='footer'>
        <Footer/>
      </div>

    </div>
  )
}
