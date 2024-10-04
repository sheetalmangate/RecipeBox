import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import LoginProps from "../interfaces/LoginProps";

import auth from "../utils/auth";

const Board = () => {
  const { loggedIn, setLoggedIn }: LoginProps = useOutletContext();
  const [username, setUsername] = useState("");

  useEffect(() => {
    // make sure user is still logged in (i.e. token is still valid)
    if (!auth.loggedIn()) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
      const { username } = auth.getProfile();
      setUsername(username);
    }
  }, []);

  return (
    <>
      {!loggedIn ? (
        <div className="login-notice">
          <h1>Login to create, save, & view recipes</h1>
        </div>
      ) : (
        <>
          <h1>{username}'s Recipe Box</h1>
        </>
      )}
    </>
  );
};

export default Board;
