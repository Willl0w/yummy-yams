import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import Button from "src/components/Button";
import Input from "src/components/Input";
import LeftArrow from "../images/icons/left-arrow";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const handleSignup = async () => {
    try {
      await axios.post(`${baseURL}/auth/register`, {
        email,
        username,
        password,
      });
      // Rediriger vers la page de connexion après l'inscription réussie
      navigate("/");
    } catch (error: AxiosError | any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Si la réponse contient un message d'erreur, le stocker dans la state errorMessage
        setErrorMessage(error.response.data.message);
      } else {
        console.error("An error occurred during the creation : ", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center text-3xl pt-16 font-semibold">
        <h1>🍪 Yummy Yam's 🧁</h1>
        <div className="absolute flex right-12 space-x-5">
          <Button type="default" onClick={() => navigate("/home")}>
            <LeftArrow />
            Go back
          </Button>
        </div>
      </div>
      <div>
        <div className="absolute top-[30%] left-[41%] flex flex-col items-center justify-center ring ring-slate-300 w-fit p-10 gap-4 rounded-xl">
          <h2 className="text-3xl pb-5">Create an account</h2>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e)}
            placeholder="Email"
          />
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e)}
            placeholder="Username"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e)}
            placeholder="Password"
          />
          {errorMessage && <p>{errorMessage}</p>}{" "}
          <Button type="default" onClick={handleSignup}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
