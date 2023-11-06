import React, { useEffect } from "react";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Divider
} from "@nextui-org/react";
import { Link, Button } from "@nextui-org/react";
// import {AcmeLogo} from "./AcmeLogo.jsx";
import logoUEFSA from "../assets/logo.png";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "../assets/MoonIcon";
import { SunIcon } from "../assets/SunIcon";
import LoginModal from "./LoginModal";

export default function App({ campoCorreo, campoPassword, setCampoRespuesta, campoRespuesta,setNightTheme, setUsuario, usuario, setCampoPassword, setCampoCorreo, actualizarDatos }) {
  const menuItems = [
    "Perfil",
    "Dashboard",
    "SIAF",
    "PAGOS",
    "Configuraciones",
    "Log Out",
  ];

  return (
    <Navbar isBordered shouldHideOnScroll>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <img
            // onClick={() => goTo("/inicio")}
            src={logoUEFSA}
            style={{ cursor: "pointer", width: "70px" }}
            alt="UEFSA"
            title="UEFSA"
          />
          {/* <p className="font-bold text-inherit">COPASA</p> */}
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* <Divider orientation="vertical" /> */}
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <img
            // onClick={() => goTo("/inicio")}
            src={logoUEFSA}
            style={{ cursor: "pointer", width: "90px" }}
            alt="UEFSA"
            title="UEFSA"
          />
          {/* <p className="font-bold text-inherit">COPASA</p> */}
        </NavbarBrand>
        {/* <Divider orientation="vertical" /> */}
        <NavbarItem>
          <Link color="foreground" href="#">
            SIAF
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" color="success">
            PAGOS
          </Link>
        </NavbarItem>
        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent justify="end">
        <Switch
          size="lg"
          color="secondary"
          onValueChange={setNightTheme}
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <MoonIcon className={className} />
            ) : (
              <SunIcon className={className} />
            )
          }
        >
        </Switch>
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem> */}
        <NavbarItem>
          {/* <Button as={Link} color="secondary" variant="flat" href="#">
            Login
            
          //TODO INICIO CIERRE SESIÓN
          </Button> */}
          {usuario == null ?
            (<LoginModal campoRespuesta={campoRespuesta} setCampoRespuesta={setCampoRespuesta} campoCorreo={campoCorreo} campoPassword={campoPassword} actualizarDatos={actualizarDatos} setCampoPassword={setCampoPassword} setCampoCorreo={setCampoCorreo} setUsuario={setUsuario} usuario={usuario} />
            ) : (
              // <div onClick={()=>{setUsuario("")}}>Bienvenido {usuario}</div>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name={usuario.nombres}
                    size="sm"
                    src=""
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Hola, {usuario?.nombres}</p>
                    <p className="font-semibold">{usuario?.email}</p>
                  </DropdownItem>
                  <DropdownItem key="settings">Ajustes</DropdownItem>
                  <DropdownItem key="configurations">Configuración</DropdownItem>
                  <DropdownItem onClick={() => { setUsuario(null); localStorage.removeItem("user") }} key="logout" color="danger">
                    Cerrar sesión
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )
          }
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => ( 
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
