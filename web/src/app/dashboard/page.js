'use client';

import { Spinner, Card } from "flowbite-react";
import { useState, useEffect } from "react";

import DashboardSidebar from "./components/Sidebar";
import PieChart from "./components/PieChart";
import LineChart from "./components/LineChart";

import { fetchDahsboardData } from "@/services/expenses/fetchDashboardData";

import {HiChartSquareBar, HiCash, HiClipboard, HiUser, HiOutlinePlus } from "react-icons/hi";
import { set } from "react-hook-form";

export default function Dashboard() 
{
    const [loading, setLoading] = useState(true);
    const [dashBoardData, setData] = useState([]);
    const [pieData, setPieData] = useState({labels: [], numbers: []});
    const [lineData, setLineData] = useState({montlyProfit: [], montlyDebts: []});

    useEffect(() => {
        fetchDahsboardData().then((data) => {
            setData(data);
            const labels = data.topExpenses.map((e)=>e.name);
            const numbers = data.topExpenses.map((e)=>Math.abs(e.debt));
            setPieData({
                labels: labels,
                numbers: numbers
            });
            setLineData({
                montlyProfit: data.monthlyProfit,
                montlyDebts: data.montlyDebts
            });
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
            {!loading && 
                <div className="h-screen w-screen flex flex-wrap">
                    <div className="w-3/5 h-full p-4 flex flex-wrap justify-around">
                        <Card className="w-5/12 h-20">
                            <div className="flex items-center">
                                <HiUser className="text-2xl text-blue-500"/>
                                <h2 className="ml-2">Contatos registrados: {dashBoardData.totalUserContacts} </h2>
                            </div>
                        </Card>
                        <Card className="w-5/12 h-20">
                            <div className="flex items-center">
                                <HiCash className="text-2xl text-blue-500"/>
                                <h2 className="ml-2">Total emprestado: {dashBoardData.totalExpenseValue} </h2>
                            </div>
                        </Card>
                        <Card className="w-5/12 h-20">
                            <div className="flex items-center">
                                <HiCash className="text-2xl text-blue-500"/>
                                <h2 className="ml-2">Total recebido: {dashBoardData.totalReturnedValue} </h2>
                            </div>
                        </Card>
                        <Card className="w-5/12 h-20">
                            <div className="flex items-center">
                                <HiCash className="text-2xl text-blue-500"/>
                                <h2 className="ml-2">Saldo atual: {dashBoardData.totalBalance} </h2>
                            </div>
                        </Card>
                    <div className="h-2/3 w-full p-4">  
                        <h2 className="mb-2">Evolução do saldo</h2>
                        <LineChart chartData={lineData} />
                    </div>
                    </div>
                    <div className="w-1/3 h-2/3 mt-4 p-4 flex flex-col items-center">
                        <h2 className="mb-2">Maiores devedores</h2>
                        <PieChart chartData={pieData}/>
                    </div>
                </div>
            }
        </div>
    );
}