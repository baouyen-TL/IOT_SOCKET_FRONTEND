import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,ChartDataLabels);

const BarChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.label),
        datasets: [
            {
                data: data.map(item => item.value),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    formatter: (value, context) => {
                        return value;
                    },
                    color: '#000',
                    font: {
                        weight: 'bold',
                    },
                },
            },
        ],
    };
    const totalValue = data.reduce((acc, item) => acc + item.value, 0);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Biểu đồ thống kê số đáp án đã chọn',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Đáp án',
                },
                ticks: {
                    display: true,
                  },
            },
            y: {
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
                suggestedMax: totalValue,
                beginAtZero: true,
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default BarChart;
