// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import LoginProps from "../interfaces/LoginProps";

const Navbar = (props: LoginProps) => {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <div className="nav-title">
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
            <li className="nav-item">
              <Link to="/search">
                <button type="button" id="create-ticket-link">
                  Search Recipes
                </button>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/create">
                <button type="button" id="create-ticket-link">
                  New Recipe
                </button>
              </Link>
            </li> */}
            <li className="nav-item">
              <button
                type="button"
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
  );
};

export default Navbar;
