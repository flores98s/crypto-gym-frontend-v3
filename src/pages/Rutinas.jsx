import React from 'react'
import {useState, useEffect} from 'react'
import {Table} from 'react-bootstrap'
import Exportar from '../components/Exportar';

let backendUrl =
  "https://cryptogymbackend-production.up.railway.app/api/rutina/";

function Rutinas() {
    // set title to Rutinas
    document.title = 'Rutinas'
    const [rutinas, setRutinas] = useState([]);

    let getRutinas = async () => {
        let response = await fetch(backendUrl);
        let data = await response.json();
        console.log(data);
        return data;
    };

    useEffect(() => {
        getRutinas().then((data) => setRutinas(data));
    }, []);


  return (
    <div>
        <h1>Rutinas</h1>
        <Exportar nombreTabla="rutinas" />
        <Table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tipo Rutina</th>
                    <th>Cliente</th>
                    <th>Empleado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {rutinas.map((rutina) => (
                    <tr key={rutina.id}>
                        <td>{rutina.nombre}</td>
                        <td>{rutina.tipoRutina}</td>
                        <td>{rutina.cliente}</td>
                        <td>{rutina.empleado}</td>
                        <td>
                            <button className="btn btn-danger mx-2">Eliminar</button>
                            <button className="btn btn-info">Actualizar</button>
                        </td>

                    </tr>
                ))}

            </tbody>
            
        </Table>
    </div>
  )
}

export default Rutinas