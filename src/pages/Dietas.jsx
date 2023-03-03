import React from "react";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import AgregarDietaDialog from "../components/dialogs/AgregarDietaDialog";
import Exportar from "../components/Exportar";

let backendUrl =
    "http://cryptogymbackend-production.up.railway.app/api/dieta/";

    function Dietas() {
    // set title to Empleados
    document.title = "Dieta";
    const [dietas, setDietas] = useState([]);

    let getDietas = async () => {
        let response = await fetch(backendUrl);
        let data = await response.json();
        return data;
    };

    function eliminarDieta(id, nombre) {
        let confirmDelete = window.confirm(
            "¿Eliminar dieta: " + nombre + "?"
            );
        if (confirmDelete) {
            fetch(backendUrl + id, {
                method: "DELETE",
            }).then((response) => {
                if (response.ok) {
                    console.log("Dieta eliminada");
                    getDietas().then((data) => {
                        setDietas(data);
                    });
                } else {
                    console.log("Error al eliminar dieta");
                }
            });
        }
    }

    useEffect(() => {
        getDietas().then((data) => setDietas(data));
    }, []);
    return (
        <div>
            <h1>Dietas</h1>
            <AgregarDietaDialog />
            <Exportar nombreTabla="dietas" />
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Asignación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {dietas.map((dieta) => (
                        <tr key={dieta.id}>
                            <td>{dieta.id}</td>
                            <td>{dieta.nombre}</td>
                            <td>{dieta.asignacionDieta}</td>
                            <td className="flex items-center text-center">
                                <button 
                                    className="btn btn-danger btn-sm mx-2 w-75"
                                    onClick={() => eliminarDieta(dieta.id, dieta.nombre)}
                                    >
                                    Eliminar
                                    </button>
                                <AgregarDietaDialog 
                                dieta={dieta} 
                                tipo={"editar"} 
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
export default Dietas;