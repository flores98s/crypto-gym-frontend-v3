import React from "react";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import AgregarEmpleadoDialog from "../components/dialogs/AgregarEmpleadoDialog";

let backendUrl =
  "https://cryptogymbackend-production.up.railway.app/api/empleado/";

let backendUrlGenero= 
  "https://cryptogymbackend-production.up.railway.app/api/tipogenero/";

  let backendUrlTipoDocumentoCliente=
  "https://cryptogymbackend-production.up.railway.app/api/tipoDocumentoCliente/";

function Empleados() {
  // set title to Empleados
  document.title = "Empleados";
  const [empleados, setEmpleados] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [tipoDocumentoClientes, setTipoDocumentoClientes] = useState([]);

  let getEmpleados = async () => {
    let response = await fetch(backendUrl);
    let data = await response.json();
    return data;
  };
    let getGenero = async () => {
      let response = await fetch(backendUrlGenero);
      let data = await response.json();
      return data;
  };      
  let getTipoDocumentoCliente = async () => {
    let response = await fetch(backendUrlTipoDocumentoCliente);
    let data = await response.json();
    return data;
};   

  function eliminarEmpleado(id) {
    let confirmDelete = window.confirm("¿Está seguro de eliminar este empleado?");

    if (confirmDelete) {
      fetch(backendUrl + id, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          console.log("Empleado eliminado");
          getEmpleados().then((data) => {
            setEmpleados(data);
          });
        }
        else{
          console.log("Error al eliminar empleado");
        }
      });

  }
}
  useEffect(() => {
    getEmpleados().then((data) => setEmpleados(data));
    getGenero().then((data) => setGeneros(data));
    getTipoDocumentoCliente().then((data) => setTipoDocumentoClientes(data));
  }, []);
  return (
    <div>
      <h1>Empleados</h1>
      <AgregarEmpleadoDialog generos = {generos} tipoDocumentoClientes = {tipoDocumentoClientes}/>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Teléfono</th>
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
                <button className="btn btn-danger btn-sm mx-2 w-75"
                  onClick={() => eliminarEmpleado(empleado.id)}
                >Eliminar</button>
                  <AgregarEmpleadoDialog empleado={empleado} tipo={'editar'} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Empleados;
