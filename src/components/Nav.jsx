import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimesCircle } from "react-icons/fa";

const Nav = () => {
  const [hbMenu, setHbMenu] = useState(true);
  const collapseHbMenu = useRef();

  const handleResize = (_) => {
    innerWidth >= 640 ? setHbMenu(false) : setHbMenu(true);
  };

  const handleCollapseHbMenu = ({ target: elem }) => {
    innerWidth < 640
      ? !collapseHbMenu.current.contains(elem) ||
        elem.classList.contains("nav-link")
        ? setHbMenu(true)
        : null
      : null;
  };

  useEffect(() => {
    addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleCollapseHbMenu);

    handleResize();

    return () => {
      removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleCollapseHbMenu);
    };
  }, []);

  return (
    <nav className="sticky top-0 bg-gray-100 py-3 z-30" ref={collapseHbMenu}>
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <img src="/logo.png" alt="" className="w-5" />
            <h3 className="font-bold text-lg">ToyState</h3>
          </div>
          <div className="relative flex items-center">
            <span
              className="sm:hidden hover:text-purple-600 cursor-pointer"
              onClick={(_) => setHbMenu(!hbMenu)}
            >
              {hbMenu ? (
                <FaBars className="h-6" />
              ) : (
                <FaTimesCircle className="h-6" />
              )}
            </span>
            <div
              className={`absolute sm:static top-14 right-0 bg-blue-100/70 sm:bg-transparent backdrop-blur sm:backdrop-blur-none w-[calc(100vw_-_2rem)] sm:w-auto rounded-lg shadow-sm sm:shadow-none ${
                hbMenu ? "max-h-0 opacity-0" : "max-h-96 opacity-100"
              } overflow-hidden transition-[max-height,_opacity] duration-500`}
            >
              <ul className="flex flex-col sm:flex-row p-3 sm:p-0 sm:space-x-2 space-y-2 sm:space-y-0">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      "nav-link block hover:text-purple-600" +
                      (isActive ? " text-pink-600" : "")
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/all-toys"
                    className={({ isActive }) =>
                      "nav-link block hover:text-purple-600" +
                      (isActive ? " text-pink-600" : "")
                    }
                  >
                    All Toys
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/blogs"
                    className={({ isActive }) =>
                      "nav-link block hover:text-purple-600" +
                      (isActive ? " text-pink-600" : "")
                    }
                  >
                    Blogs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      "nav-link block hover:text-purple-600" +
                      (isActive ? " text-pink-600" : "")
                    }
                  >
                    Login
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
