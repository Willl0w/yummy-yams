import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, RootState, clearUser } from "../store";
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

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    navigate("/");
  };

  useEffect(() => {
    if (user.game_played < 3 && user.winner.length === 0) {
      setUserCanPlay(true);
    } else {
      setUserCanPlay(false);
    }
  }, [user]);

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
      const response = await axios.get(`${baseURL}/yams/play`, {
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
    <div className="flex flex-col text-center gap-20">
      <div className="flex items-center justify-center justify-items-center p-5">
        <p className=" font-extrabold text-2xl">
          Welcome to Yummy Yam's, {user.username} 👋
        </p>
        <div className="absolute right-12 space-x-5">
          <button
            className="bg-slate-500 text-white px-4 py-3 rounded-xl font-medium text-lg hover:ring-2 hover:ring-slate-500 hover:bg-white hover:text-slate-500"
            onClick={() => navigate("/results")}
          >
            Results
          </button>

          <button
            className="bg-red-500 text-white px-4 py-3 rounded-xl font-medium text-lg hover:ring-2 hover:ring-red-500 hover:bg-white hover:text-red-500"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex gap-3 w-1/3 items-center justify-items-center justify-center m-auto">
        {dice &&
          dice.map((value, index) => (
            <DiceFaces
              key={index}
              value={value}
              style={{ borderRadius: "15px" }}
            />
          ))}
      </div>
      {(!userCanPlay || user.winner.length > 0) && (
        <>
          <p className="text-3xl">Your game is over !</p>
          <p className="text-xl">
            {user.winner.length > 0
              ? `Congrats! 🎉 You've won ${user.winner.length} pastries !🍰`
              : "Sorry, you've lost 😣. Maybe next time ! 😄"}
          </p>
          <div className="flex justify-center justify-items-center">
            {user.winner.length > 0 &&
              user.winner.map((pastry: any, index) => (
                <img
                  key={index}
                  src={`${baseURL}/images/${pastry.image}`}
                  alt={pastry.name}
                  className=" w-72"
                />
              ))}
          </div>
        </>
      )}
      {!userCanPlay ? "" : <p className="text-xl">{message}</p>}
      {userCanPlay && user.winner.length === 0 && (
        <div className="block space-y-5">
          <p>remaining launch : {3 - user.game_played}</p>
          <button
            className="bg-slate-500 text-white px-12 py-5 rounded-xl font-medium text-3xl hover:ring-2 hover:ring-slate-500 hover:bg-white hover:text-slate-500 "
            onClick={handlePlay}
          >
            Play 🎲
          </button>
        </div>
      )}
    </div>
  );
}
type DiceFacesProps = {
  value: number;
  style?: React.CSSProperties;
};

const DiceFaces: React.FC<DiceFacesProps> = ({ value, style }) => {
  switch (value) {
    case 1:
      return <DiceOneFace style={style} />;
    case 2:
      return <DiceTwoFace style={style} />;
    case 3:
      return <DiceThreeFace style={style} />;
    case 4:
      return <DiceFourFace style={style} />;
    case 5:
      return <DiceFiveFace style={style} />;
    case 6:
      return <DiceSixFacesFour style={style} />;
    default:
      return null;
  }
};
