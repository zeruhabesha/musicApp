import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CrudAdd(props) {
  const initialState = {
    title: "",
    artist: "",
    album: "",
    genre: "",
    songFile: null,
    imageFile: null,
  };
  const [crud, setCrud] = useState(initialState);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      setErrorMessage("");

      const formData = new FormData();
      formData.append("title", crud.title);
      formData.append("artist", crud.artist);
      formData.append("album", crud.album);
      formData.append("genre", crud.genre);
      formData.append("songFile", crud.songFile);
      formData.append("imageFile", crud.imageFile);

      const response = await axios.post(
        `http://localhost:4000/api/songs/add`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        console.log("Song created successfully:", response.data);
        navigate("/home");
      } else {
        const errorData = await response.data;
        const parsedErrorMessage = errorData?.message || response.statusText;
        setErrorMessage(parsedErrorMessage);
      }
    } catch (error) {
      console.error("Error posting data:", error);
      if (error.response) {
        const parsedErrorMessage =
          error.response.data?.message || error.response.statusText;
        setErrorMessage(parsedErrorMessage);
      } else {
        setErrorMessage("An error occurred while submitting the form.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(event) {
    setCrud({ ...crud, [event.target.name]: event.target.value });
  }
  function handleFileChange(event) {
    // Logic for handling file change goes here
  }
  return (
    <div className="container mx-auto p-4">  
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="form-group">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={crud.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="artist" className="block text-sm font-medium text-gray-700">
              Artist
            </label>
            <input
              type="text"
              id="artist"
              name="artist"
              required
              value={crud.artist}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="album" className="block text-sm font-medium text-gray-700">
              Album
            </label>
            <input
              type="text"
              id="album"
              name="album"
              required
              value={crud.album}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre" className="block text-sm font-medium
            text-gray-700">
            Genre
            </label>
              <input
              type="text"
              id="genre"
              name="genre"
              required
              value={crud.genre}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
              />
            </div>
    <div className="form-group">
          <label htmlFor="songFile" className="block text-sm font-medium text-gray-700">
            Song File
          </label>
          <input
            type="file"
            id="songFile"
            name="songFile"
            accept="audio/*"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">
            Image File
          </label>
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            accept="image/*"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Song"}
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 bg-red-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 float:right"
            onClick={() => navigate("/home")}
          >
            {"Cancel"}
          </button>
        </div>    </div>
      </form>
    </div>
  );
}

export default CrudAdd;
