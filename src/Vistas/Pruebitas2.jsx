import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import axios from "axios";
import { useEffect, useState } from "react";
import { startOfWeek, endOfWeek } from "date-fns";

const VentasSem = () => {
  const [salesList, setSalesList] = useState([]);

  useEffect(() => {
    const startOfWeekDate = startOfWeek(new Date());
    const endOfWeekDate = endOfWeek(new Date());
    axios
      .get("http://localhost:3006/sales3", {
        params: {
          startDate: startOfWeekDate,
          endDate: endOfWeekDate,
        },
      })
      .then((response) => {
        setSalesList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formatFecha = (fecha) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(fecha).toLocaleDateString(undefined, options);
  };

  return (
    <MDBTable align="middle">
      <MDBTableHead className="table table-striped table-borderedcolo">
        <tr>
          <th className="p-3">Folio</th>
          <th className="p-3">Cantidad</th>
          <th className="p-3">Concepto</th>
          <th className="p-3">Fecha</th>
          <th className="p-3">Vendedor</th>
          <th className="p-3">Precio Unitario</th>
          <th className="p-3">Acciones</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {salesList.map((sale, index) => (
          <tr key={index}>
            <td>{sale.ID_Venta}</td>
            <td>{sale.Cantidad}</td>
            <td>{sale.Concepto}</td>
            <td>{formatFecha(sale.FechaVenta)}</td>
            <td>{sale.Vendedor}</td>
            <td>{sale.PrecioUnitario}</td>
            <td className="text-center">
              <MDBBtn color="link" rounded size="sm">
                Editar
              </MDBBtn>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default VentasSem;
