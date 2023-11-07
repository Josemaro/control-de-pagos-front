import React, { useEffect, useState } from "react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { EyeFilledIcon } from "../assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../assets/EyeSlashFilledIcon";
import { PlusIcon } from "../assets/PlusIcon";


export default function PagoFormModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const validatePassword = (value) => value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i);

    return (
        <>
            <Button
                onPress={onOpen}
                className="bg-foreground text-background"
                endContent={<PlusIcon/>}
                size="sm"
            >
                Registrar
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                backdrop="blur"
                isDismissable={false}
                scrollBehavior="inside"
                size="5xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Registro de Pago</ModalHeader>
                            <ModalBody>
                                TEST
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="bordered" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="secondary" >
                                    Guardar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent> 
            </Modal>
        </>
    );
}