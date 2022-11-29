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

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

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
              nombreDieta: props.dieta
                ? props.dieta.nombreDieta
                : "",
              aisgnacionDieta: props.dieta ? props.dieta.asignacionDieta : "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.nombreDieta) {
                errors.nombreDieta = "Requerido";
              } else if (
                values.nombreDieta.length < 3 ||
                values.nombreDieta.length > 50
              ) {
                errors.nombreDieta =
                  "Debe tener al menos 3 caracteres y máximo 50";
              }
              if (!values.asignacionDieta) {
                errors.asignacionDieta = "Requerido";
              } else if (values.asignacionDieta.length < 3) {
                errors.asignacionDieta = "Debe tener al menos 3 caracteres";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              if (props.tipo === "editar") {
                fetch(backendUrl + props.dieta.id, {
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
                    "http://cryptogymbackend-production.up.railway.app/api/dieta/",
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
                  <Label for="nombreDieta">Nombre</Label>
                  <Input
                    type="text"
                    name="nombreDieta"
                    id="nombreDieta"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nombreDieta}
                  />
                  <div className="text-danger">
                    {errors.nombreDieta &&
                      touched.nombreDieta &&
                      errors.nombreDieta}
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label for="asignacionDieta">asignacionDieta</Label>
                  <Input
                    type="text"
                    name="asignacionDieta"
                    id="asignacionDieta"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.asignacionDieta}
                  />
                  <div className="text-danger">
                    {errors.asignacionDieta &&
                      touched.asignacionDieta &&
                      errors.asignacionDieta}
                  </div>
                </FormGroup>
                <Button type="submit" disabled={isSubmitting}>
                  {props.tipo === "editar" ? "Editar" : "Agregar"}
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