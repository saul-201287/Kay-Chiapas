import { useState, useEffect } from "react";
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
const SalesTable = () => {
  const [salesList, setSalesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get("http://localhost:3006/sales");
        setSalesList(response.data);
        console.log(salesList);
       if  (salesList.error) {
        console.log(salesList.error);
      }
    };
    fetchData();
  },[]);
const formatFecha = (fecha) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(fecha).toLocaleDateString(undefined, options);
};
  return (
    <div>
      <h3>Ventas</h3>
      <MDBTable align="middle">
        <MDBTableHead className="table table-striped table-borderedcolo">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Cantidad</th>
            <th className="p-3">Concepto</th>
            <th className="p-3">Fecha de Venta</th>
            <th className="p-3">Total de Venta</th>
            <th className="p-3">Vendedor</th>
            <th className="p-3">Precio Unitario</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {salesList.map((sale, index) => (
            <tr key={index}>
              <td>{sale.ID_Venta}</td>
              <td>{sale.Cantidad}</td>
              <td>{sale.Concepto}</td>
              <td>{formatFecha(sale.FechaVenta)}</td>
              <td>{sale.TotalVenta}</td>
              <td>{sale.Vendedor}</td>
              <td>{sale.PrecioUnitario}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default SalesTable;
