import React, {useState, useEffect} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Label,
    Input,
} from 'reactstrap';
import {Formik} from 'formik';
import {FormGroup} from 'react-bootstrap';

let backendUrl = 
    "https://cryptogymbackend-production.up.railway.app/api/asignacionrutina/";

function ModalExample(props) {
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
    const [AsignacionRutina, setAsignacionRutina] = useState();
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
                    {props.tipo === "editar" ? "Editar" : "Agregar"} AsignacionRutina
                </ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            series: props.AsignacionRutina ? props.AsignacionRutina.idEmpleado : "",
                            repeticiones: props.AsignacionRutina ? props.AsignacionRutina.idRutina : "",
                            descanso: props.AsignacionRutina ? props.AsignacionRutina.fechaInicio : "",
                            capacidad: props.AsignacionRutina ? props.AsignacionRutina.fechaFin : "",
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.series) {
                                errors.series = "Requerido";
                            } else if (values.series.length < 3 || values.series.length > 50) {
                                errors.series = "Debe tener entre 3 y 50 caracteres";
                            }
                            if (!values.repeticiones) {
                                errors.repeticiones = "Requerido";
                            } else if (values.repeticiones.length < 3 || values.repeticiones.length > 50) {
                                errors.repeticiones = "Debe tener entre 3 y 50 caracteres";
                            }
                            if (!values.descanso) {
                                errors.descanso = "Requerido";
                            } else if (values.descanso.length < 3 || values.descanso.length > 50) {
                                errors.descanso = "Debe tener entre 3 y 50 caracteres";
                            }
                            if (!values.capacidad) {
                                errors.capacidad = "Requerido";
                            } else if (values.capacidad.length < 3 || values.capacidad.length > 50) {
                                errors.capacidad = "Debe tener entre 3 y 50 caracteres";
                            }
                            return errors;
                        }}
                        onSubmit={(values, {setSubmitting}) => {
                            console.log(values);
                            if (props.tipo === "editar") {
                                fetch(backendUrl + props.AsignacionRutina.idAsignacionRutina, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(values),
                                })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        console.log(data);
                                        setMessages({
                                            ok: true,
                                            message: "AsignacionRutina editado correctamente",
                                        })

                                        setTimeout(() => {
                                            setMessages({});
                                            toggle();
                                        }, 2000);
                                    })
                            } else {
                                fetch(
                                  "https://cryptogymbackend-production.up.railway.app/api/asignacionrutina/",
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
                                          message: "rutina agregada con éxito",
                                        });
                                        // wait 2 seconds and close modal
                                        setTimeout(() => {
                                          toggle();
                                        }, 2000);
                                        setMessages({});
                                      })
                                      .catch((error) => {
                                        console.error("Error:", error);
                                        setMessages({
                                          error: true,
                                          message: "Error al agregar la rutina",
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
                                    <Label for="series">Series</Label> 
                                    <Input
                                        type="text"
                                        name="series"
                                        id="series"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.series}
                                    />
                                    <div className="text-danger">
                                        {errors.series && touched.series && errors.series}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="repeticiones">Repeticiones</Label>
                                    <Input
                                        type="text"
                                        name="repeticiones"
                                        id="repeticiones"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.repeticiones}
                                    />
                                    <div className="text-danger">
                                        {errors.repeticiones && touched.repeticiones && errors.repeticiones}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="descanso">Descanso</Label>
                                    <Input
                                        type="text"
                                        name="descanso"
                                        id="descanso"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.descanso}
                                    />
                                    <div className="text-danger">
                                        {errors.descanso && touched.descanso && errors.descanso}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="capacidad">Capacidad</Label>
                                    <Input
                                        type="text"
                                        name="capacidad"
                                        id="capacidad"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.capacidad}
                                    />
                                    <div className="text-danger">
                                        {errors.capacidad && touched.capacidad && errors.capacidad}
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