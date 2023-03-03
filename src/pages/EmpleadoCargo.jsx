import React from "react";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import AgregarEmpleadoCargoDialog from "../components/dialogs/EmpleadoCargoDialog";
import Exportar from "../components/Exportar";

let backendUrl =
    "https://cryptogymbackend-production.up.railway.app/api/empleadocargo/";

function EmpleadoCargo() {

    document.title = "Empleados";
    const [empleados, setEmpleados] = useState([]);

    let getEmpleados = async () => {
        let response = await fetch(backendUrl);
        let data = await response.json();
        return data;
    }

    function eliminarEmpleado(id, nombre) {
        let confirmar = window.confirm("¿Eliminar empleado: " + nombre + "?");
        if (confirmar) {
            fetch("https://cryptogymbackend-production.up.railway.app/api/empleadocargo/" + id, {
                method: "DELETE",
            }).then((response) => {
                if (response.ok) {
                    console.log("Empleado eliminado");
                    getEmpleados().then((data) => {
                        setEmpleados(data);
                    });
                } else {
                    console.log("Error al eliminar empleado");
                }
            });
        }
    }

    useEffect(() => {
        getEmpleados().then((data) => setEmpleados(data));
    }, []);
    return (
        <div>
            <h1>Empleados Cargo</h1>
            <AgregarEmpleadoCargoDialog />
            <Exportar nombreTabla="empleadoscargo" />
            <Table>
                <thead>
                    <tr>
                        <th>Cargo</th>
                        <th>Fecha inicio</th>
                        <th>Fecha Final</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map((empleado) => (
                        <tr key={empleados.id}>
                            <td>{empleado.cargo}</td>
                            <td>{empleado.fechaInicio}</td>
                            <td>{empleado.fechaFinal}</td>
                            <td className="flex items-center text-center">
                                <button className="btn btn-danger" 
                                onClick={() => eliminarEmpleado(empleado.id, empleado.cargo)}>
                                    Eliminar</button>
                                    <AgregarEmpleadoCargoDialog EmpleadoCargo={empleado} tipo={'editar'}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default EmpleadoCargo;