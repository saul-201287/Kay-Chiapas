import React, { useMemo, useState } from "react";
import axios from "axios";
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
  
];
const scores = [];

export default function Grafica() {
  const [fechas, setFechas] = useState([]);
  const [min, setMin] = useState("1232023-07-13");
  const [max, setMax] = useState("2023-07-15");
  const [cantidades, setCantidades] = useState([]);
  const [resultado, setResultado] = useState([]);

  const loadData = () => {
    axios.get(`http://localhost:3006/fechas/${min}&${max}`).then((result) => {
      setResultado(result.data);
      console.log(resultado);
      for (let i = 0; i < resultado.length; i++) {
        labels.push((resultado[i].FechaVenta.split("T", 1)));
        scores.push(Number(resultado[i].TotalVenta));
      }
      console.log(labels, scores);
    });
  };
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Ventas",
          data: scores,
          tension: 0.3,
          borderColor: "#1ABC9C",
          pointRadius: 8,
          backgroundColor: "#D0ECE7",
        },
      ],
      labels,
    };
  }, []);
  return (
    <>
  <button onClick={loadData}>dale</button>
      <Line options={options} data={data} />
    </>
  );
}
