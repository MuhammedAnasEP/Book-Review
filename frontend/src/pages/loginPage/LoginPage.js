import React, { useState, useContext, useEffect } from "react";
import "./login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import axios from "../../axios/axios";
import AuthContext from "../../store/AuthContext";

function LoginPage() {

  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const location = useLocation();  
  const { setAccessToken, access_token, setCSRFToken } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValidate()) {
      setLoading(true);
      setMessage();

      axios
        .post("auth/login", JSON.stringify(formData))
        .then((res) => {
          setLoading(false);
          setAccessToken(res?.data?.access_token);
          setCSRFToken(res.headers["x-csrftoken"]);
          setFormData({
            username: "",
            password: "",
          });
          navigate('/', { replace: true });
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          if (err.code === "ERR_NETWORK") {
            setError("Network Error");
          } else if (err.response.status === 401) {
            setError(err.response.data.detail);
          }
        });
    }
  };

  const formValidate = () => {
    if (!formData.username.trim()) {
      setMessage("Username cannot be blank");
    } else if (!formData.password.trim()) {
      setMessage("Password cannot be blank");
    }

    if (message) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <div>
          <label>username:</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="******"
            onChange={handleChange}
          />
        </div>
        <p>
          New Customer? <Link to={"/register"}>Register</Link>
        </p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginPage;
