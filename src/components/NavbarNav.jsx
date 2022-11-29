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

function cerrarSession() {
  cookies.remove('auth', { path: '/' });
  window.location.href = '/';
}


function Example(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
     
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Crypto Gym</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <button 
                onClick={() => cerrarSession()}
              >
                Cerrar sesión
              </button>

            </NavItem>
            
            </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;