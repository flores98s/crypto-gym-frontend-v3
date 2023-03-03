import React from "react";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import AgregarDetallePlanillaDialog from "../components/dialogs/AgregarDetallePlanillaDialog";
import Exportar from "../components/Exportar";

let backendUrl =
    "https://cryptogymbackend-production.up.railway.app/api/detalleplanilla/";

function DetallePlanilla() {

    document.title = "Detalle Planilla";
    const [detalleplanilla, setDetallePlanilla] = useState([]);

    let getDetallePlanilla = async () => {
        let response = await fetch(backendUrl);
        let data = await response.json();
        return data;
    }

    function eliminarDetallePlanilla(id, nombre) {
        let confirmar = window.confirm("¿Eliminar detalle planilla: " + nombre + "?");
        if (confirmar) {
            fetch("https://cryptogymbackend-production.up.railway.app/api/detalleplanilla/" + id, {
                method: "DELETE",
            }).then((response) => {
                if (response.ok) {
                    console.log("Detalle planilla eliminada");
                    getDetallePlanilla().then((data) => {
                        setDetallePlanilla(data);
                    });
                } else {
                    console.log("Error al eliminar detalle planilla");
                }
            });
        }
    }

    useEffect(() => {
        getDetallePlanilla().then((data) => setDetallePlanilla(data));
    }, []);
    return (
        <div>
            <h1>Detalle Planilla</h1>
            <AgregarDetallePlanillaDialog />
            <Exportar nombreTabla="detalleplanillas" />
            <Table>
                <thead>
                    <tr>
                        <th>Sueldo</th>
                        <th>Deducciones</th>
                        <th>Bonificación</th>
                        <th>Detalle</th>
                    </tr>
                </thead>
                <tbody>
                    {detalleplanilla.map((detalleplanilla) => (
                        <tr key={detalleplanilla.id}>
                            <td>{detalleplanilla.sueldo}</td>
                            <td>{detalleplanilla.deducciones}</td>
                            <td>{detalleplanilla.bonificacion}</td>
                            <td>{detalleplanilla.detalle}</td>
                            <td className="flex items-center text-center">
                                <button className="btn btn-danger" 
                                onClick={() => eliminarDetallePlanilla(detalleplanilla.id, detalleplanilla.nombre)}>
                                    Eliminar</button>
                                    <AgregarDetallePlanillaDialog detalleplanilla={detalleplanilla} tipo={'editar'} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default DetallePlanilla;

