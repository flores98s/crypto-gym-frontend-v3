import React, { useState,useEffect } from "react";
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
  "https://cryptogymbackend-production.up.railway.app/api/empleado/";



function ModalExample(props) {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [empleado, setEmpleado] = useState();

  let getEmpleado = async (id) => {
    let response = await fetch(backendUrl + id);
    let data = await response.json();
    console.log(data);
    return data;
  };

  useEffect(() => {
    getEmpleado(props.empleadoID).then((data) => setEmpleado(data));
  }, []);


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
        <ModalHeader toggle={toggle}>Agregar Empleado</ModalHeader>
        <ModalBody>
          <Formik
          
            initialValues={{
              nombres: "",
              apellidos: "",
              clave: "",
              fechaNacimiento: null,
              correo: "",
              telefono: "",
              numerodocumento: "",
              genero: null,
              documento: null,
            }}
            validate={(values) => {
              const errors = {};
              if (!values.nombres) {
                errors.nombres = "Requirido";
              } else if (values.nombres.length < 3) {
                errors.nombres = "Debe tener al menos 3 caracteres";
              }
              if (!values.apellidos) {
                errors.apellidos = "Requirido";
              } else if (values.apellidos.length < 3) {
                errors.apellidos = "Debe tener al menos 3 caracteres";
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
                errors.fechaNacimiento = "Fecha invalida";
              }
              // checj if fechaNacimiento is older than 18 years
              else if (
                Date.now() - Date.parse(values.fechaNacimiento) <
                568036800000
              ) {
                errors.fechaNacimiento = "Debe ser mayor de edad";
              }
              if (!values.correo) {
                errors.correo = "Requerido";
              } else if (values.correo.length < 3) {
                errors.correo = "Debe tener al menos 3 caracteres";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.correo)
              ) {
                errors.correo = "Correo invalido";
              }
              if (
                // check regex ^[9|3|8][1-9]{7}$
                !/^[2|9|3|8][1-9]{7}$/i.test(values.telefono)
              ) {
                errors.telefono = "Telefono invalido";
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
                errors.numerodocumento = "Debe tener 13 caracteres";
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
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
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
                    {errors.apellidos && touched.apellidos && errors.apellidos}
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
                  <Label for="telefono">Telefono</Label>
                  <Input
                    type="text"
                    name="telefono"
                    id="telefono"
                    placeholder="Telefono"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.telefono}
                  />
                  <div className="text-danger">
                    {errors.telefono && touched.telefono && errors.telefono}
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
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </Input>
                  <div className="text-danger">
                    {errors.genero && touched.genero && errors.genero}
                  </div>
                </FormGroup>
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
                    <option value="Identidad">Identidad</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </Input>
                  <div className="text-danger">
                    {errors.documento && touched.documento && errors.documento}
                  </div>
                </FormGroup>
                <FormGroup className="mt-2">
                  <Button type="submit" disabled={isSubmitting}>
                    Agregar
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
