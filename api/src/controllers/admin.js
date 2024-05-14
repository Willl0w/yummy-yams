import User from "../models/user.js";

export const getResults = async (req, res) => {
  const usersWithWinner = await User.find({ winner: { $ne: [] } });
  let results = [];
  for (const usr of usersWithWinner) {
    results.push({
      id: usr._id,
      email: usr.email,
      username: usr.username,
      game_played: usr.game_played,
      winner: usr.winner,
    });
  }
  res.status(200).json(results);
};
