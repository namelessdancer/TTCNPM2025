// routes/foodItems.js
const express = require("express");
const router = express.Router();
const FoodItem = require("../models/FoodItem");

// [GET] /api/fooditems - lấy danh sách các món ăn
router.get("/", async (req, res) => {
  try {
    const items = await FoodItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server khi lấy danh sách món ăn" });
  }
});

/**
 * POST /api/selected-foods
 * Tính tổng giá trị dinh dưỡng theo danh sách món người dùng chọn
 * Dữ liệu gửi lên: [{ foodId: "...", quantity: 2 }, ...]
 */
// router.post('/selected-foods', async (req, res) => {
//     try {
//       const selections = req.body;

//       const ids = selections.map(item => item.foodId);
//       const foodItems = await FoodItem.find({ _id: { $in: ids } });

//       let total = {
//         calories: 0,
//         protein: 0,
//         carbs: 0,
//         fat: 0,
//         sugar: 0
//       };

//       selections.forEach(sel => {
//         const food = foodItems.find(f => f._id.toString() === sel.foodId);
//         if (food) {
//           total.calories += food.calories * sel.quantity;
//           total.protein += food.protein * sel.quantity;
//           total.carbs += food.carbs * sel.quantity;
//           total.fat += food.fat * sel.quantity;
//           total.sugar += food.sugar * sel.quantity;
//         }
//       });

//       res.json(total);
//     } catch (err) {
//       res.status(500).json({ message: 'Lỗi khi tính tổng dinh dưỡng.' });
//     }
//   });

module.exports = router;
