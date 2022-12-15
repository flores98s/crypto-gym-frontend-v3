import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";
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
} from "reactstrap";
import Cookies from "universal-cookie";

async function loginUser(credentials) {
  return fetch(
    "https://cryptogymbackend-production.up.railway.app/api/loginCliente/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  ).then((data) => data.json());
}

function Login() {
  const [intentos, setIntentos] = useState(0);
  const [backendErrors, setBackendErrors] = useState([]);
  const [data, setData] = useState([]);
  const cookies = new Cookies();

  return (
    <div className="loginDiv bg-gray-900">
      <Container className="border rounded">
        <Row className="my-5">
          <Col>
            <div className="h-100 flex items-center justify-center text-white">
              <h1 className="">Crypto Gym</h1>
            </div>
          </Col>
          <Col>
            <div className="h-100 flex items-start justify-center w-100">
              <Formik
                initialValues={{ correo: "", clave: "" }}
                validate={(values) => {
                  const errors = {};
                  if (!values.correo) {
                    errors.correo = "Requerido";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.correo
                    )
                  ) {
                    errors.correo = "Correo Invalido";
                  }
                  if (!values.clave) {
                    errors.clave = "Requerido";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  loginUser(values).then((data) => {
                    console.log(typeof data);
                    console.log(data);
                    // alert(
                    //   JSON.stringify(data, null, 2)
                    // )
                    if (data[0]){
                      cookies.set("auth", data[0].auth, { path: "/" });
                      cookies.set("id", data[0].data.id, {path: "/"});
                      window.location.href = "/";

                    }
                    else{
                      console.log("Login fallido");
                      setBackendErrors(data.error);
                    }
                    
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
                  handleInputChange,
                  handleSelectChange,
                }) => (
                  <Form className="text-white" onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="correo">Correo</Label>
                      <Field
                        type="email"
                        name="correo"
                        placeholder="Correo"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="correo"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="clave">Clave</Label>
                      <Field
                        type="password"
                        name="clave"
                        placeholder="Clave"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="clave"
                        component="div"
                        className="text-danger"
                      />
                      <div className="text-danger">{backendErrors}</div>
                    </FormGroup>
                    <FormGroup className="mt-2">
                      <Button type="submit">Ingresar</Button>
                    </FormGroup>
                    <FormGroup className="mt-2">
                      {/* <Label>
                        Ingresar como <a href="/loginAdmin">Administrador</a>
                      </Label> */}
                    </FormGroup>
                  </Form>
                )}
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
