import React, { useEffect } from 'react'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants';

export const Playlist = () => {
  const [{token,playlists},dispatch] = useStateProvider();

  useEffect(()=>{
    const getPlaylistData = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me/playlists",{
        headers:{
          Authorization: "Bearer " + token,
          "Content-Type":"application/json",
        },
      });
      const {items} =response.data;
      const playlists = items.map(({name,id})=>{
        return {name,id}
      })
      dispatch({type:reducerCases.SET_PLAYLISTS,playlists})
    };
    getPlaylistData()

  },[token,dispatch])

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({type:reducerCases.SET_PLAYLIST_ID, selectedPlaylistId})

  }

  return (
    <div className='Container h-[100%] overflow-hidden '>
      <ul className='my-4 flex flex-col gap-4 p-4 h-[55vh] max-h-[100%] overflow-auto '>
        {
          playlists.map(({name,id})=>{
            
            return (

            <li className='flex items-center gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:text-white text-lg' onClick={()=> changeCurrentPlaylist(id)} key={id}>{name}</li>

            )
          })
        }
      </ul>
    </div>
  )
}
