import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PDFventas = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    obtenerVentas();
  }, []);

  const obtenerVentas = async () => {
    try {
      const response = await axios.get("http://localhost:3006/sales");
      setVentas(response.data);
    } catch (error) {
      console.error("Error al obtener las ventas:", error);
    }
  };

  const generarPDF = () => {
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
    doc.text("De todas las ventas hasta actualidad", 20, 30);

    doc.save("reporte_ventasTotales.pdf");

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
      <h1 className="my-4">Formato en PDF de Ventas</h1>

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

export default PDFventas;
