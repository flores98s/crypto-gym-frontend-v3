import React from "react";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import AgregarTipoMembresiaDialog from "../components/dialogs/AgregarTipoMembresiaDialog";

let backendUrl =
    "https://cryptogymbackend-production.up.railway.app/api/tiposmembresia/";

function TiposMembresias() {
    // set title to Empleados
    document.title = "Membresías";
    const [membresias, setMembresias] = useState([]);

    let getMembresias = async () => {
        let response = await fetch(backendUrl);
        let data = await response.json();
        return data;
    };

    function eliminarMembresia(id, nombre) {
        alert("Eliminar membresía: " + nombre);
        console.log(backendUrl + id);
        fetch("https://cryptogymbackend-production.up.railway.app/api/tiposmembresias/" + id, {
            method: "DELETE",
        }).then((response) => {
            if (response.ok) {
                console.log("Membresía eliminada");
                getMembresias().then((data) => {
                    setMembresias(data);
                });
            }
            else {
                console.log("Error al eliminar membresía");
                // TODO: mostrar mensaje de error
                console.log(response);
            }
        });
    }

    useEffect(() => {
        getMembresias().then((data) => setMembresias(data));
    }, []);
    return (
        <div>
            <h1>Tipos de Membresías</h1>
            <AgregarTipoMembresiaDialog />
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {membresias.map((membresia) => (
                        <tr key={membresias.id}>
                            <td>{membresia.nombreMembresia}</td>
                            <td>{membresia.precio}</td>
                            <td>{membresia.descripcion}</td>
                            <td className="flex items-center text-center">
                                <button className="btn btn-danger btn-sm mx-2 w-75"
                                    onClick={() => eliminarMembresia(membresia.id, membresia.nombreMembresia)}>
                                    Eliminar</button>
                                <AgregarTipoMembresiaDialog membresia={membresia} tipo={'editar'} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TiposMembresias;
