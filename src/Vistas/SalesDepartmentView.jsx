import SalesForm from "./SalesForm";
import PDFventas from "../Components/PDFdia";
import PDFdia from "../Components/PDFdia";
import PDFmes from "../Components/PDFmes";
import { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Usuario from "../img/usuario.png";
import Pruebitas from "./Pruebitas";
import Pruebitas2 from "./Pruebitas2";
import TablaVenta from "./TablaVenta";
import {  MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import axios from "axios";

const SalesDepartmentView = () => {
  const [selectedOption, setSelectedOption] = useState("agregar");
  const [selectedConsultOption, setSelectedConsultOption] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [mes, setMes] = useState(0);
  const [salesList, setSalesList] = useState([]);

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    for (let i = 0; i < meses.length; i++) {
      if (month === meses[i]) {
        setMes(i + 1);
      }
    }
    console.log(month, mes);
  };


  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSelectedConsultOption("");
  };

  const handleConsultOptionSelect = (option) => {
    setSelectedOption("consultar");
    setSelectedConsultOption(option);
    setSelectedMonth("");
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3006/sales4", {
          params: {
            month: mes,
          },
        });
        setSalesList(response.data);
        console.log(salesList);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedConsultOption === "mes" && selectedMonth) {
      fetchData();
    }

  });

  const formatFecha = (fecha) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(fecha).toLocaleDateString(undefined, options);
  };

  const renderSelectComponente = () => {
    if (selectedOption === "agregar") {
      return (
        <div className="my-4 d-flex align-items-center">
          <SalesForm />
        </div>
      );
    } else if (selectedOption === "consultar") {
      if (selectedConsultOption === "dia") {
        return (
          <div className="my-4">
            <Pruebitas />
          </div>
        );
      } else if (selectedConsultOption === "semana") {
        return (
          <div className="my-4">
            <Pruebitas2 />
          </div>
        );
      } else if (selectedConsultOption === "mes" && selectedMonth) {
        return (
          <div className="my-4">
            <h3>Ventas del mes: {selectedMonth}</h3>
            {salesList.length > 0 ? (
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
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            ) : (
              <p>No se encontraron ventas para el mes seleccionado.</p>
            )}
          </div>
        );
      }
    } else if (selectedOption === "reportes") {
      return (
        <div className="my-4">
          <PDFventas />
        </div>
      );
    } else if (selectedOption === 'Por dia') {
      return (
        <div className="my-4">
          <PDFdia />
        </div>
      );
    }else if (selectedOption === 'Por mes') {
      return (
        <div className="my-4">
          <PDFmes />
        </div>
      );
    }else if (selectedOption === 'consultar todo') {
      return (
        <div className='my-4'>
          <TablaVenta/>
        </div>
      );
    }
  };

  return (
    <div style={{ backgroundColor: "#f2f8ff", minHeight: "100vh" }}>
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        className="justify-content-center"
      >
        <Navbar.Brand>Departamento de Ventas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              onClick={() => handleOptionSelect("agregar")}
              active={selectedOption === "agregar"}
            >
              Agregar Venta
            </Nav.Link>
            <NavDropdown
              title="Consultar Ventas"
              id="consultar-ventas-dropdown"
            >
              <NavDropdown.Item
                onClick={() => handleOptionSelect("consultar todo")}
                active={selectedOption === "consultar todo"}
              >
                Todas las Ventas
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => handleConsultOptionSelect("dia")}
                active={selectedConsultOption === "dia"}
              >
                Por Día
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => handleConsultOptionSelect("semana")}
                active={selectedConsultOption === "semana"}
              >
                Por Semana
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => handleConsultOptionSelect("mes")}
                active={selectedConsultOption === "mes"}
              >
                Por Mes
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Generar Reportes"
              id="generar-reportes-dropdown"
            >
              <NavDropdown.Item
                onClick={() => handleOptionSelect("reportes")}
                active={selectedOption === "reportes"}
              >
                Todas las Ventas
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => handleOptionSelect("Por dia")}
                active={selectedOption === "Por dia"}
              >
                Por Día
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => handleOptionSelect("Por mes")}
                active={selectedOption === "Por mes"}
              >
                Por Mes
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              onClick={() => handleOptionSelect("salir")}
              active={selectedOption === "salir"}
            >
              Cerrar Sesión
            </Nav.Link>
            <div className="user-icon">
              <img src={Usuario} alt="Icono de usuario" />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {selectedOption === "consultar" && selectedConsultOption === "mes" && (
        <div className="d-flex justify-content-center my-4">
          <NavDropdown title="Seleccionar Mes" id="seleccionar-mes-dropdown">
            <NavDropdown.Item onClick={() => handleMonthSelect("enero")}>
              Enero
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleMonthSelect("febrero")}>
              Febrero
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleMonthSelect("marzo")}>
              Marzo
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleMonthSelect("abril")}>
              Abril
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleMonthSelect("mayo")}>
              Mayo
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleMonthSelect("junio")}>
              Junio
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleMonthSelect("julio")}>
              Julio
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleMonthSelect("agosto")}>
              Agosto
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleMonthSelect("septiembre")}>
              Septiembre
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleMonthSelect("octubre")}>
              Octubre
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleMonthSelect("noviembre")}>
              Noviembre
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleMonthSelect("diciembre")}>
              Diciembre
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      )}

      <div className="d-flex justify-content-center align-items-center">
        {renderSelectComponente()}
      </div>
    </div>
  );
};
export default SalesDepartmentView;
