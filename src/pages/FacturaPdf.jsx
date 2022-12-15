import React from "react";
import Factura from "./Factura";
import { Document, Page, PDFViewer, View, Text } from "@react-pdf/renderer";
import { Col, Row } from "reactstrap";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { areArraysEqual } from "@mui/base";
import { useParams } from "react-router-dom";

let cookies = new Cookies();
let idCliente = cookies.get("id");
let idFactura = cookies.get("idFactura");

function addLeadingZeros(num, totalLength) {
  return String(num).padStart(totalLength, "0");
}

async function getFactura(idFactura) {
  // alert(idFactura);
  let url = `https://cryptogymbackend-production.up.railway.app/api/getFactura/${idFactura}`;
  console.log(url);
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function FacturaPdf({}) {
  // get id from params
  const { id } = useParams();
  console.log(id);
  const [parametrosfactura, setParametrosFactura] = useState([]);
  const [factura, setFactura] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFactura(id).then((data) => {
      setIsLoading(false);
      setFactura(data.data);
      console.log(factura);
    });
  }, []);

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <PDFViewer
      style={{
        width: "100%",
        height: "90vh",
        padding: "10px",
        display: "flex",
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
              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                  alignItems: "center",
                }}
              >
                <Col className="text-center">
                  <Text
                    style={{
                      color: "blue",
                      fontSize: "40px",
                      textalign: "center",
                    }}
                  >
                    Crypto Gym
                  </Text>
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
              <Row>
                <Text>CAI: {"2BD3FF-1AD127-8240A4-B0F43D-7FE4C1-97"} </Text>
                <Text>RTN: 0801-2000-00561</Text>
                <Text>Fecha: {factura.fecha}</Text>
                <Text>Hora: {factura.hora}</Text>
              </Row>

              <Row
                style={{
                  marginTop: "20px",
                }}
              >
                <Text>
                  Cliente: {factura.cliente.nombres + " " + factura.cliente.apellidos}
                </Text>
                {/* <Text>
                  Dirección: 123 Calle 123 Colonia 123, Esquina opuesta al
                  parque
                </Text> */}
              </Row>
            </main>
            <View className="text-center mt-2 mx-5">
              <View className="mt-2  p-2">
                <Text>
                  Cantidad: {factura.detalleFactura.cantidad}
                </Text>
                <Text>
                  Descripción: {" " + factura.tipoMembresia.nombreMembresia}
                </Text>
                <Text>
                  Precio Unitario: L.{parseFloat(factura.detalleFactura.precio).toFixed(2)}
                </Text>
              </View>
            </View>
            <View className="text-center mt-2 mx-5">
              <Text>
                Subtotal: L.{" "}
                {factura.detalleFactura.precio -
                  factura.detalleFactura.descuento}
              </Text>
              <Text>Impuesto(18%): L.{factura.detalleFactura.precio * 0.18}
              </Text>
              <Text>
                Total: L.{" "}
                {parseFloat(
                  parseFloat(factura.detalleFactura.precio * 0.18) +
                    parseFloat(factura.detalleFactura.precio)
                ).toFixed(2)}
              </Text>
            </View>

            <footer className="mt-2 mx-5">
              <Text className="text-center">
                {/* Fecha Limite de Emision: {parametrosfactura.fechaVencimiento} */}
              </Text>
              <Text className="text-center">
                Rango Autorizado: 000-001-01-000000 - 50
                {/* {parametrosfactura.rangoInicial} - 000-001-01-000000 */}
                {/* {parametrosfactura.rangoFinal} */}
              </Text>
              <Text className="text-center">
                Factura Numero: 000-001-01-
                {addLeadingZeros(factura.numeroFactura, 6)}
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
