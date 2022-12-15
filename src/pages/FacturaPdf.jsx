import React from "react";
import Factura from "./Factura";
import { Document, Page, PDFViewer, View, Text } from "@react-pdf/renderer";
import { Col, Row } from "reactstrap";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { areArraysEqual } from "@mui/base";

let cookies = new Cookies();
let idCliente = cookies.get("id");
let idFactura = cookies.get("idFactura");

async function getParametrosFactura() {
  let response = await fetch(
    "https://cryptogymbackend-production.up.railway.app/api/parametrosfactura/"
  );
  let data = await response.json();
  return data;
}

async function getFactura(idFactura) {
  // alert(idFactura);
  let response = await fetch(
    `https://cryptogymbackend-production.up.railway.app/api/factura/${idFactura}`
  );
  let data = await response.json();
  return data;
}

function FacturaPdf({}) {
  const [parametrosfactura, setParametrosFactura] = useState([]);
  const [factura, setFactura] = useState();

  useEffect(() => {
    getParametrosFactura().then((data) => {
      setParametrosFactura(data[0]);
      console.log(data[0]);
    });
    getFactura(idFactura).then((data) => {
      setFactura(data);
      alert(data);
      console.log(data);
    });
  }, []);

  return (
    <PDFViewer
      style={{
        width: "100%",
        height: "90vh",
        padding: "10px",
      }}
    >
      <Document>
        <Page size="A4">
          <View
            style={{
              padding: "10px",
            }}
          >
            <header>
              <Row>
                <Col className="text-center">
                  <Text>Crypto Gym</Text>
                </Col>
              </Row>
              <Row>
                <Text className="text-center">
                  Dirección: Crypto Gym 123 Calle 123 Colonia 123, Esquina
                  opuesta al parque
                </Text>
              </Row>
              <Row>
                <Text className="text-center">Teléfono: (504) 2222-6655</Text>
              </Row>
              <Row>
                <Text className="text-center">Correo: cryptogym@gmail.com</Text>
              </Row>
            </header>
            <main className="mx-5">
              <Row className="text-center flex justify-between mt-2">
                <Text>RTN: 0801-2000-00561</Text>
                <Text>
                  Fecha:{" "}
                  {new Date().toLocaleDateString("es-es", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </Row>

              <Row className="text-center flex justify-between mt-2">
                <Text>Cliente: Samuel Flores</Text>
                <Text>RTN: 0801-1999-13622</Text>
                <Text>
                  Dirección: 123 Calle 123 Colonia 123, Esquina opuesta al
                  parque
                </Text>
              </Row>
            </main>
            <View className="text-center mt-2 mx-5">
              <View className="mt-2  p-2">
                <thead>
                  <tr>
                    <Text>Cantidad</Text>
                    <Text>1</Text>
                    <Text>Descripción</Text>
                    <Text>Plan Oro</Text>
                    <Text>Precio Unitario</Text>
                    <Text>L. 699.00</Text>
                    <Text>Total</Text>
                    <Text>L. 699.00</Text>
                  </tr>
                </thead>
                <tbody>
                  <tr></tr>
                </tbody>
              </View>
            </View>
            <View className="text-center mt-2 mx-5">
              <Text>Subtotal: L. 699.00</Text>
              <Text>Impuesto(18%): L. 125.82</Text>
              <Text>Total: L. 824.82</Text>
            </View>

            <footer className="mt-2 mx-5">
              {/* <Row className="text-center">CAI: {parametrosfactura.cai}</Row> */}
              <Text className="text-center">
                {/* Fecha Limite de Emision: {parametrosfactura.fechaVencimiento} */}
              </Text>
              <Text className="text-center">
                Rango Autorizado: 000-001-01-000000
                {/* {parametrosfactura.rangoInicial} - 000-001-01-000000 */}
                {/* {parametrosfactura.rangoFinal} */}
              </Text>
              <Text className="text-center">
                Factura Numero: 000-001-01-000000
                {/* {parametrosfactura.ultimaFactura} */}
              </Text>
            </footer>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default FacturaPdf;
