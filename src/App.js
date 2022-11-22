import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import NavbarNav from "./components/NavbarNav";
import Sidebar from "./components/Sidebar";
import Clientes from "../src/pages/Clientes";
import Rutinas from "./pages/Rutinas";
import Home from "../src/pages/Home";
import Empleados from "./pages/Empleados";

function App() {
  return (
    <Router>
      <div className="flexi">
        <Sidebar />

        <div className="content w-100">
          <NavbarNav/>
          <Routes>
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/" element={<Home />} exact />
            <Route path="/rutinas" element={<Rutinas/>}/>
            <Route path="/empleado" element={<Empleados/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
