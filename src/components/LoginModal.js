import React, { useState } from "react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
// import { MailIcon } from '../assets/MailIcon';
// import { LockIcon } from '../assets/LockIcon';
import { EyeFilledIcon } from "../assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../assets/EyeSlashFilledIcon";


export default function LoginModal({ setUsuario, usuario }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [campoCorreo, setCampoCorreo] = useState("");
  const [campoPassword, setCampoPassword] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleClose = () => {
    setUsuario(campoCorreo);
  }


  return (
    <>
      <Button onPress={onOpen} color="primary">Iniciar sesión</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Inicio de sesión</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  isClearable
                  // endContent={
                  //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="Usuario o correo"
                  placeholder="Ingresa tu usuario o correo"
                  variant="bordered"
                  // value={campoCorreo}
                  onChange={(e)=>{setCampoCorreo(e.target.value)}}
                />
                <Input
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña"
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                  // value={campoPassword}
                  onValueChange={setCampoPassword}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Recuérdame
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={handleClose}>
                  Ingresar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
