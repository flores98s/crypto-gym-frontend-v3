import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Button,
  CardSubtitle,
  Row,
  Col,
} from "reactstrap";

function CustomCard(props) {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Card
              style={{
                width: "18rem",
              }}
            >
              <CardBody>
                <CardTitle tag="h5">{props.titulo}</CardTitle>
                {/* <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Card subtitle
                </CardSubtitle> */}
                <CardText>{props.descripcion}</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Card;
