// Import necessary dependencies at the top
import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";

function CrudEdit(props) {
  const initialState = {
    title: "",
    artist: "",
    album: "",
    genre: "",
    imageFile: null,
    songFile: null,
  };
  const [crud, setCrud] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getCrud() {
      try {
        const response = await axios.get(`http://localhost:4000/api/songs/view/${_id}`);

        if (response.data && response.data.song) {
          setCrud(response.data.song);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Error fetching data: " + error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getCrud();
  }, [_id]);

  async function handleSubmit(event) {
	event.preventDefault();
	try {
	  const formData = new FormData();
	  formData.append("title", crud.title);
	  formData.append("artist", crud.artist);
	  formData.append("album", crud.album);
	  formData.append("genre", crud.genre);
	  formData.append("imageFile", crud.imageFile);
	  formData.append("songFile", crud.songFile);
  
	  const response = await axios.put(
		`http://localhost:4000/api/songs/update/${_id}`,
		formData,
		{
		  headers: {
			"Content-Type": "multipart/form-data",
		  },
		}
	  );
  
	  if (response.status === 200) {
		navigate(`/home`);
	  } else {
		throw new Error("Update failed");
	  }
	} catch (error) {
	  console.error("Error updating data", error);
	  if (error.response) {
		const errorMessage = error.response.data?.message || error.response.statusText;
		setError(`Error updating data: ${errorMessage}`);
	  } else {
		setError("Error updating data: An error occurred");
	  }
	}
  }

  function handleChange(event) {
    if (event.target.name === "imageFile" || event.target.name === "songFile") {
      setCrud({ ...crud, [event.target.name]: event.target.files[0] });
    } else {
      setCrud({ ...crud, [event.target.name]: event.target.value });
    }
  }

  function handleCancel() {
    navigate(`/home`);
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-20">
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-4">Edit {crud.title}</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Form fields */}
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={crud.title}
                onChange={handleChange}
                className="rounded-md border px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="artist" className="text-sm font-medium">
                Artist
              </label>
              <input
                type="text"
                required
                value={crud.artist}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="album" className="text-sm font-medium">
                Album
              </label>
              <input
                type="text"
                id="album"
                name="album"
                value={crud.album}
                onChange={handleChange}
                className="rounded-md border px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="genre" className="text-sm font-medium">
                Genre
              </label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={crud.genre}
                onChange={handleChange}
                className="rounded-md border px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="imageFile" className="text-sm font-medium">
                Image File
              </label>
              <input
                type="file"
               
                id="imageFile"
                name="imageFile"
                onChange={handleChange}
                className="rounded-md border px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="songFile" className="text-sm font-medium">
                Song File
              </label>
              <input
                type="file"
                id="songFile"
                name="songFile"
                onChange={handleChange}
                className="rounded-md border px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CrudEdit;
