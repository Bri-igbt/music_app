import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  
  <div className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong?.attributes?.albumName === song?.attributes?.albumName ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
  <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>

    <div className="flex-1 flex flex-row justify-between items-center">
      <img 
        className="w-15 h-20 rounded-lg" 
        src={song.attributes.artwork.url} 
        alt={song?.attributes?.albumName} 
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.id}`}>
          <p className="text-l font-bold text-white trucate">
            {song?.attributes?.albumName }
          </p>
        </Link>

        <Link to={`/artists/${song?.id}`}>
          <p className=" text-gray-300 mt-1 text-sm">
            {song?.attributes?.artistName}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  })

  const topPlays = data?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true));
  }
  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[400px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl"> Top Chart </h2>

          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>

        <div className="mt-4 flex-col flex gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl"> Top Artist </h2>

          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>

        <Swiper 
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide 
              key={song?.key}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${song?.attributes.artistName.adamid}`}>
                <img 
                  src={song.attributes.artwork.url}  
                  alt="name" 
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>

    </div>
  )
}

export default TopPlay
