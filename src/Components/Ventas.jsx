import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  responsive: true,
 
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Compras Enero-Abril 2023",
    },
  },
};

const labels = [
  "15/Enero",
  "30/Enero",
  "15/Febrero",
  "28/Febrero",
  "15/Marzo",
  "30/Marzo",
  "15/Abril",
];
const scores = [123, 2231, 431, 3331, 1044, 2323, 2321];
const scores2 = [2122, 2531, 1431, 531, 3054, 1423, 321];

export default function Ventas() {
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Ventas",
          data: scores,
          tension: 0.3,
          borderColor: "#1ABC9C",
          pointRadius: 8,
        
        },
        {
          label: "Compras",
          data: scores2,
          tension: 0.3,
          borderColor: "#C62828",
          pointRadius: 8,
        },
      ],
      labels,
    };
  }, []);
  return <Line options={options} data={data} />;
}
