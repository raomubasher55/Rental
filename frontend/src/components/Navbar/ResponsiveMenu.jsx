import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Navlinks } from "./Navbar"; // Importing nav links for consistent links in mobile view

const ResponsiveMenu = ({ showMenu, theme, setTheme, handleOnLogout, user, company, loading }) => {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleAccountDropdown = () => {
    setShowAccountDropdown(!showAccountDropdown);
  };

  return (
    <div
      className={`${showMenu ? "left-0" : "-left-[100%]"
        } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between  bg-white dark:bg-gray-900 dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      <div className="flex items-center justify-start gap-3">
        <FaUserCircle size={50} />
        <div>
          <h1>Hello {user?.name || "User"}</h1>
          <h1 className="text-sm text-slate-500">Premium user</h1>
        </div>
      </div>

      <div>
        <nav className="mt-12">
          <ul className="space-y-4 text-xl">
            {Navlinks.map(({ id, name, link }) => (
              <li key={id}>
                <a href={link} className="mb-5 inline-block">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Account dropdown in mobile view */}
        <div className="relative">
          <button
            onClick={toggleAccountDropdown}
            className="text-lg font-medium hover:text-primary py-2 transition-colors duration-500"
          >
            Account
          </button>

          {/* Dropdown */}
          {showAccountDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
            >
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
                        : 'Admin Dashboard'
                      )
                    )
                }
              </Link>

              <Link
                to="/company-login"
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
          )}
        </div>
      </div>

      <div className="footer">
        <h1>
          Made with ❤ by <a href="https://dilshad-ahmed.github.io/">Rao Mubasher</a>
        </h1>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
