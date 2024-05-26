import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  console.log(isMenuOpen);

  return (
    <nav className="bg-gray-300">
      <div className="flex items-center justify-between">
        {/* 1st logo part */}
        <Link to="/">
        <div className="flex items-center bg-orange-400  rounded-lg shadow-lg mr-3">
        <div className="flex items-center flex-col">
           <img
          src="Images/logo.png"
          alt="logo"
          className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 "
        />
        <span className="text-white text-2xl mt-1 sm:text-3xl md:text-4xl">लोक उत्थान 
        </span>
        <span className="text-white text-2xl mt-1 sm:text-3xl md:text-4xl">पहल फाउंडेशन
        </span>
        </div>
        </div>
        </Link>

        {/* Mobile Donate Link */}
        <div className="md:hidden flex-1 text-center">
          <Link
            to="/donate"
            className="text-white bg-orange-400 px-4 py-2 rounded-md text-2xl"
          >
            Donate
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button className="text-orange-400 p-3  " onClick={toggleMenu}>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-10 h-10"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4 text-xl text-orange-400 ">
          <li>
            <Link to="/"  className="hover:text-orange-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/projects" className="hover:text-orange-500">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/partner" className="hover:text-orange-500">
              Partner
            </Link>
          </li>
          <li>
            <Link to="/volunteers" className="hover:text-orange-500">
              Volunteers
            </Link>
          </li>

          <li>
            <Link to="/contact" className="hover:text-orange-500">
              Contact
            </Link>
          </li>
          <li>
            {/* Donate Link - Always Visible */}
            <Link
              to="/donate"
              className="text-white bg-orange-400 px-4 py-2 rounded-md ml-4 text-3xl"
            >
              Donate
            </Link>
          </li>
        </ul>
      </div>

      {/*Mobile Menu */}
      {isMenuOpen ? (
        <ul className="m-4 flex-col md:hidden text-2xl  text-orange-400 ">
          <li className="py-2">
            <Link to="/" className="hover:text-orange-500" >
              Home
            </Link>
          </li>
          <li className="py-2">
            <Link to="/projects" className="hover:text-orange-500">
              Projects
            </Link>
          </li>
          <li className="py-2">
            <Link to="/partner" className="hover:text-orange-500" >
              Partner
            </Link>
          </li>
          <li className="py-2">
            <Link to="/volunteers" className="hover:text-orange-500">
              Volunteers
            </Link>
          </li>

          <li className="py-2">
            <Link to="/contact" className="hover:text-orange-500" >
              Contact
            </Link>
          </li>
        </ul>
      ) : null}
    </nav>
  );
};

export default Navbar;

