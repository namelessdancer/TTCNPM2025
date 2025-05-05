import React, { useState } from "react";
import axios from "axios";

function WeightForm({ userId, onAdd }) {
  const [weight, setWeight] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Không tìm thấy người dùng. Vui lòng đăng nhập lại.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/weightlogs", {
        userId,
        weight: parseFloat(weight),
      });
      setWeight("");
      onAdd(); // Refresh biểu đồ
    } catch (error) {
      console.error("Lỗi khi gửi cân nặng:", error);
      alert("Đã xảy ra lỗi khi lưu dữ liệu. Vui lòng thử lại.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
    >
      <input
        type="number"
        step="0.1"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Nhập cân nặng (kg)"
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-64"
      />
      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-2 text-white shadow transition hover:bg-blue-700"
      >
        Lưu
      </button>
    </form>
  );
}

export default WeightForm;
