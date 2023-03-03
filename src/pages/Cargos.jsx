import React from "react";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import AgregarCargoDialog from "../components/dialogs/AgregarCargoDialog";
import Exportar from "../components/Exportar";

let backendUrl =
    "https://cryptogymbackend-production.up.railway.app/api/cargo/";

function Cargos() {
    // set title to Cargos
    document.title = "Cargos";
    const [cargos, setCargos] = useState([]);

    let getCargos = async () => {
        let response = await fetch(backendUrl);
        let data = await response.json();
        return data;
    };

    function eliminarCargo(id, nombreCargo) {
        let confirmar = window.confirm(
            "¿Está seguro que desea eliminar el cargo " + nombreCargo + "?"
        );
        if (confirmar) {    
            fetch(backendUrl + id, {
                method: "DELETE",
            })
                .then((response) => response.json())
                .then((data) => {
                    getCargos().then((data) => {
                        setCargos(data);
                    });
                });
        }
    }

    useEffect(() => {
        getCargos().then((data) => setCargos(data));
    }, []);
    return (
        <div>
            <h1>Cargos</h1>
            <AgregarCargoDialog />
            <Exportar nombreTabla="cargos" />
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Salario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cargos.map((cargo) => (
                        <tr key={cargo.id}>
                            <td>{cargo.id}</td>
                            <td>{cargo.nombreCargo}</td>
                            <td>{cargo.salario}</td>
                            <td className="flex items-center text-center">
                                <button className="btn btn-danger btn-sm mx-2 w-75"
                                    onClick={() => eliminarCargo(cargo.id, cargo.nombreCargo)}
                                >Eliminar</button>
                                 <AgregarCargoDialog cargo={cargo} tipo="editar" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Cargos;