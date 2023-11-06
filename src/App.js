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
import axios from "axios";
import { useEffect, useState } from 'react';
const baseURL = process.env.REACT_APP_HOST;
function App() {
  const [usuario, setUsuario] = useState(null);
  const [nightTheme, setNightTheme] = useState(false);
  const [campoCorreo, setCampoCorreo] = useState("");
  const [campoPassword, setCampoPassword] = useState("");
  const [campoRespuesta, setCampoRespuesta] = useState("");

  useEffect(() => {
    let html = document.getElementById("html");

    if (nightTheme) {
      html.style.backgroundColor = "black";
    } else {
      html.style.backgroundColor = "white";
    }
  }, [nightTheme])

  useEffect(() => {
    console.log("entra")
    if(usuario==null && JSON.stringify(localStorage.getItem("user")).id!=0){
      console.log("entra2")
      setUsuario(JSON.parse(localStorage.getItem("user")));
    }
  }, [])

  const actualizarDatos = () => {
    if (campoCorreo != "" && campoPassword != "") {
      axios.post(baseURL + "/login", { email: campoCorreo, password: campoPassword })
        .then(response => {
          if (response.data?.usuario?.id) {
            setUsuario(response.data.usuario);
            localStorage.setItem("user", JSON.stringify(response.data.usuario))
            setCampoPassword("");
            setCampoCorreo("");
          } else {
            //TODO alerta 
            setCampoRespuesta(response.data.msg);
          }
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });

    }
  }
  // useEffect(() => {
  //   let user = localStorage.getItem("user");
  //   if (user) {
  //     // setUsuario(user);
  //     // console.log(usuario)
  //   }
  // }, [usuario])

  return (
    <>
      <div className={nightTheme ? "dark text-foreground bg-background" : ""}>
        <NavbarUefsa setNightTheme={setNightTheme} setUsuario={setUsuario} usuario={usuario}
          setCampoCorreo={setCampoCorreo} setCampoPassword={setCampoPassword} 
          campoCorreo={campoCorreo} campoPassword={campoPassword}
          actualizarDatos={actualizarDatos}
          campoRespuesta={campoRespuesta}
          setCampoRespuesta={setCampoRespuesta}
        />
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
      </div>
    </>
  )
}

export default App;
