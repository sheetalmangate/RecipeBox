import { Link } from "react-router-dom";
import auth from "../../utils/auth";
// import { useNavigate } from "react-router-dom";
import LoginProps from "../../interfaces/LoginProps";
import { useState, useEffect } from "react";

function Header(props: LoginProps) {
  // const navigate = useNavigate();
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
    <header>
      <Link to="/">
        <h1>RecipeBox</h1>
      </Link>
      {!props.loggedIn ? (
        <nav>
          <ul>
            <Link to="/register">
              <li>Register Account</li>
            </Link>
            <Link to="/login">
              <li>Sign In</li>
            </Link>
          </ul>
        </nav>
      ) : (
        <nav>
          <h3>{username}</h3>
          <ul>
            {location.pathname !== "/search" && (
              <Link to="/search">
                <li>Search Recipes</li>
              </Link>
            )}
            <Link to="/logout">
              <li>Logout</li>
            </Link>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
