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

let BackendUrl =
    "https://cryptogymbackend-production.up.railway.app/api/detalleplanilla/"

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
    }
    const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(true);
    }
    
    return (
        <div>
            <Button className="btn btn-info btn-sm mx-2 my-2" onClick={toggle}>
                {props.tipo === "editar" ? "Editar" : "Agregar"}
            </Button>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    {props.tipo === "editar" ? "Editar" : "Agregar"} Detalle Planilla
                </ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            sueldobruto: props.detalleplanilla ? props.detalleplanilla.sueldobruto : "",
                            deduccion: props.detalleplanilla ? props.detalleplanilla.deduccion : "",
                            bonificaciones: props.detalleplanilla ? props.detalleplanilla.bonificaciones : "",
                            detalles: props.detalleplanilla ? props.detalleplanilla.detalles : "",
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.sueldobruto) {
                                errors.sueldobruto = "Requerido";
                            }
                            if (!values.deduccion) {
                                errors.deduccion = "Requerido";
                            }
                            if (!values.bonificaciones) {
                                errors.bonificaciones = "Requerido";
                            }
                            if (!values.detalles) {
                                errors.detalles = "Requerido";
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values);
                            if (props.tipo === "editar") {
                                fetch(BackendUrl + props.detalleplanilla.id, {
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
                                            message: "Detalle Planilla editado correctamente",
                                        })

                                        setTimeout(() => {
                                            setMessages({});
                                            toggle();
                                        }, 2000);
                                    })
                                } else {
                                    fetch(
                                        "https://cryptogymbackend-production.up.railway.app/api/detalleplanilla/",
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
                                                message: "Detalle Planilla agregado correctamente",
                                            })

                                            setTimeout(() => {
                                                toggle();
                                            }, 2000);
                                            setMessages({});
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            setMessages({
                                                ok: false,
                                                message: "Error al agregar Detalle Planilla",
                                            })
                                        })
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
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                {messages.ok && (
                                    <div className="alert alert-success" role="alert">
                                        {messages.message}
                                    </div>
                                )}
                                {!messages.ok && messages.message && (
                                    <div className="alert alert-danger" role="alert">
                                        {messages.message}
                                    </div>  
                                )}
                                <FormGroup>
                                    <Label for="sueldobruto">Sueldo Bruto</Label>
                                    <Input
                                        type="text"
                                        name="sueldobruto"
                                        id="sueldobruto"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.sueldobruto}
                                    />
                                    <div className="text-danger">
                                        {errors.sueldobruto && touched.sueldobruto && errors.sueldobruto}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="deduccion">Deduccion</Label>
                                    <Input
                                        type="text"
                                        name="deduccion"
                                        id="deduccion"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.deduccion}
                                    />
                                    <div className="text-danger">
                                        {errors.deduccion && touched.deduccion && errors.deduccion}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="bonificaciones">Bonificaciones</Label>
                                    <Input
                                        type="text"
                                        name="bonificaciones"
                                        id="bonificaciones"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.bonificaciones}
                                    />
                                    <div className="text-danger">
                                        {errors.bonificaciones && touched.bonificaciones && errors.bonificaciones}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="detalles">Detalles</Label>
                                    <Input
                                        type="text"
                                        name="detalles"
                                        id="detalles"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.detalles}
                                    />
                                    <div className="text-danger">
                                        {errors.detalles && touched.detalles && errors.detalles}
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
                                        
