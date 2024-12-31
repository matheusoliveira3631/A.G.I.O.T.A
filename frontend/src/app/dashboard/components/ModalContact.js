'use client'

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useNewContact } from "@/services/contacts/newContact";

export default function ModalContact()
{
   
    const {newContact} = useNewContact();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    return (
       <>
                     <Modal.Header>Adicionar contato</Modal.Header>
                        <Modal.Body>
                        <div className="space-y-6">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Nome" />
                                </div>
                                <TextInput
                                    id="name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="phone" value="Telefone" />
                                </div>
                                <TextInput
                                    id="phone"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button color="dark" size="lg" onClick={() => 
                            toast.promise(
                                newContact({name, phone, userId : parseInt(localStorage.getItem("userId"))}),
                               {
                                 loading: 'Registrando usuário...',
                                 success: <b>Sucesso! Redirecionando para página de login</b>,
                                 error: <b>Falha ao registrar usuário.</b>,
                               }
                             )
                        }>
                            Adicionar
                        </Button>
                        </Modal.Footer>
      </>
    )
}