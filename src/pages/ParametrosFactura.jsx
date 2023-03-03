import React from "react";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import AgregarParametroFacturaDialog from "../components/dialogs/AgregarParametrosFacturaDialog";
import Exportar from "../components/Exportar";

let backendUrl =
    "https://cryptogymbackend-production.up.railway.app/api/parametrosfactura/";

function ParametrosFactura() {
    
    document.title = "Parámetros de Factura";
    const [parametros, setParametros] = useState([]);

    let getParametros = async () => {
        let response = await fetch(backendUrl);
        let data = await response.json();
        return data;
    };

    function eliminarParametro(id, nombre) {
        let confirmar = window.confirm("¿Eliminar parámetro: " + nombre + "?");
        if (confirmar) {
            fetch("https://cryptogymbackend-production.up.railway.app/api/parametrosfactura/" + id, {
                method: "DELETE",
            }).then((response) => {
                if (response.ok) {
                    console.log("Parámetro eliminado");
                    getParametros().then((data) => {
                        setParametros(data);
                    });
                } else {
                    console.log("Error al eliminar parámetro");
                }
            });
        }
    }

    useEffect(() => {
        getParametros().then((data) => setParametros(data));
    }
    , []);
    return (
        <div>
            <h1>Parámetros de Factura</h1>
            <AgregarParametroFacturaDialog />
            <Exportar nombreTabla="parametrosfactura" />
            <Table>
                <thead>
                    <tr>
                        <th>CAI</th>
                        <th>Fecha de emisión</th>
                        <th>Fecha de vencimiento</th>
                        <th>Rango Inicial</th>
                        <th>Rango Final</th>
                        <th>Código de sucursal</th>
                        <th>Ultima factura</th>
                    </tr>
                </thead>
                <tbody>
                    {parametros.map((parametro) => (
                        <tr key={parametro.id}>
                            <td>{parametro.cai}</td>
                            <td>{parametro.fechaEmision}</td>
                            <td>{parametro.fechaVencimiento}</td>
                            <td>{parametro.rangoInicial}</td>
                            <td>{parametro.rangoFinal}</td>
                            <td>{parametro.codigoSucursal}</td>
                            <td>{parametro.ultimaFactura}</td>
                            <td className="flex items-center text-center">
                                <button className="btn btn-danger" 
                                    onClick={() => eliminarParametro(parametro.id, parametro.cai)} >
                                    Eliminar</button>
                                <AgregarParametroFacturaDialog parametro={parametro} tipo={'editar'} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ParametrosFactura;



