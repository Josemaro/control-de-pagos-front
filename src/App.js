import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import ControlPagos from './pages/tables/ControlPagos';
import CodigosSiaf from './pages/tables/CodigosSiaf';
import SidebarWithContentSeparator from './components/Sidebar';
import MetricasDashboard from './pages/dashboards/MetricasDashboard';
import ReportesDashboard from './pages/dashboards/ReportesDashboard';
import ConfigPage from './pages/ConfigPage';
import UserProfilePage from './pages/UserProfilePage';
import { Card } from "@material-tailwind/react";
import { useState } from 'react';
function App() {
  const [usuario,setUsuario] = useState("");

  return (
    <>
      <div className='flex flex-row gap-2'>
        <div className='flex w-2/12 min-w-[16.666667%] max-w-[16.666667%]'>
          <SidebarWithContentSeparator setUsuario={setUsuario} usuario={usuario} />
        </div>
        <div className='flex-grow-1 w-10/12 h-auto'>
          <Card className='h-full p-4'>
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
          </Card>
        </div>
      </div>
    </>
  )
}

export default App;
