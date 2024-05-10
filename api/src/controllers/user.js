import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, password, email } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    username,
    password: hashedPassword,
    email,
  });
  try {
    await user.save();
    const token = jwt.sign(
      { id: user._id, email },
      process.env.TOKEN || "TOKEN",
      { expiresIn: "2h" }
    );

    user.token = token;
    user.password = undefined;
    const userdatas = {
      id: user._id,
      email: user.email,
      username: user.username,
      token: token,
      game_played: user.game_played,
      winner: user.winner,
    };
    console.log(user);
    res.status(201).json(userdatas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.TOKEN || "TOKEN",
    { expiresIn: "2h" }
  );
  user.token = token;
  user.password = undefined;
  const userdatas = {
    id: user._id,
    email: user.email,
    username: user.username,
    token: token,
    game_played: user.game_played,
    winner: user.winner,
  };
  res.status(200).json(userdatas);
};
