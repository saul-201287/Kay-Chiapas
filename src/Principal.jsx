import React from 'react'
import IMG from "./img/usuario.png";
import Cards from "./Components/Cards";
import { Footer } from "./Components/Footer";
import Carrusel from "./Components/Carrusel";
function Principal() {
  return (
    <div className="App">
      <div style={{ width: "100%", height: "400px" }} id="cont1">
        <div className="inicio">
          <img
            src={IMG}
            style={{ width: "50px", height: "50px", margin: "2px" }}
            alt=""
          />
          <a href="/login">
            <input
              type="submit"
              value="Iniciar sesion"
              style={{
                cursor: "pointer",
                fontSize: "12pt",
                borderRadius: "10px",
                width: "110px",
                height: "50px",
              }}
            />
          </a>
        </div>
      </div>
      <div
        className="col-sm-6"
        id="cont2"
        style={{
          width: "100%",
          height: "400px",
        }}
      >
        <Cards />
      </div>
      <div
        className="col-sm-6"
        id="cont3"
        style={{ width: "100%", height: "490px" }}
      >
        <Carrusel />
      </div>
      <Footer />
    </div>
  );
}

export default Principal