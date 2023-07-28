import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from "sweetalert2";

const PDFdia = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    obtenerVentas();
  }, []);

  const obtenerVentas = async () => {
    try {
      const response = await axios.get("http://localhost:3006/sales2");
      setVentas(response.data);
    } catch (error) {
      console.error("Error al obtener las ventas:", error);
    }
  };

  const generarPDF = () => {
    if (ventas.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No hay ventas del día",
        text: "No se encontraron ventas para generar el reporte PDF.",
      });
      return;
    }

    setIsGeneratingPDF(true);

    const doc = new jsPDF("p", "mm");

    const tableData = [
      ["Cantidad", "Concepto", "Fecha", "Vendedor", "Precio Unitario"],
      ...ventas.map((venta) => [
        venta.Cantidad,
        venta.Concepto,
        formatDate(venta.FechaVenta),
        venta.Vendedor,
        formatCurrency(venta.PrecioUnitario),
      ]),
    ];

    doc.autoTable({
      head: [tableData[0]],
      body: tableData.slice(1),
      startY: 50,
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Reporte de Ventas", 20, 20);

    doc.setFontSize(10);
    doc.text("De todas las ventas del día", 20, 30);

    doc.save("reporte_ventasDelDia.pdf");

    setIsGeneratingPDF(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCurrency = (value) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      return `$${numericValue.toFixed(2)}`;
    }
    return "";
  };

  return (
    <Container>
      <h1 className="my-4">Formato en PDF de Ventas del Día</h1>

      <Row className="my-4">
        <Col>
          <Button onClick={generarPDF} disabled={isGeneratingPDF}>
            Generar PDF
          </Button>
        </Col>
      </Row>
      {isGeneratingPDF && <p>Generando PDF...</p>}
    </Container>
  
  );
};

export default PDFdia;
