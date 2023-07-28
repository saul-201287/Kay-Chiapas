import Principal from "./Principal";
import Administrador from "./Vistas/Administrador";
import Login from "./Vistas/Login";
import SalesForm from "./Vistas/SalesForm";
import Fill from "./Vistas/Ej";
import Inventario from "./Vistas/Inventario";
import Compras from "./Vistas/Compras";
import SalesDepartmentView from "./Vistas/SalesDepartmentView";
import SalesTable from "./Vistas/TablaVenta";
import RutasProtegidas from "./RutasProtegidas";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useLocalStorage } from "react-use";
import "./styles/App.css";
function App() {
  const [puesto, setPuesto] = useLocalStorage("usuarios");
  console.log(puesto);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ventas" element={<SalesDepartmentView />}/>
        <Route path="/compras" element={<Compras />} />
        <Route path="/administrador" element={<Administrador />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/fill" element={<Fill />}></Route>
        <Route path="/tabla" element={<SalesTable />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
