import React from "react";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import AgregarPlanillaDialog from "../components/dialogs/AgregarPlanillaDialog";

let backendUrl =
    "https://cryptogymbackend-production.up.railway.app/api/planillas/";

function Planillas() {

    document.title = "Planillas";
    const [planillas, setPlanillas] = useState([]);

    let getPlanillas = async () => {
        let response = await fetch(backendUrl);
        let data = await response.json();
        return data;
    }

    function eliminarPlanilla(id, nombre) {
        let confirmar = window.confirm("¿Eliminar planilla: " + nombre + "?");
        if (confirmar) {
            fetch("https://cryptogymbackend-production.up.railway.app/api/planillas/" + id, {
                method: "DELETE",
            }).then((response) => {
                if (response.ok) {
                    console.log("Planilla eliminada");
                    getPlanillas().then((data) => {
                        setPlanillas(data);
                    });
                } else {
                    console.log("Error al eliminar planilla");
                }
            });
        }
    }

    useEffect(() => {
        getPlanillas().then((data) => setPlanillas(data));
    }, []);
    return (
        <div>
            <h1>Planillas</h1>
            <AgregarPlanillaDialog />
            <Table>
                <thead>
                    <tr>
                        <th>Detalle de Planilla</th>
                        <th>Fecha inicial de pago</th>
                        <th>Fecha final de pago</th>
                    </tr>
                </thead>
                <tbody>
                    {planillas.map((planilla) => (
                        <tr key={planilla.id}>
                            <td>{planilla.detallePlanilla}</td>
                            <td>{planilla.fechaInicialPago}</td>
                            <td>{planilla.fechaFinalPago}</td>
                            <td className="flex items-center text-center">
                                <button className="btn btn-danger" 
                                onClick={() => eliminarPlanilla(planilla.id, planilla.detallePlanilla)}>
                                    Eliminar</button>
                            <AgregarPlanillaDialog planilla={planilla} tipo='editar'/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Planillas;