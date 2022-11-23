import React from "react";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import AgregarEmpleadoDialog from "../components/dialogs/AgregarEmpleadoDialog";

let backendUrl =
  "https://cryptogymbackend-production.up.railway.app/api/empleado/";

function Empleados() {
  const [empleados, setEmpleados] = useState([]);

  let getEmpleados = async () => {
    let response = await fetch(backendUrl);
    let data = await response.json();
    return data;
  };

  useEffect(() => {
    getEmpleados().then((data) => setEmpleados(data));
  }, []);
  return (
    <div>
      <h1>Empleados</h1>
      <AgregarEmpleadoDialog />
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Fecha de nacimiento</th>
            <th>Genero</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.id}</td>
              <td>{empleado.nombres}</td>
              <td>{empleado.apellidos}</td>
              <td>{empleado.correo}</td>
              <td>{empleado.telefono}</td>
              <td>{empleado.fechaNacimiento}</td>
              <td>{empleado.genero}</td>
              <td className="flex items-center text-center">
                <button className="btn btn-danger btn-sm mx-2 w-75">Eliminar</button>
                  <AgregarEmpleadoDialog empleadoId={empleado.id} tipo={'editar'} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Empleados;
