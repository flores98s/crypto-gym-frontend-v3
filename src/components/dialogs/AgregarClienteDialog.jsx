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
  Container,
  Row,
  Col,
  FormGroup,
} from "reactstrap";
import { Formik } from "formik";

let backendUrl =
  "https://cryptogymbackend-production.up.railway.app/api/cliente/";

function ModalExample(props) {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [cliente, setCliente] = useState();

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
          {props.tipo === "editar" ? "Editar" : "Agregar"} Cliente
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              nombres: props.cliente ? props.cliente.nombres : "",
              apellidos: props.cliente ? props.cliente.apellidos : "",
              clave: props.cliente ? props.cliente.clave : "",
              foto: props.cliente ? props.cliente.foto : "",
              fechaNacimiento: props.cliente
                ? props.cliente.fechaNacimiento
                : "",
              numeroDocumento: props.cliente
                ? props.cliente.numeroDocumento
                : "",
              correo: props.cliente ? props.cliente.correo : "",
              numeroTelefono: props.cliente ? props.cliente.numeroTelefono : "",
              TipoDocumento: props.cliente ? props.cliente.TipoDocumento : "",
              genero: props.cliente ? props.cliente.genero : "",
              tipoSangre: props.cliente ? props.cliente.tipoSangre : "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.nombres) {
                errors.nombres = "Requerido";
              }
              if (!values.apellidos) {
                errors.apellidos = "Requerido";
              }
              if (!values.clave) {
                errors.clave = "Requerido";
              }
              if (!values.foto) {
                errors.foto = "Requerido";
              }
              if (!values.fechaNacimiento) {
                errors.fechaNacimiento = "Requirido";
              }
              // check if fechaNacimiento is a valid date
              else if (isNaN(Date.parse(values.fechaNacimiento))) {
                errors.fechaNacimiento = "Fecha invalida";
              }
              // check if fechaNacimiento is in the future
              else if (Date.parse(values.fechaNacimiento) > Date.now()) {
                errors.fechaNacimiento = "Fecha invalida";
              }
              // checj if fechaNacimiento is older than 18 years
              else if (
                Date.now() - Date.parse(values.fechaNacimiento) <
                568036800000
              ) {
                errors.fechaNacimiento = "Debe ser mayor de edad";
              }
              if (!values.numeroDocumento) {
                errors.numeroDocumento = "Requerido";
              } else if (
                values.numeroDocumento.length < 15 ||
                values.numeroDocumento.length > 15
              ) {
                errors.numeroDocumento =
                  "El numero de documento debe tener 15 digitos";
              }
              if (!values.correo) {
                errors.correo = "Requerido";
              } else if (values.correo.length < 3) {
                errors.correo = "Debe tener al menos 3 caracteres";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.correo)
              ) {
                errors.correo = "Correo inválido";
              }
            }}
            onSubmit={(values, { setSubmitting }) => {
              // Post to backendurl
              if (props.tipo === "editar") {
                fetch(backendUrl + props.empleado.id, {
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
              /* and other goodies */
            }) => (
              <Form onSubmit={handleSubmit}>
                <Container>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="nombres">Nombres</Label>
                        <Input
                          type="text"
                          name="nombres"
                          id="nombres"
                          placeholder="Nombres"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.nombres}
                        />
                        <div className="text-danger">
                          {errors.nombres && touched.nombres && errors.nombres}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="apellidos">Apellidos</Label>
                        <Input
                          type="text"
                          name="apellidos"
                          id="apellidos"
                          placeholder="Apellidos"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.apellidos}
                        />
                        <div className="text-danger">
                          {errors.apellidos &&
                            touched.apellidos &&
                            errors.apellidos}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="clave">Clave</Label>
                        <Input
                          type="password"
                          name="clave"
                          id="clave"
                          placeholder="Clave"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.clave}
                        />
                        <div className="text-danger">
                          {errors.clave && touched.clave && errors.clave}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="fechaNacimiento">Fecha de Nacimiento</Label>
                        <Input
                          type="date"
                          name="fechaNacimiento"
                          id="fechaNacimiento"
                          placeholder="Fecha de Nacimiento"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.fechaNacimiento}
                        />
                        <div className="text-danger">
                          {errors.fechaNacimiento &&
                            touched.fechaNacimiento &&
                            errors.fechaNacimiento}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="correo">Correo</Label>
                        <Input
                          type="email"
                          name="correo"
                          id="correo"
                          placeholder="Correo"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.correo}
                        />
                        <div className="text-danger">
                          {errors.correo && touched.correo && errors.correo}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="telefono">Teléfono</Label>
                        <Input
                          type="text"
                          name="telefono"
                          id="telefono"
                          placeholder="Teléfono"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.telefono}
                        />
                        <div className="text-danger">
                          {errors.telefono &&
                            touched.telefono &&
                            errors.telefono}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="numerodocumento">Numero de Documento</Label>
                        <Input
                          type="text"
                          name="numerodocumento"
                          id="numerodocumento"
                          placeholder="Numero de Documento"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.numerodocumento}
                        />
                        <div className="text-danger">
                          {errors.numerodocumento &&
                            touched.numerodocumento &&
                            errors.numerodocumento}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="genero">Genero</Label>
                        <Input
                          type="select"
                          name="genero"
                          id="genero"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.genero}
                        >
                          <option value="">Seleccione</option>
                          <option value="1">Masculino</option>
                          <option value="2">Femenino</option>
                        </Input>
                        <div className="text-danger">
                          {errors.genero && touched.genero && errors.genero}
                        </div>
                      </FormGroup>
                    </Col>
                    <FormGroup>
                      <Label for="documento">Documento</Label>
                      <Input
                        type="select"
                        name="documento"
                        id="documento"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.documento}
                      >
                        <option value="">Seleccione</option>
                        <option value="1">Identidad</option>
                        <option value="2">Pasaporte</option>
                      </Input>
                      <div className="text-danger">
                        {errors.documento &&
                          touched.documento &&
                          errors.documento}
                      </div>
                    </FormGroup>
                    <FormGroup className="mt-2">
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Enviando..." : "Enviar"}
                      </Button>
                    </FormGroup>
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
