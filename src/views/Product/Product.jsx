import React from 'react';

import Sidebar from "../../components/Sidebar/Sidebar";

const Product = ()=>{
    return (
        <>
        <Sidebar active="product" />
        <div className="main">
            <h1>Gestion des produits</h1>
        </div>
        </>
    )
}

export default Product;