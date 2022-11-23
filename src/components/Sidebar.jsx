import React from "react";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

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
            to="/empleado"
            className="flex items-center text-white"
          >
            <FaIcons.FaUsers className="mr-3" /> Empleados
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
