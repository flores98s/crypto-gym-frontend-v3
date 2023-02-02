import React from "react";
import ProductCard from "./ProductCard";
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
} from "reactstrap";
import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import { useContext } from "react";
import CartContext from "./context/CartContext";
import { Link } from "react-router-dom";

let backend = "https://cryptogymbackend-production.up.railway.app/api/";

async function getProductos() {
  let response = await fetch(backend + "producto/");
  let data = await response.json();
  return data;
}

function ProductList() {
  const [productos, setProductos] = useState([]);
  const [isLoadingProductos, setIsLoadingProductos] = useState(true);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [showShoppingCart, setShowShoppingCart] = useState(false);

  useEffect(() => {
    getProductos().then((data) => {
    //   console.log(data);
      setProductos(data);
      setIsLoadingProductos(false);
    });
  }, []);

  const { items } = useContext(CartContext);

  if (isLoadingProductos) {
    return <h2>Cargando...</h2>;
  }

  return (
    <>
      {/* create navbar */}
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
                <NavLink tag={Link} to="/carrito">
                  <FaIcons.FaShoppingCart />{items.length}
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="m-2">
          {productos.map((producto) => (
            <Col className="col-2" key={producto.id}>
              <ProductCard
                imageUrl={producto.imagen}
                titulo={producto.nombre}
                descripcion={producto.descripcion}
                precio={parseFloat(producto.precioHistoricoProducto)}
                id={producto.id}
                producto={producto}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default ProductList;
