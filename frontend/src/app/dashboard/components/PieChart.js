import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({chartData}) => {
    console.log(chartData);

  const data = {
    labels: chartData.labels, // Labels for each slice
    datasets: [
      {
        data: chartData.numbers, // Values for each slice
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',  // Red
          'rgba(54, 162, 235, 0.6)',  // Blue
          'rgba(255, 206, 86, 0.6)',  // Yellow
          'rgba(75, 192, 192, 0.6)',  // Green
          'rgba(153, 102, 255, 0.6)', // Purple
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
