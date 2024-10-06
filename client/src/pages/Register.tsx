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
      await register(loginData);
      navigate("/login");
    } catch (err) {
      setErrorMessage("Duplicate account detected.");
      console.error("Failed to create account", err);
    }
  };

  return (
    <>
      <section id="section-register">
        <form id="register-box" className="text-light" onSubmit={handleSubmit}>
          <h2>Register Account</h2>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={loginData.username || ""}
            onChange={handleChange}
          />
          <br />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={loginData.email || ""}
            onChange={handleChange}
          />
          <br />
          <label>Password</label>
          <input
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
      </section>
    </>
  );
};

export default Register;
