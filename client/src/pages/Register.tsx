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
    try {
      console.log("Registering account with: ", loginData);
      await register(loginData);
      navigate("/login");
    } catch (err) {
      setErrorMessage("Duplicate account detected.");
      console.error("Failed to create account", err);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Register Account</h1>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={loginData.username || ""}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={loginData.email || ""}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={loginData.password || ""}
          onChange={handleChange}
        />
        <p className="error">{errorMessage}</p>
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};

export default Register;
