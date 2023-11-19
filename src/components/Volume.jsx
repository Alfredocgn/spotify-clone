import axios from "axios";
import { useStateProvider } from "../utils/StateProvider"


export const Volume = () => {
  const [{token}] =useStateProvider();
  const setVolume = async (e) => {
    await axios.put(`https://api.spotify.com/v1/me/player/volume`,{},{
      params:{
        volume_percent:parseInt(e.target.value)
      },
      headers:{
        Authorization:"Bearer " + token,
        "Content-Type": "application/json",
      }
    })

  }
  return (
    <div className="Container flex justify-end items-center ">
      <input className="w-[14rem] h-[0.5rem] rounded-3xl    p-0 m-0" type="range" min={0} max={100} onMouseUp={e => setVolume(e)} />
    </div>
  )
}
