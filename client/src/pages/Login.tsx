import { useState, FormEvent, ChangeEvent } from "react";

import auth from "../utils/auth";
import { login } from "../api/authAPI";
import { useNavigate, useOutletContext } from "react-router-dom";
import LoginProps from "../interfaces/LoginProps";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setLoggedIn }: LoginProps = useOutletContext();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Check if any field is empty
    if (!loginData.username || !loginData.password) {
      setErrorMessage("All fields are required.");
      return;
    }
    try {
      const data = await login(loginData);
      auth.login(data.token);
      setLoggedIn(true);
      navigate("/");
    } catch (err) {
      setErrorMessage("Credentials are incorrect.");
      console.error("Failed to login", err);
    }
  };

  return (
    <div className="container mt-5">
      <form className="form text-light " onSubmit={handleSubmit}>
        <h1 className="mb-4">Login</h1>
        <label className="fs-4 mb-4">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={loginData.username || ""}
          onChange={handleChange}
        />
        <label className="fs-4 mb-4">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={loginData.password || ""}
          onChange={handleChange}
        />
        <p className="error">{errorMessage}</p>
        <button type="submit" className="btn btn-secondary btn-block">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
