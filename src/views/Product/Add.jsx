import React from 'react';

import Sidebar from "../../components/Sidebar/Sidebar";
import AddProduct from "../../components/AddProduct/AddProduct";

const Add = ()=>{
    return (
        <>
        <Sidebar active="product" />
        <div className="main">
            <AddProduct />
        </div>
        </>
    )
}

export default Add;
