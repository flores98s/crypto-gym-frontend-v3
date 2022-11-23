// import React from "react";
// import { useState, useEffect } from "react";
// import { Button, Table } from "react-bootstrap";
// import AgregarMedidaDialog from "../components/dialogs/AgregarMedidaDialog";

// let backendUrl =
//     "https://cryptogymbackend-production.up.railway.app/api/medidas/";

// function Medidas() {
//     const [medidas, setMedidas] = useState([]);

//     let getMedidas = async () => {
//         let response = await fetch(backendUrl);
//         let data = await response.json();
//         return data;
//     };

//     useEffect(() => {
//         getMedidas().then((data) => setMedidas(data));
//     }, []);
//     return (
//         <div>
//             <h1>Medidas</h1>
//             <AgregarMedidaDialog />
//             <Table>
//                 <thead>
//                     <tr>
//                         <th>Id</th>
//                         <th>Fecha</th>
//                         <th>Foto frontal</th>
//                         <th>Foto lateral</th>
//                         <th>Peso</th>
//                         <th>Indice de masa muscular</th>
//                         <th>Indice de grasa muscular</th>
//                         <th>Pecho</th>
//                         <th>Espalda</th>
//                         <th>Brazo</th>
//                         <th>Antebrazo</th>
//                         <th>Cadera</th>
//                         <th>Cintura</th>
//                         <th>Pierna</th>
//                         <th>Pantorrilla</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {medidas.map((medida) => (
//                         <tr key={medida.id}>
//                             <td>{medida.id}</td>
//                             <td>{medida.fecha}</td>
//                             <td>{medida.fotoFrontal}</td>
//                             <td>{medida.fotoLateral}</td>
//                             <td>{medida.peso}</td>
//                             <td>{medida.indiceMasaMuscular}</td>
//                             <td>{medida.indiceGrasaMuscular}</td>
//                             <td>{medida.pecho}</td>
//                             <td>{medida.espalda}</td>
//                             <td>{medida.brazo}</td>
//                             <td>{medida.antebrazo}</td>
//                             <td>{medida.cadera}</td>
//                             <td>{medida.cintura}</td>
//                             <td>{medida.pierna}</td>
//                             <td>{medida.pantorrilla}</td>
//                             <td className="flex items-center text-center">
//                                 <button className="btn btn-danger btn-sm mx-2 w-75">Eliminar</button>
//                                 <AgregarMedidaDialog medidaId={medida.id} tipo={'editar'} />
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </div>
//     );
// }

// export default Medidas;