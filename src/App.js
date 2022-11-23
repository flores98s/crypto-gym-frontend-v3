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

let auth = true;
let NavApp = () => {
  return (
    <div className="flexi">
      <Sidebar />

      <div className="content w-100">
        <NavbarNav />
        <Routes>
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/" element={<Home />} exact={true} />
          <Route path="/rutinas" element={<Rutinas />} />
          <Route path="/empleado" element={<Empleados />} />
          <Route path="/medidas" element={<Medidas />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return <Router>{auth ? <NavApp /> : <Navigate to="/login" />}</Router>;
}

export default App;
