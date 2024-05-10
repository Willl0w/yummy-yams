import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, RootState } from "../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DiceSixFacesOne from "../images/dice-six-faces-one";
import DiceSixFacesTwo from "../images/dice-six-faces-two";
import DiceSixFacesThree from "../images/dice-six-faces-three";
import DiceSixFacesFour from "../images/dice-six-faces-four";
import DiceSixFacesFive from "../images/dice-six-faces-five";
import DiceSixFacesSix from "../images/dice-six-faces-six";

export default function Home() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [userCanPlay, setUserCanPlay] = useState(false);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [dice, setDice] = useState([1, 1, 1, 1, 1]);
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      if (user.game_played < 3 && user.winner.length === 0)
        setUserCanPlay(true);
    } else {
      navigate("/");
    }
    if (!user.username) navigate("/");
  }, [dispatch, navigate]);

  const handlePlay = async () => {
    try {
      const response = await axios.get(`${baseURL}/game/play`, {
        headers: {
          "auth-token": token,
        },
      });
      dispatch(setUser(response.data.user));
      setMessage(response.data.message);
      setDice(response.data.dice_table);
    } catch (error) {
      console.error("An error occurred while fetching game details :", error);
    }
  };

  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>Home</h2>
      <p>{message ? message : `Welcome to Yummi Yam's, ${user.username} !`}</p>
      <p>tentatives restantes : {3 - user.game_played}</p>
      <div style={{ display: "flex" }}>
        {dice &&
          dice.map((value, index) => <DiceImage key={index} value={value} />)}
      </div>
      {(!userCanPlay || user.winner.length > 0) && (
        <>
          <p>Votre partie est terminée</p>
          <p>
            {user.winner.length > 0
              ? `Congrats! You've won ${user.winner.length} pastries`
              : "Sorry, you've lost. Maybe next time !"}
          </p>
          {user.winner.length > 0 &&
            user.winner.map((pastry: any, index) => (
              <img
                key={index}
                src={`http://localhost:3001/images/${pastry.image}`}
                alt={pastry.name}
              />
            ))}
        </>
      )}
      {userCanPlay && user.winner.length === 0 && (
        <>
          <p>tentatives restantes : {3 - user.game_played}</p>
          <button onClick={handlePlay}>Jouer</button>
        </>
      )}

      <button onClick={handlePlay}>Play !</button>
    </div>
  );
}

const DiceImage: React.FC<{ value: number }> = ({ value }) => {
  switch (value) {
    case 1:
      return <DiceSixFacesOne />;
    case 2:
      return <DiceSixFacesTwo />;
    case 3:
      return <DiceSixFacesThree />;
    case 4:
      return <DiceSixFacesFour />;
    case 5:
      return <DiceSixFacesFive />;
    case 6:
      return <DiceSixFacesSix />;
    default:
      return null;
  }
};
