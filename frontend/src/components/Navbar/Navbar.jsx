import React, { useEffect, useRef, useState } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import { Link, useNavigate } from "react-router-dom";
// import { useUserContext } from "../../context/userContext";
// import ItemTest from "../../Pages/Company/AddItem/ItemTest";
// import Search from "../Search/Search";

export const Navlinks = [
  {
    id: 1,
    name: "HOME",
    link: "/",
  },
  {
    id: 2,
    name: "CRANE",
    link: "/all-categories",
  },
  {
    id: 3,
    name: "ABOUT",
    link: "/about",
  }
];

const Navbar = ({ theme, setTheme }) => {
  // const { user, profileFunction, company, companyProfile, loading } = useUserContext();
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef(null); 
  const searchResultsRef = useRef(null); 



  useEffect(() => {
    // localStorage.getItem('token') ? profileFunction() : "";
    // localStorage.getItem('companyToken') ? companyProfile() : "";
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target) &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSearchResults(false); // Hide the search results box
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);




  const handleFocus = () => {
    setShowSearchResults(true); // Show the results box when the search bar is focused
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleAccountDropdown = () => {
    setShowAccountDropdown(!showAccountDropdown);
  };

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


  const handleOnLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('companyToken');
    localStorage.clear();
    navigate('/login');
  }


  return (
    <div
      className="fixed  z-40 shadow-md w-full dark:bg-black bg-white dark:text-white duration-300"
    >
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold font-serif">Shark Rent</span>
          </div>


          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">

              {/* Add the Search Bar */}
              <li className="relative">
                <input
                  ref={searchInputRef} 
                  type="text"
                  placeholder="Search"
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  onFocus={handleFocus}
                  className="py-2 px-4 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </li>


                {/* {showSearchResults && (
                  <div
                    ref={searchResultsRef} 
                    className="absolute w-full mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10"
                  >
                    <div className="p-4 border-b">
                      <Search /> 
                    </div>
                  </div>
                )} */}



              {Navlinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  <Link
                    to={link}
                    className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                  >
                    {name}
                  </Link>
                </li>
              ))}







              {/* Account dropdown */}
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleAccountDropdown}
                  className="relative text-lg font-medium hover:text-primary py-2 transition-colors duration-500"
                >
                  ACCOUNT
                </button>

                {/* Dropdown */}
                {/* {showAccountDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                    <Link
                      to={
                        loading
                          ? '#' // Show nothing or a placeholder link while loading
                          : (company
                            ? '/company-dashboard'
                            : (user?.role === 0
                              ? '/dashboard'
                              : '/admin-dashboard'
                            )
                          )
                      }
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {
                        loading
                          ? '#' // Show nothing or a placeholder link while loading
                          : (company
                            ? "Company Dashboard"
                            : (user?.role === 0
                              ? 'Dashboard'
                              : 'Dashboard'
                            )
                          )
                      }
                    </Link>


                    <Link
                      to={user ? `/company-login` : '/login'}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {user && user ? "Login as Company" : "Login as User"}
                    </Link>
                    <button
                      className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={handleOnLogout}
                    >
                      Logout
                    </button>
                  </div>
                )} */}
              </li>

              {/* Dark Mode Toggle */}
              {theme === "dark" ? (
                <BiSolidSun
                  onClick={() => setTheme("light")}
                  className="text-2xl cursor-pointer"
                />
              ) : (
                <BiSolidMoon
                  onClick={() => setTheme("dark")}
                  className="text-2xl cursor-pointer"
                />
              )}
            </ul>
          </nav>

          {/* Mobile view */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Dark Mode Toggle */}
            {theme === "dark" ? (
              <BiSolidSun
                onClick={() => setTheme("light")}
                className="text-2xl cursor-pointer"
              />
            ) : (
              <BiSolidMoon
                onClick={() => setTheme("dark")}
                className="text-2xl cursor-pointer"
              />
            )}

            {/* Mobile Hamburger icon */}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
      </div>

      {/* Responsive mobile menu */}
      <ResponsiveMenu
        showMenu={showMenu}
        theme={theme}
        setTheme={setTheme}
        handleOnLogout={handleOnLogout}
      />    </div>
  );
};

export default Navbar;
