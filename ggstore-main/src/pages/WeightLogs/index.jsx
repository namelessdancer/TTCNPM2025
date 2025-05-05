import React, { useState } from "react";
import WeightForm from "./WeightForm.js";
import WeightChart from "./WeightChart.js";

import Navbar from "../../components/Navbar";
import DefaultWrapper from "../../components/Wrappers/Default";
import Footer from "../../components/Footer";

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
          {!userId ? (
            <div className="p-6 text-red-500">Bạn cần đăng nhập.</div>
          ) : (
            <div className="p-6">
              <h1 className="mb-4 text-2xl font-bold">Theo dõi cân nặng</h1>
              <WeightForm userId={userId} onAdd={triggerRefresh} />
              <WeightChart key={refresh} userId={userId} />
            </div>
          )}
        </DefaultWrapper>
      </div>
      <Footer />
    </div>
  );
}

export default WeightLogs;
