import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardSubtitle,
  CardTitle,
  Button,
} from "reactstrap";
import CartContext from "./context/CartContext";
import { useContext } from "react";

function ProductCard(props) {
  const { items, addItem} = useContext(CartContext);
  

  return (
    <div>
      <Card
        style={{
          width: "10rem",
        }}
        className="h-100"
      >
        <CardImg
          top
          width="100%"
          src={props.imageUrl}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle tag="h6" className="mb-2 ">
            {props.titulo}
          </CardTitle>
          <CardText className="text-muted">{props.descripcion}</CardText>
          <CardText className="text-muted">{props.precio ? "L." + props.precio : ""}</CardText>
          <Button
            style={{
              backgroundColor: "#F2C94C",
              borderColor: "#F2C94C",
              color: "#000000",
            }}
            onClick={() => addItem(props.producto)}
          >
            Agregar
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default ProductCard;
