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
    "https://cryptogymbackend-production.up.railway.app/api/tiposmembresias/";

function ModalExample(props) {
    console.log(props);
    console.log(props.tipoDocumentoClientes);
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
    const [empleado, setEmpleado] = useState();

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
                        initialValues={
                            {
                                "nombreMembresia": props.membresia ? props.membresia.nombreMembresia : "",
                                "precio": props.membresia ? props.membresia.precio : "",
                                "descripcion": props.membresia ? props.membresia.descripcion : "",
                            }
                        }
                        validate={(values) => {
                            const errors = {};
                            if (!values.nombreMembresia) {
                                errors.nombreMembresia = "Requerido";
                            }
                            else if (values.nombreMembresia.length < 3 || values.nombreMembresia.length > 50) {
                                errors.nombreMembresia = "Debe tener al menos 3 caracteres y máximo 50";
                            }
                            if (!values.precio) {
                                errors.precio = "Requerido";
                            }
                            else if (values.precio < 0) {
                                errors.precio = "Debe ser mayor a 0";
                            }
                            // check if precio is number
                            else if (isNaN(values.precio)) {
                                errors.precio = "Debe ser un número";
                            }
                            if (!values.descripcion) {
                                errors.descripcion = "Requerido";
                            }
                            else if (values.descripcion.length < 3) {
                                errors.descripcion = "Debe tener al menos 3 caracteres";
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values);
                            if (props.tipo === "editar") {
                                fetch(backendUrl + props.membresia.id, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(values),
                                })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        console.log(data);
                                        props.actualizar();
                                        toggle();
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
                                        props.actualizar();
                                        toggle();
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
                                <FormGroup>
                                    <Label for="nombreMembresia">Nombre</Label>
                                    <Input
                                        type="text"
                                        name="nombreMembresia"
                                        id="nombreMembresia"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.nombreMembresia}
                                    />
                                    <div className="text-danger">
                                        {errors.nombreMembresia && touched.nombreMembresia && errors.nombreMembresia}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="precio">Precio</Label>
                                    <Input
                                        type="number"
                                        name="precio"
                                        id="precio"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.precio}
                                    />
                                    <div className="text-danger">
                                        {errors.precio && touched.precio && errors.precio}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="descripcion">Descripción</Label>
                                    <Input
                                        type="text"
                                        name="descripcion"
                                        id="descripcion"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.descripcion}
                                    />
                                    <div className="text-danger">
                                        {errors.descripcion && touched.descripcion && errors.descripcion}
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
