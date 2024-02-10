import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Admin from "./components/cruds/CrudTable";
import CrudDetails from "./components/cruds/CrudDetails";
import CrudEdit from "./components/cruds/CrudEdit";
import CrudDelete from "./components/cruds/CrudDelete";

function App() {
	return (
		<div className="App">
			<Router>
			<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/songs/:_id" element={<CrudDetails />} />
					<Route exact path="/api/" element={<Home />} />
					<Route exact path="/home" element={<Admin />} />					
					<Route exact path="/songs/:_id/edit" element={<CrudEdit />} />
					<Route exact path="/songs/:_id/delete" element={<CrudDelete />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;

					