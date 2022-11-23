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
        <ModalHeader toggle={toggle}>Agregar Cliente</ModalHeader>
        <ModalBody>
            <Formik
                initialValues={{
                    "nombres": props.cliente ? props.cliente.nombres : "",
                    "apellidos": props.cliente ? props.cliente.apellidos : "",
                    "clave": props.cliente ? props.cliente.clave : "",
                    "foto": props.cliente ? props.cliente.foto : "",
                    "fechaNacimiento": props.cliente ? props.cliente.fechaNacimiento : "",
                    "numeroDocumento": props.cliente ? props.cliente.numeroDocumento : "",
                    "correo":  props.cliente ? props.cliente.correo : "",
                    "numeroTelefono": props.cliente ? props.cliente.numeroTelefono : "",
                    "TipoDocumento": props.cliente ? props.cliente.TipoDocumento : "",
                    "genero": props.cliente ? props.cliente.genero : "",
                    "tipoSangre": props.cliente ? props.cliente.tipoSangre : "",
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.nombres) {
                        errors.nombres = "Requerido";
                    }
                    else if (values.nombres.length < 3) {
                        errors.nombres = "Debe tener al menos 3 caracteres";
                    }
                    else if (/^[a-zA-Z ]*$/i.test(values.nombres)) {
                        errors.nombres = "Solo se permiten letras";
                    }
                    if (!values.apellidos) {
                        errors.apellidos = "Requerido";
                    }
                    else if (values.apellidos.length < 3) {
                        errors.apellidos = "Debe tener al menos 3 caracteres";
                    }
                    else if (/^[a-zA-Z ]*$/i.test(values.apellidos)) {
                        errors.apellidos = "Solo se permiten letras";
                    }
                    if (!values.clave) {
                        errors.clave = "Requerido";
                    }
                    else if (values.clave.length < 8) {
                        errors.clave = "Debe tener al menos 8 caracteres";
                    }
                    if (!values.foto) {
                        errors.foto = "Requerido";
                    }
                    if (!values.fechaNacimiento) {
                        errors.fechaNacimiento = "Requerido";
                    }
                    // check fechaNacimiento is in the future 
                    else if (Date.parse(values.fechaNacimiento) > Date.now()) {
                        errors.fechaNacimiento = "Fecha no puede ser en el futuro";
                    }
                    else if (isNaN(Date.parse(values.fechaNacimiento))) {
                        errors.fechaNacimiento = "Fecha no es valida";
                    }
                    else if (Date.now() - Date.parse(values.fechaNacimiento) < 568036800000) {
                        errors.fechaNacimiento = "Debe ser mayor de 18 años";
                    }
                    if (!values.numeroDocumento) {
                        errors.numeroDocumento = "Requerido";
                    }
                    else if (values.numeroDocumento.length < 15 || values.numeroDocumento.length > 15) {
                        errors.numeroDocumento = "Debe tener 15 caracteres";
                    }
                    if (!values.correo) {
                        errors.correo = "Requerido";
                    }
                    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.correo)) {
                        errors.correo = "Correo no es valido";
                    }
                    if (!values.numeroTelefono) {
                        errors.numeroTelefono = "Requerido";
                    }
                    else if (values.numeroTelefono.length < 8 || values.numeroTelefono.length > 8) {
                        errors.numeroTelefono = "Debe tener 8 caracteres";
                    }
                    else if (!/^[2|9|3|8][1-9]{7}$/i.test(values.telefono)) {
                        errors.numeroTelefono = "Telefono no es valido";
                    }
                    if (!values.TipoDocumento) {
                        errors.TipoDocumento = "Requerido";
                    }
                    if (!values.genero) {
                        errors.genero = "Requerido";
                    }
                    if (!values.tipoSangre) {
                        errors.tipoSangre = "Requerido";
                    }
                    return errors;
                }}
                
                onSubmit={(values) => {
                    console.log(values);
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
                })=> (
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
                                <Label for="foto">Foto</Label>
                                <Input
                                    type="file"
                                    name="foto"
                                    id="foto"
                                    placeholder="Foto"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.foto}
                                />
                                <div className="text-danger">
                                {errors.foto && touched.foto && errors.foto}
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
                                {errors.fechaNacimiento && touched.fechaNacimiento && errors.fechaNacimiento}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="numeroDocumento">Numero de Documento</Label>
                                <Input
                                    type="text"
                                    name="numeroDocumento"
                                    id="numeroDocumento"
                                    placeholder="Numero de Documento"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.numeroDocumento}
                                />
                                <div className="text-danger">
                                {errors.numeroDocumento && touched.numeroDocumento && errors.numeroDocumento}
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
                                <Label for="numeroTelefono">Numero de Telefono</Label>
                                <Input
                                    type="text"
                                    name="numeroTelefono"
                                    id="numeroTelefono"
                                    placeholder="Numero de Telefono"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.numeroTelefono}
                                />
                                <div className="text-danger">
                                {errors.numeroTelefono && touched.numeroTelefono && errors.numeroTelefono}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="TipoDocumento">Tipo de Documento</Label>
                                <Input
                                    type="select"
                                    name="TipoDocumento"
                                    id="TipoDocumento"
                                    placeholder="Tipo de Documento"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.TipoDocumento}
                                >
                                    <option value="">Seleccione</option>
                                    <option value="Identidad">Identidad</option>
                                    <option value="Pasaporte">Pasaporte</option>
                                </Input>
                                <div className="text-danger">
                                {errors.TipoDocumento && touched.TipoDocumento && errors.TipoDocumento}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Genero">Genero</Label>
                                <Input
                                    type="select"
                                    name="Genero"
                                    id="Genero"
                                    placeholder="Genero"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.Genero}
                                >
                                    <option value="">Seleccione</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </Input>
                                <div className="text-danger">
                                {errors.Genero && touched.Genero && errors.Genero}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for="tipoSangre">Tipo de Sangre</Label>
                                <Input
                                    type="select"
                                    name="tipoSangre"
                                    id="tipoSangre"
                                    placeholder="Tipo de Sangre"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.tipoSangre}
                                >
                                    <option value="">Seleccione</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </Input>
                                <div className="text-danger">
                                {errors.tipoSangre && touched.tipoSangre && errors.tipoSangre}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" type="submit" disabled={isSubmitting}>
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
