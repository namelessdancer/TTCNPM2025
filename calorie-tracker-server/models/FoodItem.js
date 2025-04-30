// models/FoodItem.js
const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema(
  {
    name: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    sugar: Number,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FoodItem", foodItemSchema);
