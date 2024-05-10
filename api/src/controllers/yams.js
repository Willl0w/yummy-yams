import User from "../models/user.js";
import Pastry from "../models/pastries.js";

// Function to check how much pastries the user has won
const fourOfAKind = (dices) => {
  const sameDice = dices.filter((value) => value === dices[0]);
  if (sameDice.length === 4) {
    return true;
  }
  return false;
};

const twoPairs = (dices) => {
  const occurs = {};
  for (let dice of dices) {
    occurs[dice] = (occurs[dice] || 0) + 1;
  }
  let pairs = 0;
  for (let dice in occurs) {
    if (occurs[dice] === 2) {
      pairs++;
    }
  }
  return pairs >= 2;
};

// Function to give pastries to the user
const givePastries = async (user, quantity, type) => {
  const pastries = await Pastry.aggregate([
    { $match: { stock: { $gt: 0 } } },
    { $pastry: { size: quantity } },
  ]);
  const winnerData = [];
  for (let pastry of pastries) {
    let data = {
      name: pastry.name,
      image: pastry.image,
      date: new Date().toLocaleDateString(),
    };
    winnerData.push(data);
    await Pastry.findOneAndUpdate(
      { _id: pastry._id },
      { $inc: { stock: -1, quantityWon: 1 } }
    );
  }
  user.winner = winnerData;
  await user.save();
  const data = {
    id: user._id,
    email: user.email,
    username: user.username,
    games_played: user.games_played,
    winner: user.winner,
    type: type,
  };
  return data;
};

export const playGame = async (req, res) => {
  let user = await User.findOne({ email: req.user.email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.games_played >= 3) {
    return res.status(400).json({
      message: "You have already played 3 games",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        games_played: user.games_played,
        winner: user.winner,
      },
      dice_table: [],
    });
  }
  if (user && user.winner.length > 0) {
    return res.status(200).json({
      message: "User already won",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        games_played: user.games_played,
        winner: user.winner,
      },
      dice_table: [],
    });
  }

  user.games_played += 1;

  //Roll the dices
  let dice_table = [];
  for (let i = 0; i < 5; i++) {
    dice_table.push(Math.floor(Math.random() * 6) + 1);
  }

  //Check if the 5 dices are the same
  if (dice_table.every((value) => value === dice_table[0])) {
    const userData = await givePastries(user, 3, "YAM_S");
    if (userData) {
      return res.status(200).json({
        message: "It's a YAM'S ! You won 3 pastries",
        user: userData,
        dice_table,
      });
    }
  }

  //Check if 4 of the 5 dice are the same
  if (fourOfAKind(dice_table)) {
    const userData = await givePastries(user, 2, "FOUR_OF_A_KIND");
    if (userData) {
      return res.status(200).json({
        message: "Four of a kind ! You won 2 pastries",
        user: userData,
        dice_table,
      });
    }
  }

  //Check if there are two pairs
  if (twoPairs(dice_table)) {
    const userData = await givePastries(user, 1, "DOUBLE_PAIR");
    if (userData) {
      return res.status(200).json({
        message: "Two pairs ! You won 1 pastry",
        user: userData,
        dice_table,
      });
    }
  }
  await user.save();
  return res.status(200).json({
    message: "No winning combination, try again!",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      games_played: user.games_played,
      winner: user.winner,
    },
    dice_table: dice_table,
  });
};
