import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  console.log(baseURL);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/auth/login`, {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);

      dispatch(setUser(response.data));

      navigate("/home");
    } catch (error) {
      console.error("An error occurred during login : ", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
