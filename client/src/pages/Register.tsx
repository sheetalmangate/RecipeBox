import { useState, FormEvent, ChangeEvent } from "react";

// import auth from '../utils/auth';
import { register } from "../api/registerAPI";
import { useNavigate } from "react-router-dom";
// import LoginProps from "../interfaces/LoginProps";

const Register = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
    if (!loginData.username || !loginData.email || !loginData.password) {
      setErrorMessage("All fields are required.");
      return;
    }
    try {
      await register(loginData);
      navigate("/login");
    } catch (err) {
      setErrorMessage("Duplicate account detected.");
      console.error("Failed to create account", err);
    }
  };

  return (
    <div className="container mt-5">
      <form className="form text-light" onSubmit={handleSubmit}>
        <h2 className="mb-4">Register Account</h2>
        <label className="fs-4 mb-4">Username</label>
        <input
          className="text-light"
          type="text"
          name="username"
          value={loginData.username || ""}
          onChange={handleChange}
        />
        <br />
        <label className="fs-4 mb-4">Email</label>
        <input
          className="text-light"
          type="email"
          name="email"
          value={loginData.email || ""}
          onChange={handleChange}
        />
        <br />
        <label className="fs-4 mb-4">Password</label>
        <input
          className="text-light"
          type="password"
          name="password"
          value={loginData.password || ""}
          onChange={handleChange}
        />
        <br />
        <p className="error">{errorMessage}</p>
        <button type="submit" className="btn btn-secondary btn-block">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
