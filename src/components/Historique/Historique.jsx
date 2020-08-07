import React from 'react';
import Chart from "react-apexcharts";

//import 'react-dropzone-uploader/dist/styles.css'
//import Dropzone from 'react-dropzone-uploader'

//? import css
const Historique = () => {
    let seetings = {
        series: [{
            name: 'Commandes',
            data: [31, 40, 28, 51, 42, 109, 100]
        },{
            name: 'Produits',
            data: [11, 32, 45, 32, 34, 52, 41]
        }],
        options: {
            chart: {
            height: 350,
            type: 'area'
            },
            dataLabels: {
            enabled: false
            },
            stroke: {
            curve: 'smooth'
            },
            xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
            },
        },
    };
    return (
        <div className="resume historique">
            <h1>Aujourd'hui</h1>
            <div className="stats">
                <Chart className="chart" options={seetings.options} series={seetings.series} type="area" height={350} width={800} />
            </div>
        </div>
    );
}

export default Historique;
