import auth from "../utils/auth";
import { useNavigate, useOutletContext } from "react-router-dom";
import LoginProps from "../interfaces/LoginProps";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();
  const { setLoggedIn }: LoginProps = useOutletContext();

  useEffect(() => {
    auth.logout();
    setLoggedIn(false);
    navigate("/login");
  });

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
