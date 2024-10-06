import auth from "../utils/auth";
import { useNavigate, useOutletContext } from "react-router-dom";
import LoginProps from "../interfaces/LoginProps";

const Logout = () => {
  const navigate = useNavigate();
  const { setLoggedIn }: LoginProps = useOutletContext();

  auth.logout();
  setLoggedIn(false);
  navigate("/login");

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
