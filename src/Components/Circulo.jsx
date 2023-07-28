import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, Filler } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title, Filler);

 const data = {
   labels: ["Ventas", "Compras"],
   datasets: [
     {
       label: "Ventas",
       data: [5231, 4192],
       backgroundColor: ["rgba(93, 109, 126)", "rgba(93, 173, 226)"],
       borderColor: ["rgba(93, 109, 126)", "rgba(93, 173, 226)"],
       borderWidth: 1,
     },
   ],
   title: {
     display: true,
     text: "Ventas Enero-Abril 2023",
   },
   resposive: true,
   fill: true,
 };

export default function Circulo() {
  return <Pie data={data} />;
}
