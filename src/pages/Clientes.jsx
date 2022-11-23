import React from 'react'
import { useState, useEffect } from "react";
import {Table} from 'react-bootstrap'
import AgregarClienteDialog from "../components/dialogs/AgregarClienteDialog";

let backendUrl = 
  "https://cryptogymbackend-production.up.railway.app/api/cliente/";

function Clientes() {
  // set title to Clientes
  document.title = 'Clientes'
  const [clientes, setClientes] = useState([]);

  let getClientes = async () => {
    let response = await fetch(backendUrl);
    let data = await response.json();
    console.log(data);
    return data;
  }

  useEffect(() => {
    getClientes().then((data) => setClientes(data));
  }, []);
  return (
    <div>
      <h1>Clientes</h1>
      <AgregarClienteDialog/>
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
          {clientes.map((cliente) => (
            <tr id={cliente.id}>
              <td>{cliente.nombres}</td>
              <td>{cliente.apellidos}</td>
              <td>{cliente.correo}</td>
                <td> 
                    <button className="btn btn-danger mx-2">Eliminar</button>
                    <AgregarClienteDialog cliente={cliente} tipo={"editar"}/>
                </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Clientes;