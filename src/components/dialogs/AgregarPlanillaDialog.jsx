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
    "https://cryptogymbackend-production.up.railway.app/api/planilla/";

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
                    {props.tipo === "editar" ? "Editar" : "Agregar"} Planilla
                </ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            detallePlanilla: props.planilla ? props.planilla.detallePlanilla : "",
                            fechaInicialPago: props.planilla ? props.planilla.fechaInicialPago : "",
                            fechaFinalPago: props.planilla ? props.planilla.fechaFinalPago : "",
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.detallePlanilla) {
                                errors.detallePlanilla = "Requerido";
                            } else if (
                                values.detallePlanilla.length < 3 ||
                                values.detallePlanilla.length > 50
                            ) {
                                errors.detallePlanilla =
                                    "Debe tener entre 3 y 50 caracteres";
                            }
                            if (!values.fechaInicialPago) {
                                errors.fechaInicialPago = "Requerido";
                            }
                            if (!values.fechaFinalPago) {
                                errors.fechaFinalPago = "Requerido";
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values);
                            if(props.tipo === "editar") {
                                fetch(backendUrl + props.planilla.id, {
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
                                    message: "Planilla editada correctamente",
                                  });
                                  // wait 2 seconds and close modal
                                  setTimeout(() => {
                                    setMessages({});
                                    toggle();
                                  }, 2000);
                                });
                            } else {
                                fetch(
                                    "https://cryptogymbackend-production.up.railway.app/api/planilla/",
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
                                        message: "Planilla agregada correctamente",
                                    });
                                    // wait 2 seconds and close modal
                                    setTimeout(() => {
                                        toggle();
                                    }, 2000);
                                    setMessages({});
                                    })
                                    .catch((error) => {
                                        console.log("Error:", error);
                                        setMessages({
                                            ok: false,
                                            message: "Error al agregar planilla",
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
                                    <div className="alert alert-success">
                                        {messages.message}
                                    </div>
                                )}
                                {messages.error === false && (
                                    <div className="alert alert-danger">
                                        {messages.message}
                                    </div>
                                )}

                                <FormGroup>
                                    <Label for="detallePlanilla">Detalle</Label>
                                    <Input
                                        type="text"
                                        name="detallePlanilla"
                                        id="detallePlanilla"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.detallePlanilla}
                                    />
                                    <div className="alert-danger">
                                    {errors.detallePlanilla &&
                                        touched.detallePlanilla &&
                                        errors.detallePlanilla}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fechaInicialPago">Fecha Inicial</Label>
                                    <Input
                                        type="date"
                                        name="fechaInicialPago"
                                        id="fechaInicialPago"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.fechaInicialPago}
                                    />
                                    <div className="alert-danger">
                                    {errors.fechaInicialPago &&
                                        touched.fechaInicialPago &&
                                        errors.fechaInicialPago}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fechaFinalPago">Fecha Final</Label>
                                    <Input
                                        type="date"
                                        name="fechaFinalPago"
                                        id="fechaFinalPago"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.fechaFinalPago}
                                    />
                                    <div className="alert-danger">
                                    {errors.fechaFinalPago &&
                                        touched.fechaFinalPago &&
                                        errors.fechaFinalPago}
                                    </div>
                                </FormGroup>
                                <Button type="submit" color="primary" disabled={isSubmitting}>
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

                                
