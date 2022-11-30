import React from "react";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";

function Sidebar() {
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
            to="/clientes"
            className="flex items-center text-white"
          >
            <FaIcons.FaUsers className="mr-3" /> Clientes
          </NavLink>
        </li>

        <li>
          <NavLink
            exact
            activeclassname="active"
            to="/rutinas"
            className="flex items-center text-white"
          >
            <FaIcons.FaUsers className="mr-3" /> Rutinas
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            activeclassname="active"
            to="/medidas"
            className="flex items-center text-white"
          >
            <FaIcons.FaRulerCombined className="mr-3" /> Medidas
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            activeclassname="active"
            to="/TiposMembresias"
            className="flex items-center text-white"
          >
            <FaIcons.FaUsers className="mr-3" /> Tipos de Membresías
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            activeclassname="active"
            to="/empleado"
            className="flex items-center text-white"
          >
            <FaIcons.FaUsers className="mr-3" /> Empleados
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            activeclassname="active"
            to="/dieta"
            className="flex items-center text-white"
          >
            <RiIcons.RiBillLine className="mr-3" /> Dietas
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            activeclassname="active"
            to="/factura"
            className="flex items-center text-white"
          >
            <RiIcons.RiBillLine className="mr-3" /> Factura
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
