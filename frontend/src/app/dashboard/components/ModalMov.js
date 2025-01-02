'use client'

import { Button, Label, Modal, TextInput, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useNewContact } from "@/services/contacts/newContact";

import Cookies from "js-cookie";

import { fetchContacts } from "@/services/contacts/fetchContacts";
import { useNewTransaction } from "@/services/expenses/newTransaction";

export default function ModalContact()
{
    const [contacts, setContacts] = useState([]);
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState("");
    const [contato, setContato] = useState("");
    const [juros, setJuros] = useState(0);
    const [modalidade, setModalidade] = useState(1);
    
    const {newTransaction} = useNewTransaction();

    useEffect(() => {
        fetchContacts().then((data) => {
            console.dir(data);
            setContacts(data);
        });
    }, []);

    return (
       <>
                     <Modal.Header>Adicionar movimentação</Modal.Header>
                        <Modal.Body>
                        <div className="space-y-6">
                            <div className="flex">
                                <div className="w-2/5">
                                    <div className="mb-2 block">
                                        <Label htmlFor="contato" value="Contato" />
                                    </div>
                                    <Select value={contato} onChange={
                                        (e) => setContato(e.target.value)
                                    } id="contato" required>
                                        <option>Selecione o contato</option>
                                        {contacts.map((contact) => (
                                            <option key={contact.id} value={contact.id}>{contact.name}</option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="w-2/5 ml-5">
                                    <div className="mb-2 block">
                                        <Label htmlFor="contato" value="Tipo de transação" />
                                    </div>
                                    <Select id="tipo" value={tipo} onChange={
                                        (e) => setTipo(e.target.value)
                                    } required>
                                        <option>Selecione o tipo de transação</option>
                                        <option value={"-"} >Empréstimo</option>
                                        <option value={"+"}>Recebimento</option>
                                    </Select>
                                </div>
                            </div>
                            <div className="w-10/12">
                                <div className="mb-2 block">
                                    <Label htmlFor="valor" value="Valor" />
                                </div>
                                <TextInput
                                    id="valor"
                                    type="number"
                                    required
                                    value={valor}
                                    onChange={(e) => setValor(e.target.value)}
                                />
                            </div>
                            <div className="flex">
                                <div className="w-2/5">
                                        <div className="mb-2 block">
                                            <Label htmlFor="juros" value="Juros (%)" />
                                        </div>
                                        <TextInput
                                            id="juros"
                                            type="number"
                                            required
                                            value={juros}
                                            max={100}
                                            onChange={(e) => setJuros(e.target.value)}
                                        />
                                </div>
                                <div className="w-2/5 ml-5">
                                    <div className="mb-2 block">
                                        <Label htmlFor="modalidade" value="Período dos juros" />
                                    </div>
                                    <Select id="modalidade" value={modalidade} onChange={
                                        (e) => setModalidade(e.target.value)
                                    } required>
                                        <option>Selecione a modalidade</option>
                                        <option value={1}>Dia</option>
                                        <option value={30}>Mês</option>
                                        <option value={365}>Ano</option>
                                    </Select>
                                </div>
                            </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button color="dark" size="md" onClick={() => {
                            toast.promise(
                                newTransaction({amount: tipo == "+"? parseInt(valor) : -valor, 
                                                userId: parseInt(Cookies.get("userId")), 
                                                contactId: parseInt(contato),
                                                interest: parseFloat(juros),
                                                interestPeriod: parseInt(modalidade)
                                            }),
                                {
                                    loading: 'Registrando transação...',
                                    success: <b>Sucesso! Transação registrada.</b>,
                                    error: <b>Falha ao registrar transação.</b>,
                                }
                                
                            )
                        }
                        }>
                            Adicionar
                        </Button>
                        </Modal.Footer>
      </>
    )
}