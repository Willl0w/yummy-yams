import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import Button from "src/components/Button";
import Input from "src/components/Input";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);

      dispatch(setUser(response.data));

      navigate("/home");
    } catch (error: AxiosError | any) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        console.error("An error occurred during sign in : ", error);
      }
    }
  };

  const handleAuth = () => {
    navigate("/auth");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center text-3xl pt-16 font-semibold">
        <h1>🍪 Yummy Yam's 🧁</h1>
      </div>
      <div className="absolute top-[30%] left-[41%] flex flex-col items-center justify-center ring ring-slate-300 w-fit p-10 gap-4 rounded-xl">
        <h2 className="text-3xl ">Login</h2>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e)}
          placeholder="Username"
          label="Username"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e)}
          placeholder="Password"
          label="Password"
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}{" "}
        <Button type="default" onClick={handleLogin}>
          Login
        </Button>
        <h3 className="text-xl">Don't have an account ?</h3>
        <Button type="destructive" onClick={handleAuth}>
          Create account
        </Button>
      </div>
    </div>
  );
}
