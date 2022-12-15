import React from "react";
import ClienteCard from "../../components/ClienteCard";
import axios from "axios";

let backendUrl = "https://cryptogymbackend-production.up.railway.app/api/";



function RutinasCliente() {
  return <div>{<ClienteCard />}</div>;
}

export default RutinasCliente;
