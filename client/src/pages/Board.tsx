import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import LoginProps from "../interfaces/LoginProps";

import auth from "../utils/auth";

const Board = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn }: LoginProps = useOutletContext();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = auth.getToken();
        if (token) {
          setLoggedIn(true);
        }
      } catch (err) {
        setError(true);
        console.error("Failed to check if logged in", err);
      }
    };
    checkLoggedIn();
  });

  if (error) {
    navigate("/login");
  }

  return (
    <>
      {!loggedIn ? (
        <div className="login-notice">
          <h1>Login to create, save, & view recipes</h1>
        </div>
      ) : (
        <h1>Recipe Box</h1>
      )}
    </>
  );
};

export default Board;
