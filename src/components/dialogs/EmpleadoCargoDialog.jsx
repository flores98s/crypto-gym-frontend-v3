import React, {useState, useEffect } from "react";
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Form, 
    Label, 
    Input 
} from "reactstrap";
import { Formik } from "formik";
import { FormGroup } from "react-bootstrap";

let backendUrl = 
    "https://cryptogymbackend-production.up.railway.app/api/empleadocargo/";

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
                    {props.tipo === "editar" ? "Editar" : "Agregar"} Cargo
                </ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            cargo: props.cargo ? props.cargo.cargo : "",
                            fechaInicio: props.cargo ? props.cargo.fechaInicio : "",
                            fechaFinal: props.cargo ? props.cargo.fechaFinal : "",
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.cargo) {
                                errors.cargo = "Requerido";
                            } else if (
                                values.cargo.length < 3 ||
                                values.cargo.length > 50
                            ) {
                                errors.cargo = "Debe tener entre 3 y 50 caracteres";
                            }
                            if (!values.fechaInicio) {
                                errors.fechaInicio = "Requerido";
                            }
                            if (!values.fechaFinal) {
                                errors.fechaFinal = "Requerido";
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values);
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
                                        setMessages({
                                            ok: true,
                                            message: "Cargo editado correctamente",
                                        })

                                        setTimeout(() => {
                                            setMessages({});
                                        }, 2000);
                                    });
                            } else {
                                fetch(
                                    "https://cryptogymbackend-production.up.railway.app/api/empleadocargo/",
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
                                            message: "Cargo agregado correctamente",
                                        });

                                        setTimeout(() => {
                                            toggle();
                                        }, 2000);
                                        setMessages({});
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        setMessages({
                                            ok: false,
                                            message: "Error al agregar el cargo",
                                        })
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
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                {messages.ok && (
                                    <div className="alert alert-success" role="alert">
                                        {messages.message}
                                    </div>
                                )}
                                {messages.ok === false && (
                                    <div className="alert alert-danger" role="alert">
                                        {messages.message}
                                    </div>
                                )}

                                <FormGroup>
                                    <Label for="cargo">Cargo</Label>
                                    <Input
                                        type="text"
                                        name="cargo"
                                        id="cargo"
                                        placeholder="Cargo"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.cargo}
                                    />
                                    <div className="text-danger">
                                    {errors.cargo && touched.cargo && errors.cargo}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fechaInicio">Fecha de inicio</Label>
                                    <Input
                                        type="date"
                                        name="fechaInicio"
                                        id="fechaInicio"
                                        placeholder="Fecha de inicio"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.fechaInicio}
                                    />
                                    <div className="text-danger">
                                    {errors.fechaInicio && touched.fechaInicio && errors.fechaInicio}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fechaFinal">Fecha final</Label>
                                    <Input
                                        type="date"
                                        name="fechaFinal"
                                        id="fechaFinal"
                                        placeholder="Fecha final"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.fechaFinal}
                                    />
                                    <div className="text-danger">
                                    {errors.fechaFinal && touched.fechaFinal && errors.fechaFinal}
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
};

export default ModalExample;

                                    