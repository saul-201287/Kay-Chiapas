import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  
  const navegar = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([correo, password].includes("")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Faltan campos por llenar!",
      });
      return;
    }else{
    axios.get(`http://localhost:3006/usuarios/${correo}&${password}`)
      .then((result) => {
        setUsuarios(result.data[0]);
        console.log(usuarios);
        if (result.data.length !==0 ) {
        rutas();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Usuario o password incorrectos!",
          });
        }
      });
    }
  };

  const rutas = () => {

     if (usuarios.Puesto === "Ventas") {
       navegar("/ventas");
     } else if (usuarios.Puesto === "Administrador") {
       navegar("/administrador");
     } else if (usuarios.Puesto === "Inventario") {
       navegar("/inventario");
     } else if (usuarios.Puesto === "Compras") {
       navegar("/compras");
     }
  }
  return (
    <main className="login">
      <div className="container">
        <div className="col-4">
          <form onSubmit={handleSubmit} className="formulario">
            <label className="iniciar" htmlFor="correo">
              Iniciar sesión
            </label>
            <div className="form-group">
              <label htmlFor="correo">Usuario</label>
              <input
                type="text"
                id="correo"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input className="submit" type="submit" value="INICIAR SESIÓN" />
          </form>
        </div>
      </div>
    </main>
  );
}
export default Login;
