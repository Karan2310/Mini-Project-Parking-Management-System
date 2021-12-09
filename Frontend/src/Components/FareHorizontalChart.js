import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default class FareHorizontalChart extends Component {
    render() {
        return (
            <>
                <Bar
                    data={{
                        labels: ['Bike', 'Car', 'Heavy'],
                        datasets: [
                            {
                                label: 'vehicles parked',
                                data: [20, 40, 70],
                                backgroundColor: [
                                    'rgba(255, 255, 255, 1)',
                                    'rgba(255, 255, 255, 1)',
                                    'rgba(255, 255, 255, 1)',
                                ],
                                borderColor: [
                                    'rgba(0, 0, 0)',
                                    'rgba(0, 0, 0)',
                                    'rgba(0, 0, 0)',
                                ],
                                borderWidth: 1
                            }
                        ]
                    }}

                    options={{
                        maintainAspectRatio: false,
                        indexAxis: 'y',
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    drawOnChartArea: false,
                                    borderColor: "#000",
                                    borderWidth: "2"
                                }
                            },
                            x: {
                                beginAtZero: true,
                                grid: {
                                    drawOnChartArea: false,
                                    borderColor: "#000",
                                    borderWidth: "2"
                                }
                            },
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 10,
                                bottom: 10,
                            }
                        },

                    }}
                />
            </>
        )
    }
}
