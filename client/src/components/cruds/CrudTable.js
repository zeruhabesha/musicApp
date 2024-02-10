import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import CrudGridView from "./CrudGridView";
import CrudListView from "./CrudListView";
import CrudView from "./CrudView";
import CrudAdd from "./CrudAdd";
import { useNavigate } from "react-router-dom";

function CrudTable(props) {

  const [cruds, setCruds] = useState([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const handleApprove = () => {
    setShow(true);
  };

  const handleReqClose = () => {
    setShow(false);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleEditClose = () => {
    setEdit(false);
  };



  function handleCancel() {
    navigate("/home");
  }



  const handleMain = () => {
    // Display class B and hide others
    document.querySelector(".B").style.display = "none";
    document.querySelector(".A").style.display = "none";
    document.querySelector(".C").style.display = "block";
  };

  const handleGrid = () => {
    // Display class B and hide others
    document.querySelector(".A").style.display = "block";
    document.querySelector(".B").style.display = "none";
    document.querySelector(".C").style.display = "none";
  };

  const handleList = () => {
    // Display class C and hide others
    document.querySelector(".B").style.display = "block";
    document.querySelector(".A").style.display = "none";
    document.querySelector(".C").style.display = "none";
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-28">
        <div>
          <h2>
            <p>
              <button
                className="btn btn-warning float-left"
                onClick={() => handleApprove()}
              >
                Add-Song
              </button>
             
			   <button
                className="btn btn-danger m-1"
                style={{ float: "right" }}
                onClick={() => handleGrid()}
              >
                <i className="bi bi-grid-fill"></i>
              </button>
              
            
			  <button
                className="btn btn-danger m-1"
                style={{ float: "right" }}
                onClick={() => handleList()}
              >
                <i className="bi bi-list"></i>
              </button>

              <button
                className="btn btn-danger m-1"
                style={{ float: "right" }}
                onClick={() => handleMain()}
              >
                <i className="bi bi-eye"></i>
              </button>
			  </p>
          </h2>
        </div>
        <br />
        <div className="B mt-10" style={{ display: "none" }}>
          <CrudListView />
        </div>
		  <div className="A mt-10" style={{ display: "none" }}>
          <CrudGridView />
        </div>
		<div className="table-responsive C mt-10" >
          <CrudView />
        </div>
        {/* <CrudAdd /> */}
       
        <Modal show={show} onHide={handleReqClose}>
  <Modal.Header className="modal-header" closeButton>
    <Modal.Title>Add New Song</Modal.Title>
  </Modal.Header>
          <Modal.Body>
            <CrudAdd />
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </div>
  );
}

export default CrudTable;
