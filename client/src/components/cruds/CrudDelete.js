import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function CrudDelete(props) {
	const [crud, setCrud] = useState({});

	const { _id } = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function deleteCrudById() {
				try {
					const response = await axios.get(`localhost:4000/api/songs/view/${_id}`);
					setCrud(response.data);
				} catch (error) {
					console.log("error", error);
				}
			}
			deleteCrudById();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props]
	);

	async function handleDelete() {
		try {
			await axios.delete(`localhost:4000/api/songs/delete/${_id}`);
			navigate("/home");
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="container">
			<h2>{crud.title}</h2>

			<p>
				<b>artist</b>: {crud.artist}
			</p>

			<p>
				<b>album</b>: {crud.album}
			</p>
			<p>
				<b>gener</b>: {crud.gener}
			</p>
			
			<p>
				<small>
					<b>ID</b>: {crud._id}
				</small>
			</p>
			<div className="btn-group">
				<button onClick={handleDelete} className="btn btn-danger">
					Delete
				</button>
				<Link to="/cruds" className="btn btn-secondary">
					Cancel{" "}
				</Link>
			</div>
			<hr />
		</div>
	);
}

export default CrudDelete;
