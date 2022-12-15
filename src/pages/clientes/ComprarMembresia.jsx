import React from "react";
import { useEffect, useState } from "react";
import { Col, Row, Container, Card, Button } from "react-bootstrap";
import ComprarMembresiaDialog from "../../components/dialogs/clientes/ComprarMembresiaDialog";

async function getMembresias() {
  let response = await fetch(
    "https://cryptogymbackend-production.up.railway.app/api/tiposmembresia/"
  );
  let data = await response.json();
  return data;
}

function ComprarMembresia() {
  const [membresias, setMembresias] = useState([]);

  useEffect(() => {
    getMembresias().then((data) => {
      setMembresias(data);
      console.log(data);
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Comprar Membresia</h1>
        </Col>
      </Row>
      <Row>
        {membresias.map((membresia) => {
          return (
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title classname="text-center">{membresia.nombreMembresia}</Card.Title>
                  <Card.Text>
                    <Row>
                      <Col>
                        <Card.Text className="text-center">
                          Precio: {membresia.precio}
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Text>
                    <ComprarMembresiaDialog membresia={membresia} comprar={true} />
                  
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default ComprarMembresia;
