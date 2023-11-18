import { useEffect } from "react"
import { useStateProvider } from "../utils/StateProvider"
import axios from "axios";
import { reducerCases } from "../utils/Constants";


export const CurrentTrack = () => {
    const [{token,currentPlaying},dispatch] = useStateProvider();

    useEffect(()=>{
        const getCurrentTrack = async () => {
            const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing",{
                headers:{
                    "Content-Type": "applications/json",
                    Authorization: "Bearer " + token,
                    }
                }
            )
            if(response.data !== ""){
                const {item} = response.data
                const currentPlaying = {
                    id:item.id,
                    name:item.name,
                    artists:item.artists.map((artist)=>artist.name),
                    image:item.album.images[2].url,

                }
                dispatch({type:reducerCases.SET_PLAYING,currentPlaying})
            }else {
                dispatch({type:reducerCases.SET_PLAYING,currentPlaying:null})
            }
        }
        getCurrentTrack()

    },[token,dispatch])

return (
    <div className="Container">
        {
            currentPlaying && (
                <div className="track flex items-center gap-4 ">
                    <div className="track_image">
                        <img src={currentPlaying.image} alt="currentlyPlaying" />
                    </div>
                    <div className="track_info flex flex-col gap-2 ">
                        <h4 className="text-white">{currentPlaying.name}</h4>
                        <h6 className="text-[#b3b3b3]">{currentPlaying.artists.join(", ")}</h6>
                    </div>
                </div>
            )
        }
    </div>
    )
}
