import React from 'react'
import {IoLibrary} from 'react-icons/io5'
import {MdHomeFilled,MdSearch} from 'react-icons/md'
import { Playlist } from './Playlist'


export const Sidebar = () => {
  return (
    <div className='Container bg-black text-[#b3b3b3] flex flex-col h-[100%] w-[100%] p-4 '>
      <div className='top_links flex flex-col '>
        <div className='logo text-center my-4 '>
          <img className="max-w-[80%] " src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt="Spotify logo" />
        </div>
        <ul className='my-4 flex flex-col gap-4 p-4 '>
          <li className='flex items-center gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:text-white text-lg'>
            <MdHomeFilled/>
            <span>Home</span>
          </li>
          <li className='flex items-center gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:text-white text-lg'>
            <MdSearch/>
            <span>Search</span>
          </li>
          <li className='flex items-center gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:text-white text-lg'>
            <IoLibrary/>
            <span>Your Library</span>
          </li>
        </ul>
      </div>
      <Playlist/>
    </div>
  )
}
