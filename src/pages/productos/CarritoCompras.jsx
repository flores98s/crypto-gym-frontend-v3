import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import { useContext } from "react";
import CartContext from "./context/CartContext";
import Cookies from "universal-cookie";

let backend = "https://cryptogymbackend-production.up.railway.app/api/";
const cookies = new Cookies();
let idCliente = cookies.get("id");

async function generarDetalleFactura(item) {
  //   console.log(item.item);
  let values = {
    cantidad: 1,
    precio: item.item.precioHistoricoProducto,
    subtotal: item.item.precioHistoricoProducto,
    descuento: 0,
    total: parseFloat(item.item.precioHistoricoProducto * 1.18).toFixed(2),
    producto: item.item.codigoProducto,
  };
  alert("Total a Pagar: L." + values.total);
  fetch(
    "https://cryptogymbackend-production.up.railway.app/api/detallefactura/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  )
    .then((response) => response.json())
    .then((data) => {
    //   console.log("respuesta detalle", data);
    // set cookie with id
        cookies.set("numeroDetalle", data.id, { path: "/" });
      return data;
    });
}

async function getUltimoParametroFactura() {
  let response = await fetch(
    "https://cryptogymbackend-production.up.railway.app/api/getparametrosfactura/"
  );
  let data = await response.json();
  return data.data.id;
}

async function getUltimoNumeroFactura() {
  let response = await fetch(
    "https://cryptogymbackend-production.up.railway.app/api/getparametrosfactura/"
  );
  let data = await response.json();
  return data.data.ultimaFactura;
}

async function actualizarUltimaFactura() {
    let response = await fetch(
      "https://cryptogymbackend-production.up.railway.app/api/actualizarUltimaFactura/2",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
    return data;
  }

async function generarFactura(item) {
  let ultimoNumeroFactura = await getUltimoNumeroFactura();
  let numerodetalleFactura = await generarDetalleFactura(item);
  let parametrosFactura_id = await getUltimoParametroFactura();
  let values = {
    fecha: new Date().toISOString().split("T")[0],
    hora: new Date().toLocaleTimeString(),
    numeroFactura: ultimoNumeroFactura + 1,
    detalleFactura: cookies.get("numeroDetalle"),
    cliente: idCliente,
    parametrosFactura: parametrosFactura_id,
    // membresia: parseInt(cookies.get("numeroMembresia")) + 1,
  };
  console.log("factura" , values);
    fetch("https://cryptogymbackend-production.up.railway.app/api/factura/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("respuesta factura", data);
        actualizarUltimaFactura();
      });
}

function CarritoCompras() {
  const { items, addItem, removeItem, clear } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [prices, setPrices] = useState([]);
  const preciosArray = [];
  const [detalleFactura, setDetalleFactura] = useState([]);

  function addPreciosArray() {
    items.forEach((element) => {
      preciosArray.push(parseFloat(element.item.precioHistoricoProducto));
      console.log(preciosArray);
    });
  }
  function addPreciosArray() {
    const sum = preciosArray.reduce((a, b) => a + b, 0);
    setTotal(sum);
  }

  useEffect(() => {
    addPreciosArray();
    addPreciosArray();
  }, [total, items]);

  return (
    <div>
      <Container className="">
        <Row className="m-2">
          <Col>
            <Nav tabs>
              <NavItem>
                <NavLink tag={Link} to="/tienda">
                  Productos
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/carrito" className="flex">
                  <FaIcons.FaShoppingCart />
                  <span>{items.length}</span>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
      <h1>Carrito de compras</h1>
      <Button onClick={() => clear()}>Vaciar carrito</Button>
      <Table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr>
              {/* {console.log(item.item)} */}
              <td>{item.item.nombre}</td>
              <td>{item.item.precioHistoricoProducto}</td>
              <td>
                <Image
                  src={item.item.imagen}
                  rounded
                  fluid
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              </td>
              <td>
                <Button onClick={() => removeItem(item.item)}>
                  <RiIcons.RiDeleteBin6Line />
                </Button>
              </td>
            </tr>
          ))}
          <tr>
          </tr>
        </tbody>
        <Button
          className="btn btn-success mt-2"
          onClick={() => {
            items.forEach((item) => {
              generarFactura(item);
              clear();
            });
          }}
        >
          Pagar
        </Button>
      </Table>
    </div>
  );
}

export default CarritoCompras;
