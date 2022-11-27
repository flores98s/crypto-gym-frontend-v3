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
  FormGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
// import Select from "react-select";
import BootstrapSelect from "react-bootstrap-select-dropdown";
import { Formik } from "formik";

let backendUrl =
  "https://cryptogymbackend-production.up.railway.app/api/medidas/";

let clientesUrl =
  "https://cryptogymbackend-production.up.railway.app/api/cliente/";
let getClientes = async () => {
  let response = await fetch(clientesUrl);
  let data = await response.json();
  return data;
};

function ModalExample(props) {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [medidas, setMedidas] = useState();
  const [clientes, setClientes] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    getClientes().then((data) => {
      setClientes(data);
      // console.log(data.map(cliente => cliente.nombres));
    });
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

      <Modal
        isOpen={modal}
        toggle={toggle}
        size="lg"
        style={{ maxWidth: "700px", width: "100%" }}
      >
        <ModalHeader toggle={toggle}>
          {props.tipo === "editar" ? "Editar" : "Agregar"} Medidas
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              fechaMedida: props.medida ? props.medida.fechaMedida : "",
              fotoFrontal: props.medida ? props.medida.fotoFrontal : "",
              fotoLateral: props.medida ? props.medida.fotoLateral : "",
              peso: props.medida ? props.medida.peso : "",
              indiceMasaMuscular: props.medida
                ? props.medida.indiceMasaMuscular
                : "",
              indiceGrasaMuscular: props.medida
                ? props.medida.indiceGrasaMuscular
                : "",
              pecho: props.medida ? props.medida.pecho : "",
              espalda: props.medida ? props.medida.espalda : "",
              brazo: props.medida ? props.medida.brazo : "",
              antebrazo: props.medida ? props.medida.antebrazo : "",
              cadera: props.medida ? props.medida.cadera : "",
              cintura: props.medida ? props.medida.cintura : "",
              pierna: props.medida ? props.medida.pierna : "",
              pantorrilla: props.medida ? props.medida.pantorrilla : "",
              cliente: props.medida ? props.medida.cliente : "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.fechaMedida) {
                errors.fechaMedida = "Requerido";
              }
              //   check if the input is a valid date
              else if (!Date.parse(values.fechaMedida)) {
                errors.fechaMedida = "Fecha inválida";
              }
              //   check if the input is on future
              else if (Date.parse(values.fechaMedida) > Date.now()) {
                errors.fechaMedida =
                  "Fecha invalida, no puede ser en el futuro";
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
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
            handleInputChange={(value) => {
              console.log(value);
              //   setInputValue(value);
            }}
            handleSelectChange={(value) => {
              console.log(value);
              // setSelectedValue(value);
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
              handleInputChange,
              handleSelectChange,
              /* and other goodies */
            }) => (
              <Form onSubmit={handleSubmit}>
                <Container>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="fechaMedida">Fecha de Medida</Label>
                        <Input
                          type="date"
                          name="fechaMedida"
                          id="fechaMedida"
                          placeholder="Fecha de Medida"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.fechaMedida}
                        />
                        <div className="text-danger">
                          {errors.fechaMedida &&
                            touched.fechaMedida &&
                            errors.fechaMedida}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="fotoFrontal">Foto Frontal</Label>
                        <Input
                          type="text"
                          name="fotoFrontal"
                          id="fotoFrontal"
                          placeholder="Foto Frontal"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.fotoFrontal}
                        />
                        <div className="text-danger">
                          {errors.fotoFrontal &&
                            touched.fotoFrontal &&
                            errors.fotoFrontal}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="fotoLateral">Foto Lateral</Label>
                        <Input
                          type="text"
                          name="fotoLateral"
                          id="fotoLateral"
                          placeholder="Foto Lateral"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.fotoLateral}
                        />
                        <div className="text-danger">
                          {errors.fotoLateral &&
                            touched.fotoLateral &&
                            errors.fotoLateral}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="peso">Peso</Label>
                        <Input
                          type="text"
                          name="peso"
                          id="peso"
                          placeholder="Peso"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.peso}
                        />
                        <div className="text-danger">
                          {errors.peso && touched.peso && errors.peso}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="indiceMasaMuscular">
                          Indice de Masa Muscular
                        </Label>
                        <Input
                          type="text"
                          name="indiceMasaMuscular"
                          id="indiceMasaMuscular"
                          placeholder="Indice de Masa Muscular"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.indiceMasaMuscular}
                        />
                        <div className="text-danger">
                          {errors.indiceMasaMuscular &&
                            touched.indiceMasaMuscular &&
                            errors.indiceMasaMuscular}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="indiceGrasaMuscular">%Grasa Muscular</Label>
                        <Input
                          type="text"
                          name="indiceGrasaMuscular"
                          id="indiceGrasaMuscular"
                          placeholder="Indice de Grasa Muscular"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.indiceGrasaMuscular}
                        />
                        <div className="text-danger">
                          {errors.indiceGrasaMuscular &&
                            touched.indiceGrasaMuscular &&
                            errors.indiceGrasaMuscular}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="pecho">Pecho</Label>
                        <Input
                          type="text"
                          name="pecho"
                          id="pecho"
                          placeholder="Pecho"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.pecho}
                        />
                        <div className="text-danger">
                          {errors.pecho && touched.pecho && errors.pecho}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="espalda">Espalda</Label>
                        <Input
                          type="text"
                          name="espalda"
                          id="espalda"
                          placeholder="Espalda"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.espalda}
                        />
                        <div className="text-danger">
                          {errors.espalda && touched.espalda && errors.espalda}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="brazo">Brazo</Label>
                        <Input
                          type="text"
                          name="brazo"
                          id="brazo"
                          placeholder="Brazo"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.brazo}
                        />
                        <div className="text-danger">
                          {errors.brazo && touched.brazo && errors.brazo}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="cintura">Cintura</Label>
                        <Input
                          type="text"
                          name="cintura"
                          id="cintura"
                          placeholder="Cintura"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.cintura}
                        />
                        <div className="text-danger">
                          {errors.cintura && touched.cintura && errors.cintura}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="cadera">Cadera</Label>
                        <Input
                          type="text"
                          name="cadera"
                          id="cadera"
                          placeholder="Cadera"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.cadera}
                        />
                        <div className="text-danger">
                          {errors.cadera && touched.cadera && errors.cadera}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="pantorrilla">Pantorrilla</Label>
                        <Input
                          type="text"
                          name="pantorrilla"
                          id="pantorrilla"
                          placeholder="Pantorrilla"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.pantorrilla}
                        />
                        <div className="text-danger">
                          {errors.pantorrilla &&
                            touched.pantorrilla &&
                            errors.pantorrilla}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="pierna">Pierna</Label>
                        <Input
                          type="text"
                          name="pierna"
                          id="pierna"
                          placeholder="Pierna"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.pierna}
                        />
                        <div className="text-danger">
                          {errors.pierna && touched.pierna && errors.pierna}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="antebrazo">Antebrazo</Label>
                        <Input
                          type="text"
                          name="antebrazo"
                          id="antebrazo"
                          placeholder="Antebrazo"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.antebrazo}
                        />
                        <div className="text-danger">
                          {errors.antebrazo &&
                            touched.antebrazo &&
                            errors.antebrazo}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="Cliente">Cliente</Label>
                        <Input
                          type="select"
                          name="cliente"
                          id="cliente"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.cliente}
                        >
                          <option value="">Seleccione un cliente</option>
                          {clientes.map((cliente) => (
                            <option key={cliente.id} value={cliente.id}>
                              {cliente.nombres}
                            </option>
                          ))}
                        </Input>

                        <div className="text-danger">
                          {errors.cliente && touched.cliente && errors.cliente}
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </Container>

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
