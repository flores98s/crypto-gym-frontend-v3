import React from "react";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import AgregarDietaDialog from "../components/dialogs/AgregarDietaDialog";

let backendUrl =
    "http://cryptogymbackend-production.up.railway.app/api/dieta/";

 export default function Dieta() {
    // set title to Empleados
    document.title = "Dieta";
    const [dietas, setDietas] = useState([]);

    let getDietas = async () => {
        let response = await fetch(backendUrl);
        let data = await response.json();
        return data;
    };

    function eliminarDieta(id, nombre) {
        let confirmar = window.confirm("¿Eliminar dieta: " + nombre + "?");
        if (confirmar) {
            fetch("http://cryptogymbackend-production.up.railway.app/api/dieta/" + id, {
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
            <h1>Tipos de Membresías</h1>
            <AgregarDietaDialog />
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {dietas.map((dieta) => (
                        <tr key={dietas.id}>
                            <td>{dieta.nombreDieta}</td>
                            <td>{dieta.asignacionDieta}</td>
                            <td className="flex items-center text-center">
                                <button className="btn btn-danger btn-sm mx-2 w-75"
                                    onClick={() => eliminarDieta(dieta.id, dieta.nombreDieta)}>
                                    Eliminar</button>
                                <AgregarDietaDialog dieta={dieta} tipo={'editar'} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

