import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store";
import axios from "axios";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSignup = async () => {
    try {
      const response = await axios.post("/signup", {
        email,
        username,
        password,
      });
      dispatch(setUser(response.data));
    } catch (error) {
      console.error("An error has occurred during signup : ", error);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
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
      <button onClick={handleSignup}>Sign up</button>
    </div>
  );
}
