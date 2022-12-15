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
  Table,
  Row,
  Col,
} from "reactstrap";
import { Formik } from "formik";
import { FormGroup } from "react-bootstrap";
import Cookies from "universal-cookie";
import axios from "axios";

let backendUrl = "https://cryptogymbackend-production.up.railway.app/api/";
let cookies = new Cookies();
let idCliente = cookies.get("id");


// Modificar estas funciones -------------------------------------------------------
async function getRutinas() {
  let response = await axios.get(
    backendUrl + "getRutinaByCliente/" + idCliente
  );
  return response.data;
}

async function getAsignacionRutinas() {
  let response = await axios.get(backendUrl + "getAsignacionRutina");
  return response.data;
}

async function borrarRutina(id) {
  let response = await axios.delete(backendUrl + "deleteRutina/" + id);
  return response.data;
}

// ---------------------------------------------------------------------------------

export default function RutinasCliente() {
  const [isLoadingRutinas, setIsLoadingRutinas] = useState(true);
  const [isLoadingAsignacionRutinas, setIsLoadingAsignacionRutinas] = useState(true);
  const [rutinas, setRutinas] = useState();

  useEffect(() => {
    // Cambiar los nombres de las funciones ----------------------------------------
    getRutinas().then((data) => {
      console.log(data);
      if (data.data === "No se encontró el id") {
        setRutinas([]);
        setIsLoadingRutinas(false);
      } else {
        setRutinas(data.data);
        setIsLoadingRutinas(false);
        console.log(rutinas);
      }
    //   ---------------------------------------------------------------------------
    });
  }, []);

  if (isLoadingRutinas) {
    return <h2>Cargando...</h2>;
  }
  return (
    <div>
      <h1>Rutinas</h1>

      <h2>Agregar Rutina</h2>
      <Formik
        initialValues={{
            // Modificar los nombres de los campos ------------------------------------
          nombre: "",
          tipoRutina: "",
          asignacionRutina: "",
          cliente: idCliente,
            // ---------------------------------------------------------------------------
        }}
        validate={(values) => {
          const errors = {};
        //   Modificar los nombres de los campos ------------------------------------
          if (!values.nombre) {
            errors.nombre = "Requerido";
          } else if (values.nombre.length < 3) {
            errors.nombre = "El nombre debe tener al menos 3 caracteres";
          }
        //   verificar que no hay dos espacios seguidos
        else if (values.nombre.includes("  ")) {
            errors.nombre = "El nombre no puede tener dos o mas espacios seguidos";
            }

          if (!values.tipoRutina) {
            errors.tipoRutina = "Requerido";
          }
          else if (values.nombre.includes("  ")) {
            errors.tipoRutina = "El tipo de rutina no puede tener dos o mas espacios seguidos";
            } 

          if (!values.asignacionRutina) {
            errors.asignacionRutina = "Requerido";
          }
        //   ---------------------------------------------------------------------------
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            // cambiar solo el nombre de la ruta ------------------------------------
          fetch(backendUrl + "rutina/", {
            // ---------------------------------------------------------------------------
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            //   cambiar nombre de la funcion ------------------------------------
              getRutinas().then((data) => {
            // ---------------------------------------------------------------------------

                console.log(data);
                if (data.data === "No se encontró el id") {
                    // cambiar nombre de la funcion ------------------------------------
                  setRutinas([]);
                  setIsLoadingRutinas(false);
                    // ---------------------------------------------------------------------------
                } else {
                  setRutinas(data.data);
                  setIsLoadingRutinas(false);
                  console.log(rutinas);
                }
              });
            })
            .catch((error) => {
              console.error("Error:", error);
            });
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
            // Cambiar los campos del formulario ------------------------------------
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="nombre">Nombre</Label>
              <Input
                type="text"
                name="nombre"
                id="nombre"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nombre}
              />
              <div className="text-danger">
                {errors.nombre && touched.nombre && errors.nombre}
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="tipoRutina">Tipo de Rutina</Label>
              <Input
                type="text"
                name="tipoRutina"
                id="tipoRutina"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tipoRutina}
              />

              <div className="text-danger">
                {errors.tipoRutina && touched.tipoRutina && errors.tipoRutina}
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="asignacionRutina">Asignación de Rutina</Label>
              <Input
                type="select"
                name="asignacionRutina"
                id="asignacionRutina"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.asignacionRutina}
              >
                <option value="">Seleccione una opción</option>
                <option value="1">Rutina de 3 días</option>
                <option value="2">Rutina de 4 días</option>
                <option value="3">Rutina de 5 días</option>
                <option value="4">Rutina de 6 días</option>
                <option value="5">Rutina de 7 días</option>
              </Input>
              <div className="text-danger">
                {errors.asignacionRutina &&
                  touched.asignacionRutina &&
                  errors.asignacionRutina}
              </div>
            </FormGroup>
            <Button className="mt-2" type="submit" disabled={isSubmitting}>
              Agregar Rutina
            </Button>
          </Form>
            // ---------------------------------------------------------------------------
        )}
        
      </Formik>
      

      {rutinas ? (
        <Row className="mt-2">
          <Col>
            <h2>Mis Rutinas</h2>
            {/* Cambiar los campos de la tabla */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo de Rutina</th>
                  <th>Asignación de Rutina</th>
                </tr>
              </thead>
              <tbody>
                {rutinas.map((rutina) => (
                  <tr key={rutina.id}>
                    <td>{rutina.nombre}</td>
                    <td>{rutina.tipoRutina}</td>
                    <td>{rutina.asignacionRutina}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      ) : (
        <Col>
          <h2>No hay rutinas</h2>
        </Col>
      )}
    </div>
  );
}
