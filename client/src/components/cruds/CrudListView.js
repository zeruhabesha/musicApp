import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CrudListView() {
  const [cruds2, setCruds2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCruds() {
		try {
		  const response = await axios.get("http://localhost:4000/api/songs/view");
	  
		  // Check if the response data is an object with a "songs" key
		  if (typeof response.data === 'object' && response.data.hasOwnProperty('songs')) {
			// Set the cruds2 state to the songs array
			setCruds2(response.data.songs);
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

  return (
    <div className="container">
      {isLoading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error: {error}</p> // Display actual error message to user
      ) : (
        <div className="d-flex flex-wrap">
          {cruds2.map((crud) => (
            <div
              key={crud._id}
              className="card m-7"
              style={{ maxWidth: "150vh" }}
            >
					<div
						className="card"
						style={{ width: "150vh" }}
						key={crud._id}
					>
						<div className="row g-0">
							<div className="col-md-4 pl-5 ">
								<img src={crud.imageFile} className="img-fluid rounded-start" alt="..."/>
								
							</div>
							<div className="col-md-8">
								<div class="card-header">
									<h5 className="card-title">
										<Link to={`/songs/${crud._id}`} className="link-line">
											{crud.title}
										</Link>
									</h5>
								</div>
								<div className="card-body ">
									<h6 className="d-flex align-items-center">
										<i className=" text-success"></i>
											{crud.artist}
									</h6>
									<p className="card-text limit-char">{crud.album}</p>
									<p className="card-text  d-flex align-items-center">
										<i className="bi bi-geo-alt-fill text-warning"></i>
										<small className="text-muted one-liner">
											{crud.genre}
										</small>
									</p>

									<div class="card-footer">
										<Link
											to={`/songs/${crud._id}/edit`}
											className="btn btn-primary"
										>
											Edit
										</Link>
										<span>
											<small>
												<Link to={`/songs/${crud._id}`} className="link-line">
													Read More...
												</Link>
											</small>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div><br/>
					</div>
					
          ))}
        </div>
      )}
    </div>
  );
}

export default CrudListView;