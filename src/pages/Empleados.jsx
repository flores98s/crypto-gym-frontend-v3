import React from "react";
import { useState, useEffect } from "react";
import {Table} from 'react-bootstrap'

let backendUrl =
  "https://cryptogymbackend-production.up.railway.app/api/empleado/";

function Empleados() {
  const [empleados, setEmpleados] = useState([]);

  let getEmpleados = async () => {
    let response = await fetch(backendUrl);
    let data = await response.json();
    console.log(data);
    return data;
  };

  useEffect(() => {
    getEmpleados().then((data) => setEmpleados(data));
  }, []);
  return (
    <div>
      <h1>Empleados</h1>
      <Table>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr id={empleado.id}>
              <td>{empleado.nombres}</td>
              <td>{empleado.apellidos}</td>
              <td>{empleado.correo}</td>
                <td>
                    <button className="btn btn-danger mx-2">Eliminar</button>
                    <button className="btn btn-info">Actualizar</button>
                </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Empleados;
