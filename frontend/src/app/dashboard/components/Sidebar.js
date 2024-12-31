
"use client";

import { Sidebar, Modal } from "flowbite-react";
import {HiChartSquareBar, HiCash, HiClipboard, HiUser, HiOutlinePlus } from "react-icons/hi";

import { use, useState } from "react";
import { useRouter } from "next/navigation";

import ModalMov from "./ModalMov";

import Image from "next/image";

export default function DashboardSidebar() {

  const [openModalMov, setOpenModalMov] = useState(false);

  const useNav = ()=>{
    const router = useRouter();

    const navigate = (path) => {
      router.push(path);
    }

    return {navigate};
  }

  const {navigate} = useNav();

  const Clickable = ({path, children}) => {
    return (
      <div onClick={() => navigate(path)} className="cursor-pointer">
        {children}
      </div>
    )
  }

  return (
    <Sidebar aria-label="Sidebar with content separator example" className="h-screen">
        <Modal show={openModalMov} onClose={() => setOpenModalMov(false)}>
          <ModalMov/> 
        </Modal>
        <div className="flex items-center h-16">
          <Image src="/logo-black.png" alt="Logo" width={80} height={80} />
          <h1 className="text-2x1">A.G.I.O.T.A</h1>
        </div>
      <Sidebar.Items>
      <Sidebar.ItemGroup>
        <div className="flex items-center ml-2 mt-4">
          <HiUser className="text-2xl text-gray-500"/>
          <h2 className="ml-2">{localStorage.getItem("name")}</h2>
        </div>
      </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Clickable path="/dashboard">
            <Sidebar.Item icon={HiChartSquareBar}>
              Painel
            </Sidebar.Item>
          </Clickable>
          <Clickable path="/dashboard/extrato">
            <Sidebar.Item icon={HiCash}>
              Extrato
            </Sidebar.Item>
          </Clickable>
          <Clickable path="/dashboard/contatos">
            <Sidebar.Item icon={HiClipboard}>
              Contatos
            </Sidebar.Item>
          </Clickable>
          <Sidebar.Item icon={HiOutlinePlus} onClick={() => setOpenModalMov(true)}>
            Adicionar movimentação
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    
  );
}
