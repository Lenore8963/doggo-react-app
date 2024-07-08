import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth-context";
import logo from "../images/logo-new.png";
import "./styles.css";

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const activeLink = (linkPath) => {
    return pathname === linkPath;
  };

  const menuItems = [
    { to: "/", label: "Home" },
    ...(user
      ? [
          { to: `/profile/${user._id}`, label: "Profile" },
          { to: "/search", label: "Search" },
          { to: "/square", label: "Square" },
        ]
      : [
          { to: "/login", label: "Login" },
          { to: "/register", label: "Register" },
        ]),
  ];

  return (
    <>
      {/* Hamburger button */}
      <div className="fixed top-0 left-0 p-4 md:hidden z-50">
        <button
          onClick={toggleMenu}
          className="text-gray-800 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      {/* Menu for larger screens */}
      <div className="hidden md:flex md:flex-col md:w-1/5 p-4 h-full fixed left-0">
        <img
          id="logo"
          src={logo}
          alt="logo"
          className="w-30 h-30 rounded-full mx-auto mt-10 mb-10 ml-10 mr-10 cursor-pointer"
          onClick={() => document.body.classList.toggle("dark-mode")}
        />
        <nav className="flex flex-col items-center">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.to}>
                <Link
                  className={`nav-item ${
                    activeLink(item.to) ? "bg-[#7fffd4] text-white" : ""
                  }`}
                  to={item.to}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <button className="nav-item text-white" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 bg-white p-4 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="text-gray-800 focus:outline-none mb-4"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <nav className="flex flex-col items-center">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.to}>
                <Link
                  className={`nav-item ${
                    activeLink(item.to) ? "bg-[#7fffd4] text-white" : ""
                  }`}
                  to={item.to}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <button className="nav-item text-white" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
