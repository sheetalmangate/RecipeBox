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
    <nav className="nav navbar-expand-lg">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center ">
          {props.loggedIn &&
            (location.pathname === "/" ? (
              <li className="navbar-brand">
                <Link to="/search" className="btn-recipe text-decoration-none">
                  Search Recipes
                </Link>
              </li>
            ) : (
              <li className="navbar-brand">
                <Link to="/" className="btn-recipe text-decoration-none">
                  Recipes Box
                </Link>
              </li>
            ))}
          <div className="d-flex flex-grow-1 justify-content-center ">
            {props.loggedIn ? (
              <h2
                style={{
                  color: "#FFD1DC",
                  fontStyle: "italic",
                  fontWeight: "bold",
                  textAlign: "center",
                  // display:"flex",
                  // alignContent:"center",
                }}
              >
                Welcome back to your Recipe Box,{" "}
                <span style={{ color: "#4FABF2" }}>{username}!</span>
                <br />
                Ready to cook up something delicious?
              </h2>
            ) : (
              <h2
                style={{
                  color: "#FFD1DC",
                  fontStyle: "italic",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                className="text-center "
              >
                Welcome to Recipe Box
              </h2>
            )}
          </div>
        </div>
        <div className="d-flex flex-column align-items-end ms-auto">
          <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-end">
            {!props.loggedIn ? (
              location.pathname === "/register" ? (
                <li className="nav-item">
                  <Link to="/login">
                    <button
                      type="button"
                      className="btn btn-secondary btn-block"
                    >
                      Login
                    </button>
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/register">
                    <button
                      type="button"
                      className="btn btn-secondary btn-block"
                    >
                      Register Account
                    </button>
                  </Link>
                </li>
              )
            ) : (
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
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
