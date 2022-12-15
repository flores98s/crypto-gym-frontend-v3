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

let backendUrl =
  "https://cryptogymbackend-production.up.railway.app/api/cargo/";

function ModalExample(props) {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [cargo, setCargo] = useState([]);

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
          {props.tipo === "editar" ? "Editar" : "Agregar"} Cargo
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              nombreCargo: props.cargo ? props.cargo.nombreCargo : "",
              salario: props.cargo ? props.cargo.salario : "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.nombreCargo) {
                errors.nombreCargo = "Requerido";
              } else if (values.nombreCargo.length > 50) {
                errors.nombreCargo = "El nombre del cargo es muy largo";
              } else if (values.nombreCargo.length < 3) {
                errors.nombreCargo = "El nombre del cargo es muy corto";
              if (!values.salario) {
                errors.salario = "Requerido";
              } else if (isNaN(values.salario)) {
                errors.salario = "Debe ser un número";
              } else if (values.salario < 500) {
                errors.salario = "El salario debe ser mayor a Lps.500";
              }
              return errors;
            }}}
            onSubmit={(values, { setSubmitting }) => {
              if (props.tipo === "editar") {
                fetch(backendUrl + props.cargo.id, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              } else {
                fetch(backendUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              }
              setSubmitting(false);
              toggle();
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
            }) => (
              <Form onSubmit={handleSubmit}>
                <Container>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="nombreCargo">Nombre Cargo</Label>
                        <Input
                          type="text"
                          name="nombreCargo"
                          id="nombreCargo"
                          placeholder="Nombre Cargo"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.nombreCargo}
                        />
                        <div className="text-danger">
                          {errors.nombreCargo &&
                            touched.nombreCargo &&
                            errors.nombreCargo}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="salario">Salario</Label>
                        <Input
                          type="number"
                          name="salario"
                          id="salario"
                          placeholder="Salario"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.salario}
                        />
                        <div className="text-danger">
                          {errors.salario && touched.salario && errors.salario}
                        </div>
                      </FormGroup>
                      <FormGroup className="mt-2">
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Enviando..." : "Enviar"}
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Container>
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
