import React from 'react'

function Rutinas() {
  return (
    <div>
        <h1>Rutinas</h1>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Rutina 1</td>
                    <td>Descripcion de la rutina 1</td>
                    <td>
                        <button>Editar</button>
                        <button>Eliminar</button>
                    </td>
                </tr>
                <tr>
                    <td>Rutina 2</td>
                    <td>Descripcion de la rutina 2</td>
                    <td>
                        <button>Editar</button>
                        <button>Eliminar</button>
                    </td>
                </tr>
                <tr>
                    <td>Rutina 3</td>
                    <td>Descripcion de la rutina 3</td>
                    <td>
                        <button>Editar</button>
                        <button>Eliminar</button>
                    </td>
                </tr>
            </tbody>
            
        </table>
    </div>
  )
}

export default Rutinas