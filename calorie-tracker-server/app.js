// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch((err) => console.log("❌ Kết nối thất bại:", err));

// Import routes
const foodItemRoutes = require("./routes/foodItems");
const authRoutes = require("./routes/auth");

// Sử dụng routes
app.use("/api/fooditems", foodItemRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/weightlogs", require("./routes/weightLogs"));

// Route kiểm tra
app.get("/", (req, res) => {
  res.send("API Dinh Dưỡng đang hoạt động!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy ở cổng ${PORT}`);
});
