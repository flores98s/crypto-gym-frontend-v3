import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  Input,
  FormGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Formik } from "formik";
import Cookies from "universal-cookie";
import { stringify } from "postcss";

let cookies = new Cookies();
let idCliente = cookies.get("id");
let numeroMembresia = null;

function dateWithMonthsDelay(months) {
  const date = new Date();
  date.setMonth(date.getMonth() + months);

  return date;
}

let backendUrl =
  "https://cryptogymbackend-production.up.railway.app/api/detallefactura/";

async function getUltimoNumeroFactura() {
  let response = await fetch(
    "https://cryptogymbackend-production.up.railway.app/api/getparametrosfactura/"
  );
  let data = await response.json();
  return data;
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

let setMembresia = (props) => {
  // console.log(props.membresia.id);
  let values = {
    // fechaInicio: (new Date()).toLocaleDateString(),
    // fechaFinal: (dateWithMonthsDelay(1)).toLocaleDateString(),
    fechaInicio: new Date().toISOString().split("T")[0],
    fechaFinal: dateWithMonthsDelay(1).toISOString().split("T")[0],
    tipoMembresia: props.membresia.id,
    descuento: null,
    cliente: idCliente,
  };

  console.log(values);
  backendUrl =
    "https://cryptogymbackend-production.up.railway.app/api/membresia/";
  fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      
      cookies.set("numeroMembresia", data.id, { path: "/" });
      console.log(cookies.get("numeroMembresia"));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

async function getUltimoParametroFactura() {
  let response = await fetch(
    "https://cryptogymbackend-production.up.railway.app/api/getparametrosfactura/"
  );
  let data = await response.json();
  return data;
}

let setFactura = (ultimoNumeroFactura, membresia, numerodetalleFactura,parametrosFactura_id) => {
  console.log(parseInt(cookies.get("numeroMembresia")) + 1,);
  let values = {
    // fecha: new Date().toISOString().split("T")[0],
    // hora: new Date().toLocaleTimeString(),
    // numeroFactura: ultimoNumeroFactura + 1,
    // detalleFactura: numerodetalleFactura,
    // cliente: idCliente,
    // parametrosFactura: parametrosFactura_id,
    // membresia: parseInt(cookies.get("numeroMembresia")) + 1,
      fecha: new Date().toISOString().split("T")[0],
      hora: new Date().toLocaleTimeString(),
      numeroFactura: ultimoNumeroFactura + 1,
      detalleFactura: numerodetalleFactura,
      cliente: idCliente,
      parametrosFactura: parametrosFactura_id,
      membresia: parseInt(cookies.get("numeroMembresia")) + 1,


  };
  // alert(JSON.stringify(values))
  alert("Procesando Factura");
  alert("Factura Procesada");
  console.log(values);
  alert(JSON.stringify(values));
  fetch("https://cryptogymbackend-production.up.railway.app/api/factura/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data recibida de factura:", data);
      alert("Membresia comprada con exito");
      cookies.set("idFactura", data.id, { path: "/" });
    })
    .catch((error) => {
      console.error("Error:", error);
      console.log("Error al comprar membresia");
      console.log(values);
    });
};

function ModalExample(props) {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [ultimoNumeroFactura, setUltimoNumeroFactura] = useState();
  const [detalleFactura_id, setDetalleFactura_id] = useState();
  const [parametrosFactura_id, setParametrosFactura_id] = useState();
  const [isLoadingParametrosFactura, setIsLoadingParametrosFactura] = useState(true);

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  useEffect(() => {
    getUltimoNumeroFactura().then((data) => {
      console.log(data.data.ultimaFactura);
      setUltimoNumeroFactura(data.data.ultimaFactura);
    });

    getUltimoParametroFactura().then((data) => {
      console.log(data.data.id);
      setParametrosFactura_id(data.data.id);

    });
  }, []);

  return (
    <div>
      <Button className="btn btn-info btn-sm mx-2 my-2" onClick={toggle}>
        {props.comprar ? "Comprar" : "Renovar"}
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {props.comprar ? "Comprar" : "Renovar"} Membresía{" "}
          {props.membresia.nombreMembresia.replace("Plan", "")}
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              cantidad: 1,
              precio: props.membresia.precio,
              subtotal: props.membresia.precio,
              descuento: 0,
              total: parseFloat(props.membresia.precio * 1.18).toFixed(2),
              producto: props.membresia.id,
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log("Enviando datos", values);
                alert("Comprobando datos");
                fetch(backendUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("Success:", data);
                    console.log("id del detalle factura desde data", data.id);
                    setDetalleFactura_id(data.id);
                    console.log(
                      "id del detalle factura desde hook",
                      detalleFactura_id
                    );
                    // wait 1 second before showing the next modal
                    setTimeout(() => {
                      setModal(false);
                    }, 1000);

                    setMembresia(props);

                    setFactura(ultimoNumeroFactura, numeroMembresia, data.id, parametrosFactura_id);
                    actualizarUltimaFactura();
                    window.location.href = "/membresiacliente";
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="precio">Precio</Label>
                  <Input
                    type="text"
                    name="precio"
                    id="precio"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={"L." + values.precio}
                    disabled={true}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="subtotal">Subtotal</Label>
                  <Input
                    type="text"
                    name="subtotal"
                    id="subtotal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={"L." + values.subtotal}
                    disabled={true}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="descuento">Descuento</Label>
                  <Input
                    type="text"
                    name="descuento"
                    id="descuento"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.descuento ? "L." + values.descuento : 0}
                    disabled={true}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="total">Total</Label>
                  <Input
                    type="text"
                    name="total"
                    id="total"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={"L." + parseFloat(values.total).toFixed(2)}
                    disabled={true}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="producto">Producto</Label>
                  <Input
                    type="text"
                    name="producto"
                    id="producto"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={props.membresia.nombreMembresia}
                    disabled={true}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="formaPago">Forma de Pago</Label>
                  <Input
                    type="select"
                    name="formaPago"
                    id="formaPago"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.formaPago}
                  >
                    <option value="Efectivo">Efectivo</option>
                    <option value="Tarjeta">Tarjeta</option>
                  </Input>
                </FormGroup>

                <Button type="submit" disabled={isSubmitting}>
                  {props.comprar ? "Pagar" : "Renovar"}
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default ModalExample;
