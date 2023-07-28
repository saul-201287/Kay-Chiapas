import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Documento from "./Documento";
import Documento2 from "./Documento2";

import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import Grafica from "../Components/Grafica";
import Grafica2 from "../Components/Grafica2";
import Compras from "../Components/Compras";
import Ventas from "../Components/Ventas";
import Circulo from "../Components/Circulo";
import "../styles/index.css";

export default function Fill() {
  const navegacion = useNavigate();
  
  function handleSubmit() {
    //loadData();
    navegacion("/documento");
  }
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Archivo de usuarios</h1>
      <Table style={{ width: "70%", border: "1px solid black" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>{"Documento"}</th>
            <th style={{ border: "1px solid black" }}>
              {"Archivo Horizontal"}
            </th>
            <th style={{ border: "1px solid black" }}>{"Archivo Vertical"}</th>
            <th style={{ border: "1px solid black" }}>{"Vista Previa"}</th>
          </tr>
        </thead>

        <tbody style={{ textAlign: "center" }}>
          <tr>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
                padding: "20px",
              }}
            >
              {"Usuarios"}
            </td>
            <td
              style={{ border: "1px solid black", backgroundColor: "#2E86C1" }}
            >
              <PDFDownloadLink
                document={<Documento2 />}
                fileName="Usuarios.pdf"
              >
                <button
                  style={{
                    width: "100%",
                    height: "50px",
                    border: "none",
                    backgroundColor: "#2E86C1",
                    justifyContent: "center",
                  }}
                >
                  Descargar
                </button>
              </PDFDownloadLink>
            </td>
            <td
              style={{ border: "1px solid black", backgroundColor: "#2E86C1" }}
            >
              <PDFDownloadLink document={<Documento />} fileName="Usuarios.pdf">
                <button
                  style={{
                    width: "100%",
                    height: "50px",
                    border: "none",
                    backgroundColor: "#2E86C1",
                    justifyContent: "center",
                  }}
                >
                  Descargar
                </button>
              </PDFDownloadLink>
            </td>
            <td style={{ border: "1px solid black" }}>
              <button
                style={{ width: "100%", height: "50px", border: "none" }}
                onClick={handleSubmit}
              >
                {"PDFUsuarios.pdf"}
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
      <h1 style={{ textAlign: "center", margin: "10px" }}>Graficas</h1>
      <div
        style={{
          width: "40%",
          height: "50vh",
          padding: "5px",
          border: "1px solid black",
          marginLeft: "15px",
          display: "inline-block",
        }}
      >
        <Grafica />
      </div>
      <div
        style={{
          width: "40%",
          height: "50vh",
          padding: "5px",
          border: "1px solid black",
          marginLeft: "15px",
          display: "inline-block",
        }}
      >
        <Compras />
      </div>
      <div
        style={{
          width: "40%",
          height: "50vh",
          padding: "5px",
          border: "1px solid black",
          marginLeft: "15px",
          display: "inline-block",
        }}
      >
        <Ventas />
      </div>
      <div
        style={{
          width: "40%",
          height: "50vh",
          padding: "5px",
          border: "1px solid black",
          marginLeft: "15px",
          display: "inline-block",
        }}
      >
        <Grafica2 />
      </div>
      <div
        style={{
          width: "40%",
          height: "50vh",
          padding: "5px",
          border: "1px solid black",
          marginLeft: "15px",
          display: "inline-block",
        }}
      >
        <Circulo />
       
      </div>
    </>
  );
}
