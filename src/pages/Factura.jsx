import React from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { useEffect, useState } from "react";

async function getParametrosFactura() {
  let response = await fetch(
    "https://cryptogymbackend-production.up.railway.app/api/getparametrosfactura/"
  );
  let data = await response.json();
  return data;
}


function Factura(props) {
  const [parametrosfactura, setParametrosFactura] = useState([]);

  useEffect(() => {
    getParametrosFactura().then((data) => {
      setParametrosFactura(data[0]);
      console.log(data[0]);
    });
  }, []);


  return (
    <div>
      <Container className="border rounded border-black p-2">
        <header>
          <Row>
            <Col className="text-center">
              <h1>Crypto Gym</h1>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              Dirección: Crypto Gym 123 Calle 123 Colonia 123, Esquina opuesta
              al parque
            </Col>
          </Row>
          <Row>
            <Col className="text-center">Teléfono: (504) 2222-6655</Col>
          </Row>
          <Row>
            <Col className="text-center">Correo: cryptogym@gmail.com</Col>
          </Row>
        </header>
        <main className="mx-5">
          <Row className="text-center flex justify-between mt-2">
            <Col>RTN: 0801-2000-00561</Col>
            <Col>
              Fecha:{" "}
              {new Date().toLocaleDateString("es-es", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Col>
          </Row>

          <Row className="text-center flex justify-between mt-2">
            <Row>Cliente: Juan Perez</Row>
            <Row>RTN: 0801-1999-13622</Row>
            <Row>
              Dirección: 123 Calle 123 Colonia 123, Esquina opuesta al parque
            </Row>
          </Row>
        </main>
        <div className="text-center mt-2 mx-5">
          <Table className="mt-2  p-2">
            <thead>
              <tr>
                <td>Cantidad</td>
                <td>Descripción</td>
                <td>Precio Unitario</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Plan Oro</td>
                <td>L. 699.00</td>
                <td>L. 699.00</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="text-center mt-2 mx-5">
          <Row>Subtotal: L. 699.00</Row>
          <Row>Impuesto(18%): L. 125.82</Row>
          <Row>Total: L. 824.82</Row>
        </div>

        <footer className="mt-2 mx-5">
          <Row className="text-center">
            CAI: {parametrosfactura.cai}
          </Row>
          <Row className="text-center">Fecha Limite de Emision: {parametrosfactura.fechaVencimiento}</Row>
          <Row className="text-center">
            Rango Autorizado: 000-001-01-000000{parametrosfactura.rangoInicial} - 000-001-01-000000{parametrosfactura.rangoFinal}
          </Row>
          <Row className="text-center">Factura Numero: 000-001-01-000000{parametrosfactura.ultimaFactura}</Row>
        </footer>
      </Container>
    </div>
  );
}

export default Factura;
