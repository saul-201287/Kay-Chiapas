import { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Usuario from "../img/usuario.png";
import AgregarProducto from "./AgregarProducto";
import BusquedaEspecifica from "./BusquedaEspecifica";
import MostrarAll from "./MostrarAll";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const InventoryNavbar = () => {
  const [selectedOption, setSelectedOption] = useState("nuevo");
  const navegar = useNavigate();
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const renderSelectedComponent = () => {
    if (selectedOption === "nuevo") {
      return <div className="my-4"><AgregarProducto /></div>;
    } else if (selectedOption === "especifica") {
      return (
        <div className="my-8" style={{width:'100%'}}><BusquedaEspecifica/></div>
      );
    } else if (selectedOption === "todo") {
      return (
        <div className="my-4"><MostrarAll/></div>
      );
    } else if (selectedOption === "salir") {
      navegar("/login");
    }
  };

  return (
    <div>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        style={{ color: "white", padding: "10px" }}
      >
        <Navbar.Brand>Departamento de Inventario</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{ justifyContent: "space-evenly" }}
        >
         
            <Nav.Link
              href=""
              onClick={() => handleOptionSelect("nuevo")}
              active={selectedOption === "nuevo"}
            >
              Agregar Productos Nuevos 
            </Nav.Link>
            
          <NavDropdown
            title="Consultar Inventario"
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item
              href=""
              onClick={() => handleOptionSelect("especifica")}
              active={selectedOption === "especifica"}
            >
              Especifica
            </NavDropdown.Item>
            <NavDropdown.Divider style={{ border: "solid 1px black" }} />
            <NavDropdown.Item
              href=""
              onClick={() => handleOptionSelect("todo")}
              active={selectedOption === "todo"}
            >
              Todo
            </NavDropdown.Item>
            <NavDropdown.Divider style={{ border: "solid 0.5px black" }} />
          </NavDropdown>
          <Nav.Link
            style={{ margin: "10px" }}
            onClick={() => handleOptionSelect("salir")}
            active={selectedOption === "salir"}
          >
            <div
              className="user-icon"
              style={{ justifyContent: "center", display: "inline-table" }}
            >
              <img src={Usuario} alt="Icono de usuario" />
            </div>
            Cerrar Sesión
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
      <div className="d-flex justify-content-center align-items-center">
        {renderSelectedComponent()}
      </div>
    </div>
  );
};

export default InventoryNavbar;
