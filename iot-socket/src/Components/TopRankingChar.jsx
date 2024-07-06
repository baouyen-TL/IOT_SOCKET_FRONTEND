// src/components/TopLevelChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Important for react-chartjs-2 to work with Chart.js 3.x

const TopRankingChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: 'Total',
        data: data.map(item => item.value),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            // Add more colors as needed
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            // Add more colors as needed
          ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    aspectRatio: 2,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'TOP ĐẦU BẢNG',
        },
        tooltip: {
            enabled: false, // Bật tooltip
          },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            title: {
                display: true,
                text: 'Tên học sinh',
            },
            ticks: {
                display: true,
              },
        },
        y: {
            display: false,
            grid: {
                display: false,
            },
            ticks: {
                stepSize: 0.5,
                display: true,
            },
            title: {
                stepSize: 20,  // Khoảng cách giữa các tick
                display: true, // Hiển thị nhãn đánh dấu trên trục y
                callback: function(value) {
                  return value; // Định dạng giá trị tick
                }
            },
            beginAtZero: true,
        },
    },
  };

  return <Bar data={chartData} options={chartOptions}  height={700}/>;
};

export default TopRankingChart;
