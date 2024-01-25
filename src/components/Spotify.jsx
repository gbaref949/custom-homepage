import React from 'react'

const Spotify = () => {
    // const playlistId = '7tOI3aAf4aqFLcH1LZonEh';
  return (
    <div className='music-player'>
      <iframe
        title='Spotify Embed: Recommendation Playlist '
        src={`https://open.spotify.com/embed/playlist/7tOI3aAf4aqFLcH1LZonEh?utm_source=generator&theme=0`}
        width='100%'
        height='100%'
        style={{ minHeight: '360px' }}
        frameBorder='0'
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        loading='lazy'
      />
    </div>
  );
}

export default Spotify
