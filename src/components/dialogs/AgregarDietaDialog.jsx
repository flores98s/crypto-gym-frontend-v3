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
} from "reactstrap";
import { Formik } from "formik";
import { FormGroup } from "react-bootstrap";

let backendUrl =
    "http://cryptogymbackend-production.up.railway.app/api/dieta/";

function ModalExample(props) {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [empleado, setEmpleado] = useState();
  const [messages, setMessages] = useState({});
  const [dietas, setDietas] = useState();

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  let getDietas = async () => {
    let response = await fetch("https://cryptogymbackend-production.up.railway.app/api/asignaciondieta/");
    let data = await response.json();
    setDietas(data);
  };

  useEffect(() => {
    getDietas();
  }, []);
console.log(props.dieta);

  return (
    <div>
      <Button className="btn btn-info btn-sm mx-2 my-2" onClick={toggle}>
        {props.tipo === "editar" ? "Editar" : "Agregar"}
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {props.tipo === "editar" ? "Editar" : "Agregar"} Dieta
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              nombre: props.dieta
                ? props.dieta.nombre
                : "",
              aisgnacionDieta: props.dieta ? props.dieta.asignacionDieta : "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.nombre) {
                errors.nombre = "Requerido";
              } else if (
                values.nombre.length < 3 ||
                values.nombre.length > 50
              ) {
                errors.nombre =
                  "Debe tener al menos 3 caracteres y máximo 50";
              }
              if (!values.asignacionDieta) {
                errors.asignacionDieta = "Requerido";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              if (props.tipo === "editar") {
                fetch("https://cryptogymbackend-production.up.railway.app/api/dieta/" + props.dieta.id, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                    setMessages({
                      ok: true,
                      message: "Dieta editada correctamente",
                    });
                    // wait 2 seconds and close modal
                    setTimeout(() => {
                      setMessages({});
                      toggle();
                    }, 2000);
                  });
              } else {
                fetch(
                    "https://cryptogymbackend-production.up.railway.app/api/dieta/",
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
                    console.log(data);
                    setMessages({
                      ok: true,
                      message: "Dieta agregada con éxito",
                    });
                    // wait 2 seconds and close modal
                    setTimeout(() => {
                      toggle();
                    }, 2000);
                    setMessages({});
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                    setMessages({
                      error: true,
                      message: "Error al agregar la dieta",
                    });
                  });
              }
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
                {messages.ok && (
                  <div className="alert alert-success" role="alert">
                    {messages.message}
                  </div>
                )}
                {messages.error === false && (
                  <div className="alert alert-danger" role="alert">
                    {messages.message}
                  </div>
                )}

                <FormGroup>
                  <Label for="nombre">Nombre</Label>
                  <Input
                    type="text"
                    name="nombre"
                    id="nombre"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nombre}
                  />
                  <div className="text-danger">
                    {errors.nombre &&
                      touched.nombre &&
                      errors.nombre}
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label for="asignacionDieta">Asignación Dieta</Label>
                  <Input
                    type="select"
                    name="asignacionDieta"
                    id="asignacionDieta"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.asignacionDieta}
                  >
                    <option value="">Seleccione una opción</option>
                    {dietas.map((dieta) => (
                      <option value={dieta.id} key={dieta.id}>{dieta.comida}</option>
                    ))}

                  </Input>
                  
                  <div className="text-danger">
                    {errors.asignacionDieta &&
                      touched.asignacionDieta &&
                      errors.asignacionDieta}
                  </div>
                </FormGroup>
                <FormGroup className = "mt-2" >
                <Button type="submit" disabled={isSubmitting} >
                  {props.tipo === "editar" ? "Editar" : "Agregar"}
                </Button>
                </FormGroup>
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