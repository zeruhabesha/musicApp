import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CrudGridView() {
  const [cruds, setCruds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCruds() {
      try {
        const response = await axios.get("http://localhost:4000/api/songs/view");
        setCruds(response.data.songs);
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    }
    getCruds();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <p className="text-center text-lg font-medium">Loading data...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cruds.map((crud) => (
            <div
              key={crud._id}
              className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative group">
                <img
                  src={crud.imageFile}
                  alt="Song image"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 opacity-75 group-hover:opacity-0 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <h5 className="text-lg font-medium mb-2">
                  <Link to={`/songs/${crud._id}`} className="hover:underline">
                    {crud.title}
                  </Link>
                </h5>
                <p className="text-gray-500 mb-2">Artist: {crud.artist}</p>
                <p className="text-gray-500">Album: {crud.album}</p>
                <p className="text-gray-500">Genre: {crud.genre}</p>
              </div>
              <div className="p-4 bg-gray-100 text-right">
                <Link
                  to={`/songs/${crud._id}/edit`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Edit
                </Link>
                <Link to={`/songs/${crud._id}`} className="text-gray-700 hover:underline">
                  Read More...
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CrudGridView;