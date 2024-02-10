import React from "react";
import HeadPhone from './img/headphones.svg';
import { Link } from "react-router-dom";
import Pro from "./img/pro.png";

class Home extends React.Component {
  render() {
    return (
      <section className="bg-gradient-to-r from-red-500 to-yellow-500 h-screen flex flex-col">
        <div className="h-1/6 flex items-center justify-center">
          <h1 className="text-6xl text-white font-pacifico">MUSIC APP</h1>
        </div>
        <div className="h-5/6 flex">
          <div className="w-1/2 flex items-center justify-center">
            <img className="w-3/5" src={HeadPhone} alt="" />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center">
          <img src={Pro} style={{width:`28%`, borderRadius:`50%`}} />
          
            <h1 className="text-6xl font-bungee" >Zerihun Kibret</h1>
            <p className="text-white text-lg">MERN stack Project</p>
            <Link to="/home" className="bg-blue-900 text-white font-bold px-4 py-2 rounded-md uppercase tracking-wide hover:bg-blue-800 mt-6">
            Start Listening
          </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;