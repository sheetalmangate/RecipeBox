// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import LoginProps from "../interfaces/LoginProps";

const Navbar = (props: LoginProps) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid ">
        <div className="navbar-brand mx-auto">
          <Link to="/">
            <h3>Recipe Box</h3>
          </Link>
        </div>
        <ul>
          {!props.loggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/register">
                  <button type="button">Register Account</button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login">
                  <button type="button">Login</button>
                </Link>
              </li>
            </>
          ) : (
            <>
              {location.pathname !== "/search" && (
                <li className="nav-item ">
                  <Link className="btn-recipe " to="/search">
                    Search Recipes
                  </Link>
                </li>
              )}
              {location.pathname !== "/test" && (
                <li className="nav-item ">
                  <Link className="btn-recipe " to="/test">
                    Dev
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  onClick={() => {
                    auth.logout();
                    props.setLoggedIn(false);
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
