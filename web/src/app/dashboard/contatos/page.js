'use client';

import { Button, Card, Modal, Spinner } from "flowbite-react";
import { useState, useEffect } from "react";

import DashboardSidebar from "../components/Sidebar";
import ModalContact from "../components/ModalContact";

import ContactCard from "./components/ContactCard";

import { fetchContacts } from "@/services/contacts/fetchContacts";

export default function Contatos() 
{
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetchContacts().then((data) => {
            setContacts(data);
            setLoading(false);
        });
    }, []);

    return (
        
        <div className="flex">
            <DashboardSidebar />
            {loading && 
            <div className="container flex flex-col items-center justify-center">
                <Spinner aria-label="Center-aligned spinner example" />
                <p className="mt-2 font-serif font-light subpixel-antialiased">Carregando contatos</p>
            </div>
            }
            {!loading && contacts==[] && <div className="container flex items-center justify-center">
                <div className="flex flex-col">
                    <p className="mb-5 font-serif font-light subpixel-antialiased">Parece que você ainda não tem contatos</p>
                    <Button size="sm" gradientDuoTone="pinkToOrange" onClick={() => setOpenModal(true)}>Cadastrar novo contato</Button>
                    <Modal show={openModal} onClose={() => setOpenModal(false)}>
                        <ModalContact/> 
                    </Modal>
                </div>
            </div>
            }
            {!loading && contacts!=[] &&
                <>
                <div className="container flex items-start">
                    <ContactCard contacts={contacts}/>
                    <Card className="max-w-sm m-5">
                        <Button className="h-full" size="sm" gradientDuoTone="pinkToOrange" onClick={() => setOpenModal(true)}>Cadastrar novo contato</Button>
                        <Modal show={openModal} modalinfo={setOpenModal} onClose={() => setOpenModal(false)}>
                            <ModalContact/> 
                        </Modal>
                    </Card>
                </div>
                </>
            }
        </div>
    );
}