import React from "react";
import Cookie from "universal-cookie";
import { useState, useEffect } from "react";
import { Col, Row, Container, Card, Button, Table } from "react-bootstrap";
import axios from "axios";

let backendUrl = "https://cryptogymbackend-production.up.railway.app/api/";
let cookies = new Cookie();
let idCliente = cookies.get("id");

async function getFacturas() {
  let response = await axios.get(
    backendUrl + "getFacturaByCliente/" + idCliente
  );
  console.log(response.data);
  return response.data;
}

async function getInfoCliente() {
  let response = await axios.get(backendUrl + "membresiascliente/" + idCliente);
  return response.data;
}
async function getCliente() {
  let response = await axios.get(backendUrl + "cliente/" + idCliente);
  return response.data;
}

let MembresiaCard = ({ membresia, cliente }) => {
  // console.log(Object.keys(membresia));
  // console.log(membresia.suscripcionActiva);
  if (membresia.suscripcionActiva === false) {
    return (
      <Card>
        <Card.Body>
          <div className="mb-3">
            <Card.Title>
              {cliente.nombres} {cliente.apellidos}
            </Card.Title>
          </div>
          <Card.Text>
            <Row>
              <Col>
                <Card.Text className="text-center">
                  No tienes membresia activa
                </Card.Text>
              </Col>
            </Row>
          </Card.Text>
          <Button
            style={{
              backgroundColor: "#FFB800",
              borderColor: "#FFB800",
            }}
            onClick={() => {
              window.location.href = "/comprarmembresia";
            }}
          >
            Comprar Membresía
          </Button>
        </Card.Body>
      </Card>
    );
  }
  return (
    <Card>
      <Card.Body>
        <div className="mb-3">
          <Card.Title>
            {cliente.nombres} {cliente.apellidos}
          </Card.Title>
        </div>
        <Card.Text>
          <Row>
            <Col>
              <Card.Text className="text-center">
                Tipo de Membresía <hr />{" "}
              </Card.Text>
              <p className="text-center font-bold">
                {membresia.NombreMembresia}
              </p>
            </Col>
            <Col>
              <Card.Text className="text-center">
                Fecha de Inicio <hr />
              </Card.Text>
              <p className="text-center font-bold">
                {membresia.fechaInicio.split("T")[0]}
              </p>
            </Col>
            <Col>
              <Card.Text className="text-center">
                Fecha de Finalización
                <hr />
              </Card.Text>
              <p className="text-center font-bold">
                {
                  // parse date
                  membresia.fechaFinal.split("T")[0]
                }
              </p>
            </Col>
            <Col>
              <Card.Text className="text-center">
                Dias Restantes <hr />
              </Card.Text>
              <p className="text-center font-bold">
                {membresia.tiempoRestanteDias}
              </p>
            </Col>
          </Row>
        </Card.Text>
        <Button
          style={{
            backgroundColor: "#FFB800",
            borderColor: "#FFB800",
          }}
        >
          Renovar Membresía
        </Button>
      </Card.Body>
    </Card>
  );
};

export default function MembresiaCliente() {
  const [membresias, setMembresias] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [clienteInfo, setClienteInfo] = useState({});
  const [facturas, setFacturas] = useState({});
  const [isLoadingFacturas, setIsLoadingFacturas] = useState(true);

  useEffect(() => {
    getCliente().then((data) => {
      setClienteInfo(data.data[0]);
      // console.log(data.data);
    });
    getInfoCliente().then((data) => {
      // console.log(data);
      setMembresias(data);
      setIsLoading(false);
    });
    getFacturas().then((data) => {
      if (data.data === "No se encontró el id") {
        setFacturas();
        setIsLoadingFacturas(false);
      } else {
        setFacturas(data);
        setIsLoadingFacturas(false);
        console.log(facturas);
      }
    });
  }, []);

  if (isLoading || isLoadingFacturas) {
    return <h1>Cargando...</h1>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Información de Membresia</h1>
          {/* <Row>{membresias.id}</Row> */}

          <MembresiaCard membresia={membresias} cliente={clienteInfo} />
          {/* <Row>{console.log(membresias.tipoMembresia.nombreMembresia)}</Row> */}
        </Col>
      </Row>
      {console.log()}
      {facturas ? (
        <Row className="mt-2">
          <Col>
            <h2>Historial de Facturas</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Numero Factura</th>
                  <th>Ver Factura</th>
                </tr>
              </thead>
              <tbody>
                {facturas.data.map((factura, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{factura.fecha.split("T")[0]}</td>
                      <td>{factura.hora}</td>
                      <td>{factura.id}</td>
                      <td>
                        <Button
                          style={{
                            backgroundColor: "#FFB800",
                            borderColor: "#FFB800",
                          }}
                          onClick={() => {
                            window.location.href = `/facturapdf/${factura.id}`;
                          }}
                        >
                          Ver Factura
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      ) : (
        <Row className="mt-2">
          <Col>
            <h4>No tienes facturas</h4>
          </Col>
        </Row>
      )}
    </Container>
  );
}
