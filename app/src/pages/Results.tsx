import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store";
import { useNavigate } from "react-router-dom";

import LeftArrow from "../images/icons/left-arrow";

interface Winner {
  name: string;
  image: string;
  date: string;
}

interface User {
  id: string;
  email: string;
  username: string;
  nbr_games: number;
  winner: Winner[];
  role: string;
}

const Results: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not find");
          return;
        }
        const response = await axios.get<User[]>(`${baseURL}/admin/results`, {
          headers: {
            "auth-token": token,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("An error occurred during request results: ", error);
      }
    };

    fetchResults();
  }, [user, navigate, dispatch]);

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col content-center items-center text-center gap-20">
      <div className="flex items-center justify-center justify-items-center p-5">
        <h2 className=" font-extrabold text-2xl">Winners results</h2>
        <div className="absolute flex right-12 space-x-5">
          <button
            className="flex items-center gap-2 bg-slate-500 text-white px-4 py-3 rounded-xl font-medium text-lg hover:ring-2 hover:ring-slate-500 hover:bg-white hover:text-slate-500"
            onClick={() => navigate("/home")}
          >
            <LeftArrow />
            Go back
          </button>

          <button
            className="bg-red-500 text-white px-4 py-3 rounded-xl font-medium text-lg hover:ring-2 hover:ring-red-500 hover:bg-white hover:text-red-500"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <table className="border-collapse border border-slate-300 rounded-3xl	w-5/6 ">
        <thead className="p-4 rounded-xl">
          <tr className="divide-x divide-slate-300 bg-slate-200">
            <th className="p-4">User</th>
            <th>Pastries</th>
            <th>Winning date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-300">
          {users.map((user) => (
            <tr className="divide-x divide-slate-300" key={user.id}>
              <td className=" text-start pl-5  p-4">{user.username}</td>
              <td>
                <ul className="results-list">
                  {user.winner.map((winner, index) => (
                    <li key={index}>{winner.name}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul className="results-list">
                  {user.winner.map((winner, index) => (
                    <li key={index}>{winner.date}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
