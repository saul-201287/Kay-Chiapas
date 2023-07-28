import React, { useState } from "react";
import axios from "axios";
import '../styles/carga.css';
function Carga() {
  const [ventas, setVentas] = useState([]);
  function llenar() {
    axios.get("http://localhost:3006/sales").then((resulta) => {
      setVentas(resulta.data);
      for (let i = 0; i < ventas.length; i++) {
        console.log(
          ventas[i].ID_Venta +
            " " +
            ventas[i].Cantidad +
            " " +
            ventas[i].Concepto +
            " " +
            ventas[i].FechaVenta +
            "" +
            ventas[i].TotalVenta +
            " " +
            ventas[i].Vendedor +
            " " +
            ventas[i].PrecioUnitario
        );
      }
    });
  }
  return (
    <>
      <table>
        <thead className="table table-striped table-borderedcolo">
          <tr>
            <th className="p-3">Folio</th>
            <th className="p-3">Cantidad</th>
            <th className="p-3">Concepto</th>
            <th className="p-3">Fecha</th>
            <th className="p-3">Precio total</th>
            <th className="p-3">Vendedor</th>
            <th className="p-3">Precio Unitario</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((sale, index) => (
            <tr key={index}>
              <td>{sale.ID_Venta}</td>
              <td>{sale.Cantidad}</td>
              <td>{sale.Concepto}</td>
              <td>{sale.FechaVenta.split("T", 1)}</td>
              <td>${(sale.Cantidad * sale.PrecioUnitario)}</td>
              <td>{sale.Vendedor}</td>
              <td>${sale.PrecioUnitario}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={llenar}>ac</button>
    </>
  );
}
export default Carga;
