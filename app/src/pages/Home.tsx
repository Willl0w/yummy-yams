import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, RootState } from "../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DiceOneFace from "../images/dice-one-face";
import DiceTwoFace from "../images/dice-two-face";
import DiceThreeFace from "../images/dice-three-face";
import DiceFourFace from "../images/dice-four-face";
import DiceFiveFace from "../images/dice-five-face";
import DiceSixFacesFour from "../images/dice-four-face";

export default function Home() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [userCanPlay, setUserCanPlay] = useState(false);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [dice, setDice] = useState([1, 1, 1, 1, 1]);

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
      const response = await axios.get(`http://localhost:3001/game/play`, {
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
      <div style={{ display: "flex" }}>
        {dice &&
          dice.map((value, index) => <DiceFaces key={index} value={value} />)}
      </div>
      {(!userCanPlay || user.winner.length > 0) && (
        <>
          <p>Your game is over</p>
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
          <p>remaining launch : {3 - user.game_played}</p>
          <button onClick={handlePlay}>Play</button>
        </>
      )}
    </div>
  );
}

const DiceFaces: React.FC<{ value: number }> = ({ value }) => {
  switch (value) {
    case 1:
      return <DiceOneFace />;
    case 2:
      return <DiceTwoFace />;
    case 3:
      return <DiceThreeFace />;
    case 4:
      return <DiceFourFace />;
    case 5:
      return <DiceFiveFace />;
    case 6:
      return <DiceSixFacesFour />;
    default:
      return null;
  }
};
