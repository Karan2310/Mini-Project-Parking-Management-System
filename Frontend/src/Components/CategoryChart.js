import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
import { vehicleTypes } from '../Constants';
Chart.register(...registerables);

export default class CategoryChart extends Component {


    render() {
        const { vehicleCountData } = this.props;

        console.log(this.props.vehicleCountData);
        return (
            <>
                <Bar
                    data={{
                        labels: ["Bike", "Car", "Heavy"],
                        datasets: [
                            {
                                label: 'vehicles parked',
                                data: [vehicleCountData[vehicleTypes.BIKE], vehicleCountData[vehicleTypes.CAR], vehicleCountData[vehicleTypes.HEAVY]],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgb(60, 179, 113, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgb(60, 179, 113, 1)',
                                ],
                                borderWidth: 1
                            }
                        ]
                    }}

                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    drawOnChartArea: false,
                                    borderColor: "#BFBFBF",
                                    borderWidth: "2"
                                }
                            },
                            x: {
                                beginAtZero: true,
                                grid: {
                                    drawOnChartArea: false,
                                    borderColor: "#BFBFBF",
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
