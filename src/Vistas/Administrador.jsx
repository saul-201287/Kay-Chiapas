import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import SalesDepartmentView from "../componets/Nav";
//import InventoryNavbar from "../componets/Nav2";
import Documento from "./Documento";
import Login from "./Login";
import "../styles/Admi.css";
import Usuario from "../img/usuario.png";
import { useNavigate } from "react-router-dom";

const AdminView = () => {
  const login = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const cerrarSesion = () => {
    login("/login");
  };

  const renderSelectedComponent = () => {
    if (selectedOption === "ventas") {
      return (
        <div className="my-4">
          <Documento />
        </div>
      );
    } else if (selectedOption === "inventario") {
      return (
        <div className="my-4">
          <Documento />
        </div>
      );
    } else if (selectedOption === "inicio") {
      return (
        <div className="my-4">
          <Login />
          {/* Aquí puedes agregar el componente por defecto para la página de inicio */}
        </div>
      );
    } else if (selectedOption === "compras") {
      return (
        <div className="my-4">
          <Documento />
        </div>
      );
    } else if (selectedOption === "graficas") {
      return (
        <div className="my-4">
          <Documento />
        </div>
      );
    }
  };

  return (
    <div style={{ backgroundColor: "#f2f8ff", minHeight: "100vh" }}>
      <div className="sidebar">
        <div
          className="sidebar-item active"
          onClick={() => handleOptionSelect("inicio")}
        >
          <span className="letraSide">Inicio</span>
        </div>
        <div
          className="sidebar-item"
          onClick={() => handleOptionSelect("graficas")}
        >
          <span className="letraSide">Gráficas</span>
        </div>
        <div
          className="sidebar-item"
          onClick={() => handleOptionSelect("ventas")}
        >
          <span className="letraSide">Ventas</span>
        </div>
        <div
          className="sidebar-item"
          onClick={() => handleOptionSelect("compras")}
        >
          <span className="letraSide">Compras</span>
        </div>
        <div
          className="sidebar-item"
          onClick={() => handleOptionSelect("inventario")}
        >
          <span className="letraSide">Inventario</span>
        </div>
        <div className="sidebar-bottom">
          <div className="user-icon">
            <img src={Usuario} alt="Icono de usuario" />
          </div>
          <button className="logout-button" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="content">{renderSelectedComponent()}</div>
    </div>
  );
};

export default AdminView;
