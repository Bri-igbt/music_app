import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";
import { use } from "react";


const SongDetails = () => {
    const { songid } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const dispatch = useDispatch();
    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery(songid);

return (
    <div className="flex flex-col">
        {/* <DetailsHeader 
        artistId={artistId}
        songData={songData}
        /> */}

        <div className="mb-10">
            <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

            <div className="mt-5">
                {songData?.sections[1].type === 'LYRICS' ? 
                    songData.at.text.map((line, i) => (
                        <p>{line}</p>
                    )) : (
                    <p className="text-gray-400">Sorry, no lyrics found!</p>
                    )}
            </div>
        </div>
    </div>
)
}

export default SongDetails
