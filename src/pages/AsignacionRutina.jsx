import React from "react";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import AgregarAsignacionRutinaDialog from "../components/dialogs/AgregarAsignacionRutinaDialog";
import Exportar from "../components/Exportar";

let backendUrl =
    "https://cryptogymbackend-production.up.railway.app/api/asignacionrutina/";

function AsignacionRutinas() {

    document.title = "Asignación de Rutinas";
    const [asignaciones, setAsignaciones] = useState([]);

    let getAsignaciones = async () => {
        let response = await fetch(backendUrl);
        let data = await response.json();
        return data;
    };
    
    function eliminarAsignacion(id, nombre) {
        let confirmar = window.confirm("¿Eliminar asignación: " + nombre + "?");
        if (confirmar) {
            fetch("https://cryptogymbackend-production.up.railway.app/api/asignacionrutina/" + id, {
                method: "DELETE",
            }).then((response) => {
                if (response.ok) {
                    console.log("Asignación eliminada");
                    getAsignaciones().then((data) => {
                        setAsignaciones(data);
                    });
                } else {
                    console.log("Error al eliminar asignación");
                }
            });
        }
    }

    useEffect(() => {
        getAsignaciones().then((data) => setAsignaciones(data));
    }, []);
    return (
        <div>
            <h1>Asignación de Rutinas</h1>
            <AgregarAsignacionRutinaDialog />
            <Exportar nombreTabla="asignaciones" />
            <Table>
                <thead>
                    <tr>
                        <th>Series</th>
                        <th>Repeticiones</th>
                        <th>Descanso</th>
                        <th>Capacidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {asignaciones.map((asignacion) => (
                        <tr key={asignacion.id}>
                            <td>{asignacion.series}</td>
                            <td>{asignacion.repeticiones}</td>
                            <td>{asignacion.descanso}</td>
                            <td>{asignacion.capacidad}</td>
                            <td className="flex items-center text-center">
                                <button className="btn btn-danger btn-sm mx-2 w-75"
                                    onClick={() => eliminarAsignacion(asignacion._id)}
                                    >Eliminar</button>
                                    <AgregarAsignacionRutinaDialog asignacion={asignacion} tipo={'editar'}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default AsignacionRutinas;