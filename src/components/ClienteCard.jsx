import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";

function ClienteCard(props) {
  return (
    <Card
      style={{
        width: "1rem",
      }}
    >
      <CardBody>
        <CardTitle tag="h3">{props.titulo}</CardTitle>
        {/* <CardSubtitle className="mb-2 text-muted" tag="h6">
          Card subtitle
        </CardSubtitle> */}
        <CardText>
          {props.descripcion}
        </CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  );
}

export default ClienteCard;
