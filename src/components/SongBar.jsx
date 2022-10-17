import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';

const truncate = (title) => {
  if (title?.length > 22) {
    return title.slice(0, 22) + '...';
  } else {
    return title;
  }
};

const SongBar = ({
  song,
  i,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div
    className={`relative w-full flex flex-row items-center hover:bg-[#4c426e] ${
      activeSong?.title === song?.title ? 'bg-[#4c426e]' : 'bg-transparent'
    } py-2 p-4 rounded-lg cursor-pointer mb-2`}
  >
    {!artistId && !song?.images?.coverart && (
      <div className="absolute w-full h-full z-10 bg-black -m-4 rounded-lg bg-opacity-50"></div>
    )}
    <h3 className="font-bold text-base text-white mr-3">
      {i < 9 ? `0${i + 1}` : i + 1}.
    </h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={
          artistId
            ? song?.attributes?.artwork?.url
                .replace('{w}', '125')
                .replace('{h}', '125')
            : song?.images?.coverart
        }
        alt={truncate(song?.title)}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        {!artistId ? (
          <Link to={`/songs/${song.key}`}>
            <p className="text-xl font-bold text-white p-1 rounded-md border border-transparent hover:border-white">
              {song?.title}
            </p>
          </Link>
        ) : (
          <p className="text-xl font-bold text-white p-1 rounded-md">
            {song?.attributes?.name}
          </p>
        )}
        <p className="text-base text-gray-300 p-1 rounded-md">
          {artistId ? song?.attributes?.albumName : song?.subtitle}
        </p>
      </div>
    </div>
    {!artistId ? (
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick(song, i)}
      />
    ) : null}
  </div>
);

export default SongBar;
