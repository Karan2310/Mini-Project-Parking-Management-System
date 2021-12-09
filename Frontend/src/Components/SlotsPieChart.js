import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2'

export default class SlotsPieChart extends Component {
    render() {
        return (
            <>
                <Doughnut
                    data={{
                        labels: ['Total', 'Filled', 'Empty',],
                        datasets: [
                            {
                                label: 'Slots',
                                data: [100, 25, 75],
                                backgroundColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 205, 86)'
                                ],
                                hoverOffset: 4,
                                borderWidth: "0",
                                borderAlign: "center",
                                borderColor: "#fff"
                            }
                        ]
                    }}

                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: {
                                    color: "white"
                                }
                            }
                        }
                    }}
                />
            </>
        )
    }
}
