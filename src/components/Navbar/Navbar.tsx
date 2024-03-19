import { Outlet } from "react-router-dom";
import { CiDumbbell } from "react-icons/ci";

export const Navbar = () => {
  return (
    <>
      <div className="navbar bg-primary text-primary-content">
        <div className="navbar-start pl-5">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost sm:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] shadow bg-primary rounded-box w-52"
            >
              <li>
                <a>Get All Workouts</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-secondary btn-ghost text-xl font-bold hover:bg-primary">
            <CiDumbbell className="text-xl" />
            Work It
          </a>
        </div>
        {/* <div className="navbar-end hidden sm:flex">
          
        </div> */}
        <div className="navbar-end pr-5">
          <ul className="menu menu-horizontal items-center px-1 hidden sm:flex">
            <li>
              <a>Add workout</a>
            </li>
          </ul>
          <a className="btn">sign In</a>
        </div>
      </div>
      <Outlet />
    </>
  );
};
