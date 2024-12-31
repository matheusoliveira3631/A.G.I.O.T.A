'use client';

import { Spinner } from "flowbite-react";
import { useState, useEffect } from "react";

import DashboardSidebar from "../components/Sidebar";

import MovCard from "./components/MovCard";

import { fetchExpenses } from "@/services/expenses/fetchExpenses";

export default function Extrato() 
{
    const [loading, setLoading] = useState(true);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses().then((data) => {
            setExpenses(data);
            setLoading(false);
        });
    }, []);

    return (
        
        <div className="flex">
            <DashboardSidebar />
            {loading && 
            <div className="container flex flex-col items-center justify-center">
                <Spinner aria-label="Center-aligned spinner example" />
                <p className="mt-2 font-serif font-light subpixel-antialiased">Carregando extrato</p>
            </div>
            }
            {!loading && expenses==[] && <div className="container flex items-center justify-center">
                <div className="flex flex-col">
                    <p className="mb-5 font-serif font-light subpixel-antialiased">Parece que você ainda não tem nenhuma movimentação</p>
                </div>
            </div>
            }
            {!loading && expenses!=[] &&
                <>
                <div className="container flex flex-wrap items-start">
                    <MovCard expenses={expenses}/>
                </div>
                </>
            }
        </div>
    );
}