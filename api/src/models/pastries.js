import mongoose from "mongoose";

const pastrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  quantityWon: {
    type: Number,
    required: true,
  },
});

const Pastry = mongoose.model("Pastry", pastrySchema);

export default Pastry;
