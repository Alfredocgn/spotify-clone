import React from 'react'
import {FaSearch} from "react-icons/fa"
import {CgProfile} from "react-icons/cg"
import { useStateProvider } from '../utils/StateProvider'

export const Navbar = ({navbackground}) => {
  const [{userInfo}] = useStateProvider()
  return (
    <div navbackground={navbackground} className='Container flex justify-between items-centers p-8 h-[15vh] sticky top-0 duration-300 ease-in-out bg-none '>
      <div className='searchBar bg-white w-[30%] p-2 rounded-3xl flex items-center gap-2  '>
        <FaSearch/>
        <input className=' border-0 h-[2rem] w-[100%] focus:outline-none ' type="text" placeholder='Artist,songs, or podcasts'/>
      </div>
      <div className='avatar bg-black flex px-[0.4rem] py-[0.3rem] pr-[1rem] rounded-full  justify-center items-center   '>
        <a href="#" className='flex items-center gap-4 w-full justify-center text-white bold'>
          <CgProfile className=' text-xl bg-[#282828] p-[0.2rem] rounded-2xl text-[#c7c5c5]'/>
          <span>{userInfo?.userName}</span>
        </a>
      </div>
    </div>
  )
}
