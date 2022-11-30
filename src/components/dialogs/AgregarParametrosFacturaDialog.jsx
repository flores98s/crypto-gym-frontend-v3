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
    "https://cryptogymbackend-production.up.railway.app/api/parametrosfactura/";

function ModalExample(props) {
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
    const [parametro, setParametros] = useState();
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
                    {props.tipo === "editar" ? "Editar" : "Agregar"} Parametro
                </ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            cai: props.parametro ? props.parametro.cai : "",
                            fechaEmision: props.parametro ? props.parametro.fechaEmision : "",
                            fechaVencimiento: props.parametro ? props.parametro.fechaVencimiento : "",
                            rangoInicial: props.parametro ? props.parametro.rangoInicial : "",
                            rangoFinal: props.parametro ? props.parametro.rangoFinal : "",
                            codigoSucursal: props.parametro ? props.parametro.codigoSucursal : "",
                            ultimaFactura: props.parametro ? props.parametro.ultimaFactura : "",
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.cai) {
                                errors.cai = "Requerido";
                            } else if (
                                values.cai.length < 3 ||
                                values.cai.length > 50
                            ) {
                                errors.cai = "Debe tener entre 3 y 50 caracteres";
                            }
                            if (!values.fechaEmision) {
                                errors.fechaEmision = "Requerido";
                            }
                            if (!values.fechaVencimiento) {
                                errors.fechaVencimiento = "Requerido";
                            }
                            if (!values.rangoInicial) {
                                errors.rangoInicial = "Requerido";
                            }
                            if (!values.rangoFinal) {
                                errors.rangoFinal = "Requerido";
                            }
                            if (!values.codigoSucursal) {
                                errors.codigoSucursal = "Requerido";
                            }
                            if (!values.ultimaFactura) {
                                errors.ultimaFactura = "Requerido";
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values);
                            if (props.tipo === "editar") {
                                fetch(backendUrl + props.parametro.id, {
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
                                        messages: "Parametro editado correctamente",
                                    });

                                    setTimeout(() => {
                                        setMessages({});
                                        toggle();
                                    }, 2000);
                                });
                            } else {
                                fetch(
                                    "https://cryptogymbackend-production.up.railway.app/api/parametrosfactura/",
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
                                            message: "Parametro agregado correctamente",
                                        });

                                        setTimeout(() => {
                                         toggle();
                                        }, 2000);
                                        setMessages({});
                                    })
                                    .catch((error) => {
                                        console.error("Error",error);
                                        setMessages({
                                            error: false,
                                            message: "Error al agregar parametro",
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
                                    <Label for="cai">CAI</Label>
                                    <Input
                                        type="text"
                                        name="cai"
                                        id="cai"
                                        placeholder="CAI"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.cai}
                                    />
                                    {errors.cai && touched.cai && errors.cai}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fechaEmision">Fecha de Emision</Label>
                                    <Input
                                        type="date"
                                        name="fechaEmision"
                                        id="fechaEmision"
                                        placeholder="Fecha de Emision"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.fechaEmision}
                                    />
                                    <div className="text-danger">
                                    {errors.fechaEmision && touched.fechaEmision && errors.fechaEmision}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fechaVencimiento">Fecha de Vencimiento</Label>
                                    <Input
                                        type="date"
                                        name="fechaVencimiento"
                                        id="fechaVencimiento"
                                        placeholder="Fecha de Vencimiento"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.fechaVencimiento}
                                    />
                                    <div className="text-danger">
                                    {errors.fechaVencimiento && touched.fechaVencimiento && errors.fechaVencimiento}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="rangoInicial">Rango Inicial</Label>
                                    <Input
                                        type="text"
                                        name="rangoInicial"
                                        id="rangoInicial"
                                        placeholder="Rango Inicial"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.rangoInicial}
                                    />
                                    <div className="text-danger">
                                    {errors.rangoInicial && touched.rangoInicial && errors.rangoInicial}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="rangoFinal">Rango Final</Label>
                                    <Input
                                        type="text"
                                        name="rangoFinal"
                                        id="rangoFinal"
                                        placeholder="Rango Final"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.rangoFinal}
                                    />
                                    <div className="text-danger">
                                    {errors.rangoFinal && touched.rangoFinal && errors.rangoFinal}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="codigoSucursal">Codigo de Sucursal</Label>
                                    <Input
                                        type="text"
                                        name="codigoSucursal"
                                        id="codigoSucursal"
                                        placeholder="Codigo de Sucursal"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.codigoSucursal}
                                    />
                                    <div className="text-danger">
                                    {errors.codigoSucursal && touched.codigoSucursal && errors.codigoSucursal}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="ultimaFactura">Ultima Factura</Label>
                                    <Input
                                        type="text"
                                        name="ultimaFactura"
                                        id="ultimaFactura"
                                        placeholder="Ultima Factura"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.ultimaFactura}
                                    />
                                    <div className="text-danger">
                                    {errors.ultimaFactura && touched.ultimaFactura && errors.ultimaFactura}
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
                    <Button color="secondary" onClick={toggle}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ModalExample;


