import { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SalesForm from "../componets/../Vistas/SalesForm";
//import IconosV from "../componets/IconosV";
//import VentasPage from "../componets/PdfVentas";
import Usuario from "../img/usuario.png";

const Ventas = () => {
  const [selectedOption, setSelectedOption] = useState("agregar");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const renderSelectedComponent = () => {
    if (selectedOption === "agregar") {
      return (
        <div className="my-4 d-flex align-items-center">
          <SalesForm />
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
            <Nav.Link
              onClick={() => handleOptionSelect("consultar")}
              active={selectedOption === "consultar"}
            >
              Consultar Ventas
            </Nav.Link>
            <Nav.Link
              onClick={() => handleOptionSelect("reportes")}
              active={selectedOption === "reportes"}
            >
              Generar Reportes
            </Nav.Link>
            <Nav.Link
              onClick={() => handleOptionSelect("salir")}
              active={selectedOption === "salir"}
            >
              Cerrar Sesión
            </Nav.Link>
            <div className="user-icon ">
              <img src={Usuario} alt="Icono de usuario" />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="d-flex justify-content-center align-items-center">
        {renderSelectedComponent()}
      </div>
    </div>
  );
};

export default Ventas;
