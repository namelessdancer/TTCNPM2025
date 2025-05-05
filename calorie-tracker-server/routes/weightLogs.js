const express = require("express");
const router = express.Router();
const WeightLog = require("../models/WeightLog");

// POST: Ghi cân nặng
router.post("/", async (req, res) => {
  const { userId, weight } = req.body;
  try {
    const newLog = new WeightLog({ userId, weight });
    await newLog.save();
    res.json(newLog);
  } catch (error) {
    res.status(500).json({ message: "Lỗi ghi cân nặng" });
  }
});

// GET: Lấy tất cả cân nặng theo userId
router.get("/:userId", async (req, res) => {
  try {
    const logs = await WeightLog.find({ userId: req.params.userId }).sort(
      "date"
    );
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy lịch sử cân nặng" });
  }
});

module.exports = router;
