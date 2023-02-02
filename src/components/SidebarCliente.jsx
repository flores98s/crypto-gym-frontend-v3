import React from "react";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";

function SidebarCliente() {
  return (
    <div className="sidebar bg-gray-900">
      <ul>
        <li>
          <NavLink
            exact
            activeclassname="active"
            to="/"
            className="flex items-center text-white"
          >
            <FaIcons.FaHome className="mr-3" />
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            activeclassname="active"
            to="/rutinascliente"
            className="flex items-center text-white"
          >
            <FaIcons.FaHome className="mr-3" />
            Rutinas
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            activeclassname="active"
            to="/dietas"
            className="flex items-center text-white"
          >
            <FaIcons.FaHome className="mr-3" />
            Dietas
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            activeclassname="active"
            to="/clases"
            className="flex items-center text-white"
          >
            <FaIcons.FaHome className="mr-3" />
            Clases
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            activeclassname="active"
            to="/medidas"
            className="flex items-center text-white"
          >
            <FaIcons.FaHome className="mr-3" /> 
            Medidas
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            activeclassname="active"
            to="/tienda"
            className="flex items-center text-white"
          >
            <FaIcons.FaStore className="mr-3" />
            Tienda
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            activeclassname="active"
            to="/membresiacliente"
            className="flex items-center text-white"
          >
            <FaIcons.FaHome className="mr-3" />
            Perfil
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SidebarCliente;
