import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import ControlPagos from './pages/tables/ControlPagos';
import CodigosSiaf from './pages/tables/CodigosSiaf';
import SidebarWithContentSeparator from './components/Sidebar';
import MetricasDashboard from './pages/dashboards/MetricasDashboard';
import ReportesDashboard from './pages/dashboards/ReportesDashboard';
import ConfigPage from './pages/ConfigPage';
import NavbarUefsa from './components/Navbar';
import UserProfilePage from './pages/UserProfilePage';
import { Card } from "@material-tailwind/react";
import { useState } from 'react';
function App() {
  const [usuario, setUsuario] = useState("");

  return (
    <>
      <NavbarUefsa setUsuario={setUsuario} usuario={usuario} />
      <div className='flex flex-row gap-2 overflow-x-hidden'>
        {/* <SidebarWithContentSeparator setUsuario={setUsuario} usuario={usuario} /> */}
        {/* <div className='flex w-2/12 min-w-[15%] max-w-[15%]'>
        </div> */}
        {/* <div className='flex-grow-1 min-w-[85%] max-w-[85%] h-auto'> */}
        <div className='flex-grow-1 min-w-[100%] max-w-[100%] h-auto p-4'>
          {/* <Card className='h-full p-4'> */}
          <Routes>
            <Route path="*" element={<Navigate to="/pagos" />} />
            <Route path="/" element={<Navigate to="/pagos" />} />
            <Route exact path="/pagos" element={<ControlPagos />} />
            <Route exact path="/siaf" element={<CodigosSiaf />} />
            <Route exact path="/metricas" element={<MetricasDashboard />} />
            <Route exact path="/reportes" element={<ReportesDashboard />} />
            <Route exact path="/configuracion" element={<ConfigPage />} />
            <Route exact path="/perfil" element={<UserProfilePage />} />
          </Routes>
          {/* </Card> */}
        </div>
      </div>
    </>
  )
}

export default App;
