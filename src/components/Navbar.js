import React from "react";
import {
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

export default function App({ setNightTheme }) {
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
        <Divider orientation="vertical" />
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
        <Divider orientation="vertical" />
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
          defaultSelected
          size="lg"
          color="secondary"
          onValueChange={setNightTheme}
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <MoonIcon className={className} style={{fill:"white"}} />
            ) : (
              <SunIcon className={className} />
            )
          }
        >
        </Switch>
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="warning" href="#" variant="flat">
            Sign Up
          </Button>
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
