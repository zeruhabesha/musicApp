
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-red-500 to-yellow-500 fixed top-0 left-0 right-0 bottom-0 z-10 h-20">
      <div className="container mx-auto flex items-center justify-between px-5 py-4">
        <NavLink to="/" className="text-white hover:text-gray-200 font-bold text-xl">
          HOME
        </NavLink>
        <div className="hidden lg:block">
        </div>
        <div className="lg:hidden">
          <button className="text-white focus:outline-none block lg:hidden">
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="3" y1="12" x2="17" y2="12"></line>
              <line x1="5" y1="9" x2="15" y2="9"></line>
              <line x1="8" y1="6" x2="12" y2="6"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;