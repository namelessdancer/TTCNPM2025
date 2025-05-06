import React, { useState } from "react";
import WeightForm from "./WeightForm.js";
import WeightChart from "./WeightChart.js";

import Navbar from "../../components/Navbar";
import DefaultWrapper from "../../components/Wrappers/Default";
import Footer from "../../components/Footer";

function IdealWeightTable() {
  const rows = [];
  for (let height = 100; height <= 205; height += 5) {
    const meters = height / 100;
    const minWeight = Math.round(18.5 * meters * meters);
    const maxWeight = Math.round(24.9 * meters * meters);
    rows.push({
      height,
      weightRange: `${minWeight} kg - ${maxWeight} kg`,
    });
  }

  const half = Math.ceil(rows.length / 2);
  const leftRows = rows.slice(0, half);
  const rightRows = rows.slice(half);

  const renderTable = (rowsSubset) => (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Chiều cao</th>
          <th className="border p-2">Cân nặng lý tưởng</th>
        </tr>
      </thead>
      <tbody>
        {rowsSubset.map((row) => (
          <tr key={row.height} className="border-b">
            <td className="p-2 text-center">{row.height} cm</td>
            <td className="p-2 text-center">{row.weightRange}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="mb-6">
      <h2 className="mb-4 text-xl font-semibold">
        Bảng cân nặng lý tưởng (BMI 18.5 - 24.9) - BMI (Body Mass Index – chỉ số
        khối cơ thể)
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>{renderTable(leftRows)}</div>
        <div>{renderTable(rightRows)}</div>
      </div>
    </div>
  );
}

function WeightLogs() {
  const user = JSON.parse(localStorage.getItem("user")); // đã login trước đó
  const userId = user?.user?._id;

  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-grow">
        <DefaultWrapper>
          <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">Theo dõi cân nặng</h1>

            <IdealWeightTable />

            {!userId ? (
              <div className="mt-4 text-red-500">
                Bạn cần đăng nhập để lưu thông tin cân nặng của mình.
              </div>
            ) : (
              <>
                <WeightForm userId={userId} onAdd={triggerRefresh} />
                <WeightChart key={refresh} userId={userId} />
              </>
            )}
          </div>
        </DefaultWrapper>
      </div>
      <Footer />
    </div>
  );
}

export default WeightLogs;
