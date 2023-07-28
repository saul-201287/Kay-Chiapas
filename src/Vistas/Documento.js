import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

 const Documento = () => {
  return (
    <Document>
      <Page size="A4" orientation="landscape">
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            textAlign: "justify",
          }}
        >
          <Text style={{ textAlign: "center" }}>
            Usuarios registrados en el sistema
          </Text>
          <Text
            style={{
              textAlign: "justify",
              paddingLeft: "50px",
              marginBottom: "15px",
              marginTop: "20px",
            }}
          >
            | Id | Usuarios | Contraseña | Cargo |
          </Text>
          <Text style={{ textAlign: "justify", paddingLeft: "50px" }}>
            | 01 | juan | 12345 | Administrador |
          </Text>
          <Text style={{ textAlign: "justify", paddingLeft: "50px" }}>
            | 02 | Jose | 67890 | Ventas |
          </Text>
          <Text style={{ textAlign: "justify", paddingLeft: "50px" }}>
            | 03 | Ana | 23adc | Compras |
          </Text>
          <Text style={{ textAlign: "justify", paddingLeft: "50px" }}>
            | 04 | Valeria | lolalatrailera | Inventario |
          </Text>
        </View>
      </Page>
    </Document>
  );
};
export default Documento;
