// Full updated component with BMR/TDEE calculation, calorie comparison, and suggestions
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import DefaultWrapper from "../../components/Wrappers/Default";
import Footer from "../../components/Footer";
import { ApiBaseUrl } from "../../global/global-variables";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFoods, setSelectedFoods] = useState({});
  const [nutritionResult, setNutritionResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tdee, setTdee] = useState(null);
  const [bmr, setBmr] = useState(null);
  const [bmrForm, setBmrForm] = useState({
    gender: "male",
    weight: "",
    height: "",
    age: "",
    activity: 1.2,
  });
  const itemsPerPage = 10;

  const chartData = [
    { name: "Protein", value: nutritionResult?.protein || 0 },
    { name: "Carbs", value: nutritionResult?.carbs || 0 },
    { name: "Fat", value: nutritionResult?.fat || 0 },
    { name: "Sugar", value: nutritionResult?.sugar || 0 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

  useEffect(() => {
    const fetchFoods = () => {
      fetch(ApiBaseUrl)
        .then((res) => res.json())
        .then((data) => {
          setFoods(data);
          localStorage.setItem("foods", JSON.stringify(data));
        })
        .catch((err) => console.error("Lỗi fetch:", err));
    };

    fetchFoods(); // Lần đầu
    const interval = setInterval(fetchFoods, 5 * 60 * 1000); // Cứ 5 phút gọi lại

    return () => clearInterval(interval); // Dọn dẹp khi component unmount
  }, []);

  const filteredFoods = foods.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  const currentItems = filteredFoods.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleQuantityChange = (foodId, quantity) => {
    setSelectedFoods((prev) => ({
      ...prev,
      [foodId]: quantity > 0 ? quantity : 0,
    }));
  };

  const handleSubmit = () => {
    const payload = Object.entries(selectedFoods)
      .map(([foodId, quantity]) => ({
        foodId,
        quantity,
      }))
      .filter((item) => item.quantity > 0);

    if (payload.length === 0) return alert("Vui lòng chọn ít nhất 1 món!");

    let total = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      sugar: 0,
    };

    payload.forEach((item) => {
      const food = foods.find((f) => f._id === item.foodId);
      if (food) {
        total.calories += food.calories * item.quantity;
        total.protein += food.protein * item.quantity;
        total.carbs += food.carbs * item.quantity;
        total.fat += food.fat * item.quantity;
        total.sugar += food.sugar * item.quantity;
      }
    });

    const roundedResult = {
      calories: parseFloat(total.calories.toFixed(2)),
      protein: parseFloat(total.protein.toFixed(2)),
      carbs: parseFloat(total.carbs.toFixed(2)),
      fat: parseFloat(total.fat.toFixed(2)),
      sugar: parseFloat(total.sugar.toFixed(2)),
    };

    setNutritionResult(roundedResult);
  };

  const handleReset = () => {
    setSelectedFoods({});
    setNutritionResult(null);
  };

  const handleBMRSubmit = () => {
    const { gender, weight, height, age, activity } = bmrForm;
    if (!weight || !height || !age)
      return alert("Vui lòng nhập đầy đủ thông tin cá nhân!");

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    let bmr =
      gender === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    setBmr(Math.round(bmr)); //Lưu BMR
    const finalTdee = Math.round(bmr * parseFloat(activity));
    setTdee(finalTdee);
  };

  return (
    <>
      <Navbar />
      <DefaultWrapper>
        <div className="min-h-screen bg-white p-6 md:p-10">
          <h1 className="mb-6 text-3xl font-bold text-blue-600">
            Food Database
          </h1>

          {/* BMR & TDEE Input */}
          <div className="mb-6 rounded border p-4 shadow">
            <h2 className="mb-2 text-xl font-semibold text-blue-600">
              Tính BMR (Basal Metabolic Rate) và TDEE (Total Daily Energy
              Expenditure)
            </h2>
            <div className="grid gap-2 md:grid-cols-3">
              <input
                type="number"
                placeholder="Cân nặng (kg)"
                value={bmrForm.weight}
                onChange={(e) =>
                  setBmrForm({ ...bmrForm, weight: e.target.value })
                }
                className="rounded border px-2 py-1"
              />
              <input
                type="number"
                placeholder="Chiều cao (cm)"
                value={bmrForm.height}
                onChange={(e) =>
                  setBmrForm({ ...bmrForm, height: e.target.value })
                }
                className="rounded border px-2 py-1"
              />
              <input
                type="number"
                placeholder="Tuổi"
                value={bmrForm.age}
                onChange={(e) =>
                  setBmrForm({ ...bmrForm, age: e.target.value })
                }
                className="rounded border px-2 py-1"
              />
              <select
                value={bmrForm.gender}
                onChange={(e) =>
                  setBmrForm({ ...bmrForm, gender: e.target.value })
                }
                className="rounded border px-2 py-1"
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
              <select
                value={bmrForm.activity}
                onChange={(e) =>
                  setBmrForm({ ...bmrForm, activity: e.target.value })
                }
                className="rounded border px-2 py-1"
              >
                <option value={1.2}>Ít vận động</option>
                <option value={1.375}>Tập nhẹ</option>
                <option value={1.55}>Tập vừa</option>
                <option value={1.725}>Tập nặng</option>
                <option value={1.9}>Tập rất nặng</option>
              </select>
              <button
                onClick={handleBMRSubmit}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Tính TDEE
              </button>
            </div>
            {bmr && (
              <p className="mt-3 text-sm text-blue-600">
                BMR của bạn là khoảng <strong>{bmr} kcal</strong>/ngày
              </p>
            )}
            {tdee && (
              <p className="mt-2 text-sm text-green-600">
                TDEE của bạn là khoảng <strong>{tdee} kcal</strong>/ngày
              </p>
            )}
          </div>

          {/* Search and Table */}
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center">
            <label className="font-medium">Keywords:</label>
            <input
              type="text"
              className="w-full max-w-md rounded border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Search for Food Item"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300 text-sm md:text-base">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="border p-2">Food</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Serving Size</th>
                  <th className="border p-2">Calories</th>
                  <th className="border p-2">Fat</th>
                  <th className="border p-2">Protein</th>
                  <th className="border p-2">Carbs</th>
                  <th className="border p-2">Sugar</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((food) => (
                  <tr key={food._id} className="hover:bg-gray-50">
                    <td className="border px-2 py-1">{food.name}</td>
                    <td className="border px-2 py-1">
                      <input
                        type="number"
                        min={0}
                        value={selectedFoods[food._id] || 0}
                        onChange={(e) =>
                          handleQuantityChange(
                            food._id,
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-12 rounded border px-1"
                      />
                    </td>
                    <td className="border px-2 py-1">100 gr</td>
                    <td className="border px-2 py-1">{food.calories}</td>
                    <td className="border px-2 py-1">{food.fat}</td>
                    <td className="border px-2 py-1">{food.protein}</td>
                    <td className="border px-2 py-1">{food.carbs}</td>
                    <td className="border px-2 py-1">{food.sugar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`rounded border px-3 py-1 ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Submit Buttons */}
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700"
            >
              Tính tổng dinh dưỡng
            </button>
            <button
              onClick={handleReset}
              className="ml-2 rounded bg-red-300 px-6 py-2 text-black hover:bg-red-400"
            >
              Làm mới lựa chọn
            </button>
          </div>

          {/* Nutrition Result */}
          {nutritionResult && (
            <div className="mt-6 rounded border bg-gray-50 p-4 shadow">
              <h2 className="mb-2 text-lg font-semibold text-blue-600">
                Tổng dinh dưỡng:
              </h2>
              <p className="mb-2 text-sm font-medium">Món đã chọn:</p>
              <ul className="mb-4 list-disc pl-6 text-sm text-gray-700">
                {Object.entries(selectedFoods).map(([id, qty]) => {
                  const food = foods.find((f) => f._id === id);
                  return (
                    <li key={id}>
                      {food?.name} x {qty} (tổng {qty * 100}g)
                    </li>
                  );
                })}
              </ul>
              <ul className="list-disc pl-6 text-sm">
                <li>Calories: {nutritionResult.calories}</li>
                <li>Protein: {nutritionResult.protein}</li>
                <li>Carbs: {nutritionResult.carbs}</li>
                <li>Fat: {nutritionResult.fat}</li>
                <li>Sugar: {nutritionResult.sugar}</li>
              </ul>
            </div>
          )}

          {/* Pie Chart */}
          <div className="mt-6">
            <h3 className="mb-2 text-base font-medium">
              Biểu đồ tỉ lệ dinh dưỡng:
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* TDEE Comparison Suggestion */}
          {tdee !== null && nutritionResult && (
            <div className="mt-6 rounded border bg-white p-4 shadow">
              <h3 className="mb-2 text-base font-medium text-blue-600">
                Gợi ý từ TDEE:
              </h3>
              {nutritionResult.calories < tdee ? (
                <p className="text-green-600">
                  Bạn đang{" "}
                  <strong>
                    thiếu khoảng {Math.round(tdee - nutritionResult.calories)}{" "}
                    kcal
                  </strong>{" "}
                  so với TDEE. Hãy bổ sung thêm để đủ năng lượng cho cơ thể!
                </p>
              ) : nutritionResult.calories > tdee ? (
                <p className="text-red-600">
                  Bạn đang{" "}
                  <strong>
                    dư khoảng {Math.round(nutritionResult.calories - tdee)} kcal
                  </strong>{" "}
                  so với TDEE. Hãy điều chỉnh lại chế độ ăn nếu bạn đang muốn
                  kiểm soát cân nặng.
                </p>
              ) : (
                <p className="text-blue-600">
                  Bạn đã ăn vừa đủ lượng calo theo TDEE hôm nay 🎉
                </p>
              )}
            </div>
          )}
        </div>
      </DefaultWrapper>
      <Footer />
    </>
  );
}

export default FoodList;
