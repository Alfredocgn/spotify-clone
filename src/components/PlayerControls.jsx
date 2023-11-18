import {BsFillPlayCircleFill,BsFillPauseCircleFill,BsShuffle} from "react-icons/bs"
import {CgPlayTrackNext,CgPlayTrackPrev} from "react-icons/cg"
import {FiRepeat} from "react-icons/fi"
import { useStateProvider } from "../utils/StateProvider"
import axios from "axios"
import { reducerCases } from "../utils/Constants"


export const PlayerControls = () => {
    const [{token,playerState,currentPlaying},dispatch] = useStateProvider();
    console.log(playerState)
    const changeTrack = async (type) => {
            await axios.post(
                `https://api.spotify.com/v1/me/player/${type}`,
                {},
                {
                headers: {
                    "Content-Type": "applications/json",                                                                                                                                                                                                                                                                                                                                                                
                    Authorization: "Bearer " + token,
                },
                }
            );
            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });

            const response1 = await axios.get(
                "https://api.spotify.com/v1/me/player/currently-playing",
                {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                }
            );

            if (response1.data !== "") {
                const currentPlaying = {
                id: response1.data.item.id,
                name: response1.data.item.name,
                artists: response1.data.item.artists.map((artist) => artist.name),
                image: response1.data.item.album.images[2].url,
                };
                dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
            } else {
                dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
            }

        
    };
    const changeState = async () => {
        const state = playerState ? "pause" : "play";
        const response = await axios.put(`https://api.spotify.com/v1/me/player/${state}`,{},{
            headers:{
                Authorization: "Bearer " + token,
                "Content-type": "application/json",
            }
        })
        dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:!playerState})
    }
    

return (
    <div className="Container flex items-center justify-center gap-8">
        <div className="shuffle">
            <BsShuffle className="text-[#b3b3b3] duration-200 ease-out hover:text-white text-2xl cursor-pointer "/>
        </div>
        <div className="previous">
            <CgPlayTrackPrev onClick={()=> changeTrack("previous")} className="text-[#b3b3b3] duration-200 ease-out hover:text-white text-3xl cursor-pointer" />
        </div>
        <div className="state">
            {
                playerState ? <BsFillPauseCircleFill onClick={changeState} className="text-[#b3b3b3] duration-200 ease-out cursor-pointer hover:text-white text-2xl"/> : <BsFillPlayCircleFill onClick={changeState} className="text-[#b3b3b3] cursor-pointer duration-200 ease-out hover:text-white text-2xl"/>
            }
        </div>
        <div className="next">
            <CgPlayTrackNext    className="text-[#b3b3b3] cursor-pointer duration-200 ease-out hover:text-white text-3xl" onClick={()=> changeTrack("next")}/>
        </div>
        <div className="repeat">
            <FiRepeat className="text-[#b3b3b3] cursor-pointer duration-200 ease-out hover:text-white text-2xl"/>
        </div>
    </div>
    )
}
