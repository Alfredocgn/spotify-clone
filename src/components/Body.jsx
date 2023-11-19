import React, { useEffect } from 'react'
import {AiFillClockCircle} from "react-icons/ai"
import { useStateProvider } from '../utils/StateProvider'
import axios from "axios"
import { reducerCases } from '../utils/Constants'
export const Body = ({headerbackground}) => {
  
  const [{token,selectedPlaylistId,selectedPlaylist},dispatch]= useStateProvider();

  useEffect(() =>{
    const getIntialPlaylist = async () => {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}` , 
      {
        headers:{
          Authorization: "Bearer " + token,
          "Content-Type":"application/json",
          },
        }
      );
      const selectedPlaylist = {
        id:response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a") ? "" : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({track})=> ({
          id:track.id,
          name:track.name,
          artists: track.artists.map((artist)=>artist.name),
          image:track.album.images[2].url,
          duration:track.duration_ms,
          album:track.album.name,
          context_uri:track.album.uri,
          track_number:track.track_number,
        }))
      }
      dispatch({type:reducerCases.SET_PLAYLIST, selectedPlaylist})
      
    }
    getIntialPlaylist();

  },[token,dispatch,selectedPlaylistId])

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms/60000);
    const seconds = ((ms%60000)/1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds ;
  }

  const playTrack = async (id,name,artists,image,context_uri,track_number) => {
    await axios.put(`https://api.spotify.com/v1/me/player/play`,
    {
      context_uri,
      offset: {
        position: track_number-1
      },
      position_ms:0,
    },{
      headers:{
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
    if(response.status === 204){
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      }
      dispatch({type:reducerCases.SET_PLAYING,currentPlaying})
      dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:true})
    }else{
      dispatch({type: reducerCases.SET_PLAYER_STATE,playerState:true})
    }

  }


  return (
    <div className='Container ' headerbackground={headerbackground}>
      {
        selectedPlaylist && (
          <>
          <div className='playlist mx-8 flex items-center gap-4  '>
            <div className='image'>
              <img className='h-[15rem]' src={selectedPlaylist.image} alt='selected playlist' />
            </div>
            <div className='details flex flex-col gap-4 text-["#e0dede] '>
              <span className='type text-white text-xl font-semibold'>PLAYLIST</span>
              <h2 className='title text-white text-6xl font-bold '>{selectedPlaylist.name}</h2>
              <p className='description'>{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className='list '>
            <div className='header-row grid grid-cols-[0.3fr,3fr,2fr,0.1fr] text-[#dddcdc] mt-4 sticky top-[15vh] py-4 px-12 duration-300 ease-in-out   '>
              <div className='col'>
                <span>#</span>
              </div>
              <div className='col'>
                <span>TITLE</span>
              </div>
              <div className='col'>
                <span>ALBUM</span>
              </div>
              <div className='col'>
                <span>
                  <AiFillClockCircle/>
                </span>
              </div>
            </div>
            <div className='tracks mx-8 flex flex-col mb-20 ' >
              {
                selectedPlaylist.tracks.map(
                  (
                    {
                      id,
                      name,
                      artists,
                      image,
                      duration,
                      album,
                      context_uri,
                      track_number},
                      index
                      ) => {
                  return (
                    <div className='row py-2 px-4 grid grid-cols-[0.3fr,3.1fr,1.9fr,0.1fr] hover:bg-[rgba(0,0,0,0.7)] cursor-pointer ' key={id} onClick={()=> playTrack(id,name,artists,image,context_uri,track_number)}>
                      <div className='col flex items-center text-[#dddcdc] '>
                        <span>{index+1}</span>
                      </div>
                      <div className='col detail flex gap-4 items-center text-[#dddcdc] '>
                        <div className='image'>
                          <img src={image} alt="track" className='h-[40px] ' />
                        </div>
                        <div className='info flex flex-col'>
                          <span className='name'>{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className='col flex items-center text-[#dddcdc]'>
                        <span>{album}</span>
                      </div>
                      <div className='col flex items-center text-[#dddcdc]'>
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          </>
        )
      }
    </div>
  )
}
