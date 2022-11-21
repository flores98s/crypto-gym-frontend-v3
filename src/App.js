import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Clientes from "../src/pages/Clientes";
import Home from "../src/pages/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="flexi">
        <Sidebar />

        <div className="content">
          <Routes>
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/" element={<Home />} exact />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
