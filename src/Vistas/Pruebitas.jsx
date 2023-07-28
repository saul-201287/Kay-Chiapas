import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import axios from "axios";
import { useEffect, useState } from "react";

const VentasDias = () => {
  const [salesList, setSalesList] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get("http://localhost:3006/sales2");
        const sales = response.data.filter((sale) => {
          const saleDate = new Date(sale.FechaVenta);
          const currentDate = new Date();
          return (
            saleDate.getDate() === currentDate.getDate() &&
            saleDate.getMonth() === currentDate.getMonth() &&
            saleDate.getFullYear() === currentDate.getFullYear()
          );
        });
        setSalesList(sales);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSales();
  }, []);

  const formatFecha = (fecha) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(fecha).toLocaleDateString(undefined, options);
  };

  return (
    <>
      {salesList.length === 0 ? (
        <p>No se encontraron ventas para el día de hoy.</p>
      ) : (
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
      )}
    </>
  );
};

export default VentasDias;
