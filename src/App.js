import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import ControlPagos from './pages/tables/ControlPagos';
import SidebarWithContentSeparator from './components/Sidebar';
import {
  Card
} from "@material-tailwind/react";
function App() {
  return (
    <>
      <div className='flex flex-row gap-2'>
        <div className='flex'>
          <SidebarWithContentSeparator />
        </div>
        <div className='flex-grow-1 w-full h-auto'>
          <Card className='h-full p-4'>
            <Routes>
              <Route path="*" element={<Navigate to="/pagos" />} />
              <Route path="/" element={<Navigate to="/pagos" />} />
              <Route exact path="/pagos" element={<ControlPagos />} />
            </Routes>
          </Card>
        </div>
      </div>
    </>
  )
}

export default App;
