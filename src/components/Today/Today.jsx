import React from 'react';
import Chart from "react-apexcharts";

//? import css
import "../../assets/css/Today.css";

const Today = () => {
    const seetings = {
        series: [70],
        options: {
        chart: {
            height: 350,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
            hollow: {
                size: '70%',
            }
            },
        },
        labels: ['Commandes Traités'],
        },
    };
    const seetings1 = {
        series: [20],
        options: {
        chart: {
            height: 350,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
            hollow: {
                size: '70%',
            }
            },
        },
        labels: ['Commandes non traités'],
        },
    };
    return (
        <div className="resume today">
            <h1>Aujourd'hui</h1>
            <div className="stats">
                <Chart className="blue" options={seetings.options} series={seetings.series} type="radialBar" height={250} />
                <Chart className="red" options={seetings1.options} series={seetings1.series} type="radialBar" height={250} />
            </div>
        </div>
    );
}

export default Today;
