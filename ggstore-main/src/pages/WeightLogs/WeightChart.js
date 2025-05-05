import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function WeightChart({ userId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/weightlogs/${userId}`
      );
      // Format lại ngày để dễ đọc
      const formatted = res.data.map((item) => ({
        ...item,
        date: new Date(item.date).toLocaleDateString(),
      }));
      setData(formatted);
    };
    fetchLogs();
  }, [userId]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default WeightChart;
