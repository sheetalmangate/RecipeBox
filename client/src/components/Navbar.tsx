// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import LoginProps from "../interfaces/LoginProps";
import { useState, useEffect } from "react";

const Navbar = (props: LoginProps) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    // make sure user is still logged in (i.e. token is still valid)
    if (auth.loggedIn()) {
      const { username } = auth.getProfile();
      setUsername(username);
    } else {
      setUsername("");
    }
  }, [props.loggedIn]);

  return (
    <div className="nav">
      <div className="nav-title">
        {/* {location.pathname !== "/" && ( */}
        <Link to="/">
          <h3 className="btn-recipe cursor-pointer">
            {username ? `${username}'s Recipe Box` : "Recipe Box"}
          </h3>
        </Link>
        {/* )} */}
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
                <Link className="btn-recipe cursor-pointer" to="/search">
                  Search Recipes
                </Link>
              </li>
            )}
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-secondary btn-block curson-pointer"
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
