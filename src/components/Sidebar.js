import React from "react";
import logoUEFSA from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import LoginModal from "./LoginModal"
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon, TableCellsIcon } from "@heroicons/react/24/outline";

export default function SidebarWithContentSeparator({ setUsuario, usuario }) {
  const [open, setOpen] = React.useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-[calc(100vh-1rem)] w-full p-4 shadow-xl shadow-gray-900/10 ">
      <div className="mb-2 p-4 flex flex-col items-center gap-2">
        <img
          // onClick={() => goTo("/inicio")}
          src={logoUEFSA}
          style={{ cursor: "pointer", width: "120px" }}
          alt="UEFSA"
          title="UEFSA"
        />
        <Typography variant="h5" color="black">
          Control de Pagos
        </Typography>
      </div>

      {usuario == "" ?
        (<div className="flex items-center justify-center mb-4">
          <LoginModal setUsuario={setUsuario} usuario={usuario} />
        </div>) : (<div className="ml-5 mb-4 mt-3"><Typography variant="paragraph" color="black" className="saludoUsuario">
          Bienvenido {usuario}
        </Typography></div>)
      }


      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="black" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem
                disabled
                onClick={() => { goTo("/metricas") }}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Métricas
              </ListItem>
              <ListItem
              disabled
                onClick={() => { goTo("/reportes") }}
              >
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Reportes
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <TableCellsIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="black" className="mr-auto font-normal">
                Tableros
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem
                onClick={() => { goTo("/pagos") }}
              >
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                PAGOS
              </ListItem>
              <ListItem
                onClick={() => { goTo("/siaf") }}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                SIAF
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-black-50" />

        {usuario == "" ?
          (<></>) :
          (<>
            <ListItem
              onClick={() => { goTo("/perfil") }}
            >
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Perfil
            </ListItem>
            <ListItem
              onClick={() => { goTo("/configuracion") }}
            >
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Configuración
            </ListItem>
            <ListItem
              onClick={() => { setUsuario("") }}
            >
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Cerrar Sesión
            </ListItem>
          </>)
        }


      </List>
    </Card>
  );
}