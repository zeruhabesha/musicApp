
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AudioPlayer from 'react-audio-player';

function CrudView() {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

	useEffect(() => {
	  async function getCruds() {
		  try {
			const response = await axios.get("http://localhost:4000/api/songs/view");
		
			// Check if the response data is an object with a "songs" key
			if (typeof response.data === 'object' && response.data.hasOwnProperty('songs')) {
			  // Set the cruds2 state to the songs array
			  setSongs(response.data.songs);
			} else {
			  console.error("Invalid data", response.data);
			  setError("Error fetching data: Invalid data format");
			}
		  } catch (error) {
			console.error("Error fetching data", error);
			setError("Error fetching data");
		  } finally {
			setIsLoading(false);
		  }
	  }
	  getCruds();
	}, []);

  const handleSongPlay = (song) => {
    if (song.audioFile) {
      // Replace `<AudioPlayer />` with your actual player component and configuration
      <AudioPlayer src={song.audioFile} controls autoPlay />;
    } else if (song.audioStreamingUrl) {
      // Use external API for streaming (implement your logic here)
    } else {
      console.error('Song has no audio source:', song);
    }
  };

  return (
    <div className="container pt-30 my-2">
      {isLoading && (
        <div>
          <div className="card" />
          <div className="card" />
          <div className="card" />
        </div>
      )}
      {error && <p className="text-center mb-8 text-red-500">{error}</p>}
      {songs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {songs.map((song) => (
            <div key={song._id}>
              <div className="border shadow-md">
                <img
                  className="w-full h-48 object-cover rounded-t-md"
                  src={song.imageFile}
                  alt={song.title}
                />
                <div className="p-4">
                  <h3 className="font-bold text-sm">{song.title}</h3>
                  <p className="text-gray-600 mb-2">
                    {song.artist} - {song.genre}
                  </p>
                  <div className="mt-4">
                    <Link
                      to={`/songs/${song._id}`}
                      className="btn btn-sm btn-warning bg-orange-500 text-white mr-2 float-left"
                    >
                      View
                    </Link>
                    <Link
                      to={`/songs/${song._id}/edit`}
                      className="btn btn-sm btn-success bg-green-500 text-white float-right"
                      >
                      Edit
                      </Link>
                      <button
                      onClick={() => handleSongPlay(song)}
                      className="btn btn-sm btn-primary bg-blue-500 text-white float-right ml-2"
                      >
                      Play
                      </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No songs found.</p>
      )}
    </div>
  );
}

export default CrudView;