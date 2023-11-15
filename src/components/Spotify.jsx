import React, { useEffect, useRef,useState } from 'react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { Body } from './Body'
import { Footer } from './Footer'
import { useStateProvider } from '../utils/StateProvider'
import axios from "axios"
import { reducerCases } from '../utils/Constants'

export const Spotify = () => {
  const [{token},dispatch] = useStateProvider();
  const bodyRef = useRef();
  const [navBackground,setNavBackground] = useState(false);
  const [headerBackground,setHeaderBackground] = useState(false);
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30 ? setNavBackground(true) : setNavBackground(false);
    bodyRef.current.scrollTop >= 268 ? setHeaderBackground(true) : setHeaderBackground(false);
  }

  useEffect(()=>{
    const getUserInfo = async () => {
      const {data} = await axios.get("https://api.spotify.com/v1/me",{
        headers:{
          Authorization: "Bearer " + token,
          "Content-type":"application/json",
        }
      })
      const userInfo = {
        userId:data.id,
        userName: data.display_name,  
      }
      dispatch({type:reducerCases.SET_USER,userInfo})
    }
    getUserInfo()
  },[dispatch,token])

  return (
    <div className='Container w-[100vw] h-[100vh] overflow-hidden grid grid-rows-[85vh,15vh] '>
      <div className='spotify_body grid grid-cols-[15vw,85vw] h-[100%] w-[100%] bg-gradient-to-b from-transparent to-black  bg-[rgb(32,86,100)] '>
        <Sidebar/>
        <div className='body h-[100%] w-[100%] overflow-auto  ' 
        ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navbackground={navBackground} />
          <div className='body_contents'>
            <Body headerbackground={headerBackground}/>
          </div>
        </div>
      </div>
      <div className='footer'>
        <Footer/>
      </div>

    </div>
  )
}
