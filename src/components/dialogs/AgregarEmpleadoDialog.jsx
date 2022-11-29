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
  Alert,
  FormGroup,
  Row,
  Col,
  Container,
} from "reactstrap";
import { Formik } from "formik";

let backendUrl = "https://cryptogymbackend-production.up.railway.app/api/";

function ModalExample(props) {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [empleado, setEmpleado] = useState();
  let [successMessage, setSuccessMessage] = useState();

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
          {props.tipo === "editar" ? "Editar" : "Agregar"} Empleado
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              nombres: props.empleado ? props.empleado.nombres : "",
              apellidos: props.empleado ? props.empleado.apellidos : "",
              clave: props.empleado ? props.empleado.clave : "",
              fechaNacimiento: props.empleado
                ? props.empleado.fechaNacimiento
                : "",
              correo: props.empleado ? props.empleado.correo : "",
              telefono: props.empleado ? props.empleado.telefono : "",
              numerodocumento: props.empleado
                ? props.empleado.numerodocumento
                : "",
              genero: props.empleado ? props.empleado.genero : "",
              documento: props.empleado ? props.empleado.documento : "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.nombres) {
                errors.nombres = "Requirido";
              } else if (
                values.nombres.length < 3 ||
                values.nombres.length > 30
              ) {
                errors.nombres = "Debe tener al menos 3 caracteres y máximo 30";
              }
              if (!values.apellidos) {
                errors.apellidos = "Requirido";
              } else if (
                values.apellidos.length < 3 ||
                values.apellidos.length > 30
              ) {
                errors.apellidos =
                  "Debe tener al menos 3 caracteres y máximo 30";
              }
              if (!values.clave) {
                errors.clave = "Requirido";
              } else if (values.clave.length < 8) {
                errors.clave = "Debe tener al menos 8 caracteres";
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
                errors.fechaNacimiento =
                  "Fecha invalida, no puede ser en el futuro";
              }
              // checj if fechaNacimiento is older than 18 years
              else if (
                Date.now() - Date.parse(values.fechaNacimiento) <
                568036800000
              ) {
                errors.fechaNacimiento = "Debe ser mayor 18 años";
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
              if (
                // check regex ^[9|3|8][1-9]{7}$
                !/^[2|9|3|8][1-9]{7}$/i.test(values.telefono)
              ) {
                errors.telefono =
                  "Telefono inválido debe de comenzar con 2, 9, 3 u 8";
              } else if (!values.telefono) {
                errors.telefono = "Requerido";
              } else if (
                values.telefono.length < 8 ||
                values.telefono.length > 8
              ) {
                errors.telefono = "Debe tener 8 caracteres";
              }
              if (!values.numerodocumento) {
                errors.numerodocumento = "Requerido";
              } else if (
                values.numerodocumento.length < 15 ||
                values.numerodocumento.length > 15
              ) {
                errors.numerodocumento = "Debe tener 15 caracteres";
              }
              if (!values.genero) {
                errors.genero = "Requerido";
              }
              if (!values.documento) {
                errors.documento = "Requerido";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              // Post to backendurl
              if (props.tipo === "editar") {
                let url =
                  "https://cryptogymbackend-production.up.railway.app/api/empleado/" +
                  props.empleado.id;
                console.log(url);
                alert(JSON.stringify(values, null, 2));
                fetch(backendUrl + "empleado/" + props.empleado.id + "/", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                    setSuccessMessage("Empleado editado con éxito");
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              } else {
                let url =
                  "https://cryptogymbackend-production.up.railway.app/api/empleado/";
                // alert values
                alert(JSON.stringify(values, null, 2));
                fetch(url, {
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
              // wait 2 seconds and close modal
              setTimeout(() => {
                setCloseAll(true);
              }, 2000);
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
                <Label>
                  {/* show success mesage if it is not empty */}
                  {successMessage && (
                    <Alert color="success">{successMessage}</Alert>
                  )}
                </Label>
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
                        <option value="2">Identidad</option>
                        <option value="1">Pasaporte</option>
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
