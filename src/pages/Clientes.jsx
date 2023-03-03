import React from "react";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import AgregarClienteDialog from "../components/dialogs/AgregarClienteDialog";
import Exportar from "../components/Exportar";
let backendUrl =
  "https://cryptogymbackend-production.up.railway.app/api/cliente/";

function Clientes() {
  // set title to Clientes
  document.title = "Clientes";
  const [clientes, setClientes] = useState([]);

  let getClientes = async () => {
    let response = await fetch(backendUrl);
    let data = await response.json();
    console.log(data);
    return data;
  };

  function eliminarCliente(nombres, id) {
    alert("Eliminar cliente: " + nombres);
    fetch(backendUrl + id, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        console.log("Cliente eliminado");
        getClientes().then((data) => {
          setClientes(data);
        });
      }
    });
  }

  useEffect(() => {
    getClientes().then((data) => setClientes(data));
  }, []);
  return (
    <div>
      <h1>Clientes</h1>
      <AgregarClienteDialog />
      <Exportar nombreTabla="clientes" />
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
              <td className="flex items-center text-center">
                <button
                  className="btn btn-danger btn-sm mx-2 w-50"
                  onClick={() =>
                    eliminarCliente(
                      cliente.nombres + " " + cliente.apellidos,
                      cliente.id
                    )
                  }
                >
                  Eliminar
                </button>
                <AgregarClienteDialog cliente={cliente} tipo={"editar"} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Clientes;
