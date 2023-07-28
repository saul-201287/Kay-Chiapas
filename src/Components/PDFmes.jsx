import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from "sweetalert2";

const PDFmes = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [ventas, setVentas] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

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

  useEffect(() => {
    obtenerVentas();
  }, [selectedMonth]);

  const obtenerVentas = async () => {
    if (selectedMonth) {
      try {
        const monthNumber = getMonthNumber(selectedMonth);
        const response = await axios.get("http://localhost:3006/sales4", {
          params: {
            month: monthNumber,
          },
        });
        setVentas(response.data);
      } catch (error) {
        console.error("Error al obtener las ventas:", error);
      }
    }
  };

  const generarPDF = () => {
    if (ventas.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No hay ventas para el mes",
        text: "No se encontraron ventas para generar el reporte PDF del mes.",
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
    doc.text("De todas las ventas hasta actualidad", 20, 30);

    doc.save("reporte_ventasTotales.pdf");

    setIsGeneratingPDF(false);
  };

  const getMonthNumber = (monthName) => {
    const monthIndex = meses.findIndex(
      (mes) => mes.toLowerCase() === monthName.toLowerCase()
    );
    return monthIndex >= 0 ? monthIndex + 1 : null;
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
      <h1 className="my-4">Formato en PDF de Ventas del Mes</h1>

      <Row className="my-4">
        <Col>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Seleccionar Mes</option>
            {meses.map((mes) => (
              <option key={mes} value={mes}>
                {mes}
              </option>
            ))}
          </select>
        </Col>
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

export default PDFmes;
