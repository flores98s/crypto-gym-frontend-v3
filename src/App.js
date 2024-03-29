import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import NavbarNav from "./components/NavbarNav";
import Sidebar from "./components/Sidebar";
import Clientes from "../src/pages/Clientes";
import Rutinas from "./pages/Rutinas";
import Home from "../src/pages/Home";
import Empleados from "./pages/Empleados";
import Medidas from "./pages/Medidas";
import TiposMembresias from "./pages/TiposMembresias";
import Login from "./pages/Login";
import Cookies from "universal-cookie";
import AsignacionRutina from "./pages/AsignacionRutina";
import Cargo from "./pages/Cargos";
import Factura from "./pages/Factura";
import Dietas from "./pages/Dietas";
import ParametrosFactura from "./pages/ParametrosFactura";
import EmpleadoCargo from "./pages/EmpleadoCargo";
import DetallePlanilla from "./pages/DetallePlanilla";
import Planilla from "./pages/Planilla";
import LoginEmpleado from "./pages/LoginEmpleado";
import SidebarCliente from "./components/SidebarCliente";
import MembresiaCliente from "./pages/clientes/Membresias";
import ComprarMembresia from "./pages/clientes/ComprarMembresia";
import FacturaPdf from "./pages/FacturaPdf";
import RutinasCliente from "./pages/clientes/RutinasCliente";
import ProductList from "./pages/productos/ProductList";
import CarritoCompras from "./pages/productos/CarritoCompras";
import { CartProvider } from "./pages/productos/context/CartContext";


let auth = false;
const cookies = new Cookies();
const authCookie = cookies.get("auth");
if (authCookie) {
  auth = true;
}

let NavApp = () => {
  return (
    <CartProvider>
      <div className="flexi">
        {/* <Sidebar /> */}
        <Sidebar />
        <div className="content w-100">
          <NavbarNav />
          <div className="m-5">
            <Routes>
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/" element={<Home />} exact={true} />
              <Route path="/rutinas" element={<Rutinas />} />
              <Route path="/empleado" element={<Empleados />} />
              <Route path="/medidas" element={<Medidas />} />
              <Route path="/tiposmembresias" element={<TiposMembresias />} />
              <Route path="/cargo" element={<Cargo />} />
              <Route path="/asignacionrutina" element={<AsignacionRutina />} />
              <Route path="/factura" element={<Factura />} />
              <Route path="/facturapdf/:id" element={<FacturaPdf />} />
              <Route path="/dietas" element={<Dietas />} />
              <Route
                path="/parametrosfactura"
                element={<ParametrosFactura />}
              />
              <Route path="/empleadocargo" element={<EmpleadoCargo />} />
              <Route path="/detalleplanilla" element={<DetallePlanilla />} />
              <Route path="/planilla" element={<Planilla />} />
              <Route path="/comprarMembresia" element={<ComprarMembresia />} />
              {/* esta es la ruta de cliente */}
              <Route path="/membresiacliente" element={<MembresiaCliente />} />
              <Route path="/rutinascliente" element={<RutinasCliente />} />
              <Route path="/tienda" element={<ProductList />} />
              <Route path="/carrito" element={<CarritoCompras />} />
            </Routes>
          </div>
        </div>
      </div>
    </CartProvider>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {auth ? (
          <Route path="*" element={<NavApp />} />
        ) : (
          // <Routes>
          <Route path="*" element={<LoginEmpleado />} />
          // <Route path="/LoginEmpleado" element={<loginEmpleado />} />
          // </Routes>
        )}
      </Routes>
    </Router>
  );
}

export default App;
