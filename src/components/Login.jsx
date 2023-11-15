

export const Login = () => {

  const handleClick = () => {
    const clientId = "4cf65466c8614575bc221ae642651740";
    const redirectUrl="http://localhost:5173/"
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played"
    ]
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_daialog=true`
  }

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw] bg-[#1db954] gap-20 ">
      <img className="h-[20vh]" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="Spotify logo" />
      <button onClick={handleClick} className=" px-20 py-4 rounded-full text-lg bg-black text-[#49f585] cursor:pointer">Connect Spotify</button>

    </div>
  )
}
