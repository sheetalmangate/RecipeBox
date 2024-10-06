import { Link } from "react-router-dom";
import auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import LoginProps from "../../interfaces/LoginProps";
import { useState, useEffect } from "react";

function Header(props: LoginProps) {
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
    <header>
      <Link to="/">
        <h1>RecipeBox</h1>
      </Link>
      {!props.loggedIn ? (
        <nav>
          <ul>
            <Link to="/login">
              <li>Sign In</li>
            </Link>
            <Link to="/register">
              <li>Register Account</li>
            </Link>
          </ul>
        </nav>
      ) : undefined}
    </header>
  );
}

export default Header;
