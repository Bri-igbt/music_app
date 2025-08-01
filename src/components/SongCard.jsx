import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"

import PlayPause from "./PlayPause"
import { playPause, setActiveSong } from "../redux/features/playerSlice"

const SongCard = ({ song, isPlaying, activeSong, data, i}) => {
  const dispatch = useDispatch();
  
  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true));
  }

  return (
    <div className="flex flex-col w-[245px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">

        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.albumName === song.attributes.albumName ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause 
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>

        <img 
          src={song.attributes.artwork.url} 
          alt="song_img" 
          className="w-full h-full rounded-lg"
        />
      </div>

      <div className="mt-4 flex flex-col ">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>
            {song.attributes.albumName}
          </Link>
        </p>

        <p className="truncate text-sm text-gray-300 mt-1">
          <Link to={song.attributes.artistName ? `/artists/${song?.attributes.artistName[0]?.adamid}` : '/top-artist'}>
            {song.attributes.artistName}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SongCard
