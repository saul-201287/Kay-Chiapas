import React from "react";
import { Card } from "react-bootstrap";
import img1 from "../img/img8.jpg";
import img2 from "../img/img2.jpg";
import img3 from "../img/img3.jpg";
import "../styles/index.css";
export default function Cards() {
  return (
    <>
      <Card
        key={"Primary"}
        className="mb-2"
        id="card"
        style={{
          width: "20rem",
          height: "29rem",
          display: "inline-block",
          margin: "8px",
          top: "-40px",
          responsive: true,
        }}
      >
        <Card.Header
          style={{ textAlign: "center", backgroundColor: "#747D77" }}
        >
          <img src={img2} alt="" style={{ height: "250px", width: "290px" }} />
        </Card.Header>
        <Card.Body
          style={{
            textAlign: "justyfi",
            backgroundColor: "white",
            height: "150px",
          }}
        >
          <h4>Productos</h4>
          <p>"La calidad de nuestros productos nos representa como empresa".</p>
        </Card.Body>
      </Card>
      <Card
        key={"Secondary"}
        className="mb-2"
        id="card"
        style={{
          width: "20rem",
          height: "29rem",
          display: "inline-block",
          margin: "8px",
          marginLeft: "150px",
          top: "-2px",
        }}
      >
        <Card.Header
          style={{ textAlign: "center", backgroundColor: "#747D77" }}
        >
          <img src={img3} alt="" style={{ height: "250px", width: "290px" }} />
        </Card.Header>
        <Card.Body
          style={{
            textAlign: "justyfi",
            backgroundColor: "white",
            height: "150px",
          }}
        >
          <h4>Trabajadores</h4>
          <p>
            "Nuestro ambiente de trabajo es el mas saludable y se representa en
            la calidad de nuestros productos".{" "}
          </p>
        </Card.Body>
      </Card>
      <Card
        className="mb-2"
        id="card"
        style={{
          top: "-8px",
          width: "20rem",
          height: "29rem",
          display: "inline-block",
          margin: "8px",
          marginLeft: "150px",
        }}
      >
        <Card.Header
          style={{
            textAlign: "center",
            backgroundColor: "#747D77",
            padding: "5px",
          }}
        >
          <img src={img1} alt="" style={{ height: "250px", width: "290px" }} />
        </Card.Header>
        <Card.Body
          style={{
            textAlign: "justyfi",
            backgroundColor: "white",
            height: "150px",
          }}
        >
          <h4>Compromiso</h4>
          <p>
            "Estamos comprometidos con el medio ambiente por eso, nuestra
            producción es sustentable".
          </p>
        </Card.Body>
      </Card>
    </>
  );
}
