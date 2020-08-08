import React from 'react';

import Sidebar from "../../components/Sidebar/Sidebar";
import ProductTable from "../../components/ProductTable/ProductTable";

const Product = ()=>{
    return (
        <>
        <Sidebar active="product" />
        <div className="main">
            <ProductTable />
        </div>
        </>
    )
}

export default Product;