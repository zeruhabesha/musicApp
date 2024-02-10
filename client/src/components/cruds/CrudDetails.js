
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

function CrudDetails(props) {
  const [crud, setCrud] = useState({});
  const { _id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCrud() {
      try {
        const response = await axios.get(`http://localhost:4000/api/songs/view/${_id}`);

        if (response.data && response.data.song) {
          setCrud(response.data.song);
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
    getCrud();
  }, []);

  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete this song? ")) {
      try {
        await axios.delete(`http://localhost:4000/api/songs/delete/${_id}`);
        navigate("/home");
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
  
  <div >
    <Navbar />
	<div className="container mx-auto my-10 px-0 py-20">
      
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!isLoading && !error && (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">{crud.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white shadow rounded-lg">
              <p className="mb-2 font-bold">Artist:</p>
              <p>{crud.artist}</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <p className="mb-2 font-bold">Album:</p>
              <p>{crud.album}</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <p className="mb-2 font-bold">Genre:</p>
              <p>{crud.genre}</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <p className="mb-2 font-bold">Photo:</p>
              <img src={crud.imageFile} alt="" className="w-full" />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Link to={`/songs/${crud._id}/edit`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit
            </Link>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4">
              Delete
            </button>
            <Link to="/home" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4">
              Close
            </Link>
          </div>
        </div>
      )}
 </div>
      <Footer />
    </div>
  );
}


export default CrudDetails;
