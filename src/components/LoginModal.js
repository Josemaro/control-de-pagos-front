import React, { useEffect, useState } from "react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
// import { MailIcon } from '../assets/MailIcon';
// import { LockIcon } from '../assets/LockIcon';
import { EyeFilledIcon } from "../assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../assets/EyeSlashFilledIcon";

export default function LoginModal({ setCampoRespuesta, campoRespuesta, campoCorreo, campoPassword, setUsuario, usuario, setCampoCorreo, setCampoPassword, actualizarDatos }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const validatePassword = (value) => value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i);

  const isInvalidEmail = React.useMemo(() => {
    if (campoCorreo === "") return false;

    return validateEmail(campoCorreo) ? false : true;
  }, [campoCorreo]);

  const isInvalidPassword = React.useMemo(() => {
    if (campoPassword === "") return false;

    return validatePassword(campoPassword) ? false : true;
  }, [campoPassword]);

  useEffect(() => { setCampoRespuesta("") }, [campoCorreo, campoPassword])

  useEffect(() => { setCampoRespuesta("") }, [onOpenChange])

  const handleClose = () => {
    actualizarDatos({});
  }

  return (
    <>
      <Button onPress={onOpen} color="secondary" variant="flat">Login</Button>
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
                  id="labelEmail"
                  // endContent={
                  //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="Correo"
                  placeholder="Ingresa tu correo"
                  variant="bordered"
                  isInvalid={isInvalidEmail}
                  color={isInvalidEmail ? "danger" : "success"}
                  errorMessage={isInvalidEmail && "Porfavor ingrese un correo válido"}
                  // value={campoCorreo}
                  type="email"
                  onValueChange={setCampoCorreo}
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
                  id="labelPassword"
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña"
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                  isInvalid={isInvalidPassword}
                  color={isInvalidPassword ? "danger" : "success"}
                  errorMessage={isInvalidPassword && "La contraseña debe tener mínimo 8 caracteres"}
                  // value={campoPassword}
                  onValueChange={setCampoPassword}
                />
                {campoRespuesta == "" ? "" :
                  <div class=" text-small bg-orange-100 border-l-3 border-orange-500 text-orange-700 p-1" role="alert">
                    <p class="font-bold">Advertencia</p>
                    <p>{campoRespuesta}</p>
                  </div>
                }
                {/* <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                    color="secondary"                    
                    >
                    Recuérdame
                  </Checkbox>
                  <Link color="secondary" href="#" size="sm">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div> */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="bordered" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="secondary" onPress={actualizarDatos}>
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
