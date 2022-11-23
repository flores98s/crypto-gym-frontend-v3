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
    FormGroup
} from "reactstrap";
import { Formik } from "formik";


let backendUrl =
    "https://cryptogymbackend-production.up.railway.app/api/medidas/";



function ModalExample(props) {
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
    const [medidas, setMedidas] = useState();
        


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
                <ModalHeader toggle={toggle}>{props.tipo === "editar" ? "Editar" : "Agregar"} Medidas</ModalHeader>
                <ModalBody>
                    <Formik
                    
                        initialValues={{
                            "fechaMedida": props.medida ? props.medida.fechaMedida : "",
                            "fotoFrontal": props.medida ? props.medida.fotoFrontal : "",
                            "fotoLateral": props.medida ? props.medida.fotoLateral : "",
                            "peso": props.medida ? props.medida.peso : "",
                            "indiceMasaMuscular": props.medida ? props.medida.indiceMasaMuscular : "",
                            "indiceGrasaMuscular": props.medida ? props.medida.indiceGrasaMuscular : "",
                            "pecho": props.medida ? props.medida.pecho : "",
                            "espalda": props.medida ? props.medida.espalda : "",
                            "brazo": props.medida ? props.medida.brazo : "",
                            "antebrazo": props.medida ? props.medida.antebrazo : "",
                            "cadera": props.medida ? props.medida.cadera : "",
                            "cintura": props.medida ? props.medida.cintura : "",
                            "pierna": props.medida ? props.medida.pierna : "",
                            "pantorrilla": props.medida ? props.medida.pantorrilla : "",
                            "cliente": props.medida ? props.medida.cliente : "", 
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.fechaMedida) {
                                errors.fechaMedida = "Requerido";
                            }
                            if (!values.fotoFrontal) {
                                errors.fotoFrontal = "Requerido";
                            }
                            if (!values.fotoLateral) {
                                errors.fotoLateral = "Requerido";
                            }
                            if (!values.peso) {
                                errors.peso = "Requerido";
                            }
                            if (!values.indiceMasaMuscular) {
                                errors.indiceMasaMuscular = "Requerido";
                            }
                            if (!values.indiceGrasaMuscular) {
                                errors.indiceGrasaMuscular = "Requerido";
                            }
                            if (!values.pecho) {
                                errors.pecho = "Requerido";
                            }
                            if (!values.espalda) {
                                errors.espalda = "Requerido";
                            }
                            if (!values.brazo) {
                                errors.brazo = "Requerido";
                            }
                            if (!values.antebrazo) {
                                errors.antebrazo = "Requerido";
                            }
                            if (!values.cadera) {
                                errors.cadera = "Requerido";
                            }
                            if (!values.cintura) {
                                errors.cintura = "Requerido";
                            }
                            if (!values.pierna) {
                                errors.pierna = "Requerido";
                            }
                            if (!values.pantorrilla) {
                                errors.pantorrilla = "Requerido";
                            }
                            if (!values.cliente) {
                                errors.cliente = "Requerido";
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(()  => {
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
                                    <Label for="Fecha de medida">Fecha de Medida</Label>
                                    <Input
                                        type="date"
                                        name="fechaMedida"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.fechaMedida}
                                    />
                                    <div>
                                        {errors.fechaMedida && touched.fechaMedida && errors.fechaMedida}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                <Label for="Foto frontal">Foto Frontal</Label>
                                    <Input
                                        type="text"
                                        name="fotoFrontal"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.fotoFrontal}
                                    />
                                    <div>
                                        {errors.fotoFrontal &&
                                        touched.fotoFrontal &&
                                        errors.fotoFrontal}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                <Label for="Foto lateral">Foto Lateral</Label>
                                    <Input
                                        type="text"
                                        name="fotoLateral"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.fotoLateral}
                                    />
                                    <div>
                                        {errors.fotoLateral &&
                                        touched.fotoLateral &&
                                        errors.fotoLateral}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                <Label for="Peso">Peso</Label>
                                    <Input
                                        type="text"
                                        name="peso"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.peso}
                                    />
                                    <div>
                                        {errors.peso &&
                                        touched.peso &&
                                        errors.peso}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                <Label for="Indice de masa muscular">Indice de masa muscular</Label>
                                    <Input
                                        type="text"
                                        name="indiceMasaMuscular"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.indiceMasaMuscular}
                                    />
                                    <div>
                                        {errors.indiceMasaMuscular &&
                                        touched.indiceMasaMuscular &&
                                        errors.indiceMasaMuscular}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                <Label for="Indice de grasa muscular">Indice de grasa muscular</Label>
                                    <Input
                                        type="text"
                                        name="indiceGrasaMuscular"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.indiceGrasaMuscular}
                                    />
                                    <div>
                                        {errors.indiceGrasaMuscular &&
                                        touched.indiceGrasaMuscular &&
                                        errors.indiceGrasaMuscular}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                <Label for="Pecho">Pecho</Label>
                                    <Input
                                        type="text"
                                        name="pecho"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.pecho}
                                    /> 
                                    <div>
                                        {errors.pecho &&
                                        touched.pecho &&
                                        errors.pecho}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                <Label for="Espalda">Espalda</Label>
                                    <Input
                                        type="text"
                                        name="espalda"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.espalda}
                                    />
                                    <div>
                                        {errors.espalda &&
                                        touched.espalda &&
                                        errors.espalda}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                <Label for="Brazo">Brazo</Label>
                                    <Input 
                                        type="text"
                                        name="brazo"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.brazo}
                                    />
                                    <div>
                                        {errors.brazo &&
                                        touched.brazo &&
                                        errors.brazo}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                <Label for="Antebrazo">Antebrazo</Label>
                                    <Input
                                        type="text"
                                        name="antebrazo"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.antebrazo}
                                    />
                                    <div>
                                        {errors.antebrazo &&
                                        touched.antebrazo &&
                                        errors.antebrazo}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                <Label for="Cintura">Cintura</Label>
                                    <Input
                                        type="text"
                                        name="cintura"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.cintura}
                                    />
                                    <div>
                                        {errors.cintura &&
                                        touched.cintura &&
                                        errors.cintura}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                <Label for="Cadera">Cadera</Label>
                                    <Input
                                        type="text"
                                        name="cadera"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.cadera}
                                    />
                                    <div>
                                        {errors.cadera &&
                                        touched.cadera &&
                                        errors.cadera}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                <Label for="Muslo">Muslo</Label>
                                    <Input
                                        type="text"
                                        name="muslo"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.muslo}
                                    />  
                                    <div>
                                        {errors.muslo &&
                                        touched.muslo &&
                                        errors.muslo}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                <Label for="Pantorrilla">Pantorrilla</Label>
                                    <Input
                                        type="text"
                                        name="pantorrilla"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.pantorrilla}
                                    />
                                    <div>
                                        {errors.pantorrilla &&
                                        touched.pantorrilla &&
                                        errors.pantorrilla}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                <Label for="Cliente">Cliente</Label>
                                    <Input
                                        type="text"
                                        name="cliente"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.cliente}
                                    />
                                    <div>
                                        {errors.cliente &&
                                        touched.cliente &&
                                        errors.cliente}
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
};

export default ModalExample;