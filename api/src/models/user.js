import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  games_played: {
    type: Number,
    default: 0,
  },
  winner: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
