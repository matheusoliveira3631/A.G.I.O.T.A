import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const LineChart = ({chartData}) => {
  // Line chart data with 2 datasets
  const data = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    datasets: [
      {
        label: 'Emprestado', // First data source
        data: chartData.montlyProfit, // Data points
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color
        borderWidth: 2,
      },
      {
        label: 'Recebido', // Second data source
        data:chartData.montlyDebts, // Data points
        borderColor: 'rgba(153, 102, 255, 1)', // Line color
        backgroundColor: 'rgba(153, 102, 255, 0.2)', // Fill color
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Meses', // X-axis title
        },
      },
      y: {
        title: {
          display: true,
          text: 'Valores', // Y-axis title
        },
        beginAtZero: true, // Start y-axis from zero
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
