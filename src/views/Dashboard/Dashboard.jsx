import React from 'react';

import Sidebar from "../../components/Sidebar/Sidebar";
import Resume from "../../components/Resume/Resume";
import Today from "../../components/Today/Today";
import Historique from "../../components/Historique/Historique";

const Dashboard = ()=>{
    return (
        <>
        <Sidebar active="dashboard" />
        <div className="main">
            <Resume />
            <Today />
            <Historique />
        </div>
        </>
    )
}

export default Dashboard;