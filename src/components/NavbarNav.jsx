import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


function Example(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  let cerrarSesion = () => {
    let confiramcion = window.confirm("¿Desea cerrar sesión?");
    if (confiramcion) {
      cookies.remove('auth');
      window.location.href = '/';
    }

  }
  return (
      
    <div>
     
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Crypto Gym</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">jklfj kdlfhsjdkl</NavLink>
            </NavItem> */}
            <button onClick={cerrarSesion}>Cerrar Sesion</button>
            </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;