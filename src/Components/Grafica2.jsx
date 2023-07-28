import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  responsive: true,
  fill: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Ventas Enero-Abril 2023",
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

export default function Grafica2() {
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Ventas",
          data: scores,
          tension: 0.3,
          borderColor: "#1ABC9C",
          pointRadius: 8,
          backgroundColor: "#F39C12",
        },
      ],
      labels,
    };
  }, []);
  return <Bar options={options} data={data} />;
}
