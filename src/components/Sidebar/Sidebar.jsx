import React,{useEffect,useState} from 'react';
import { Image, Icon } from "semantic-ui-react";
import axios from "axios";

//? import css
import "../../assets/css/Sidebar.css";

import Logo from "../../assets/icons/logo_white.svg";
import { useHistory,Link } from 'react-router-dom';

const Sidebar = (props) => {
    const {active} = props;
    const history = useHistory();
    const [activeItem,setActiveItem] = useState("dashboard");

    useEffect(() => {
        if (active){
            setActiveItem(active);
        }
    }, [active]);

    const handleLogout = ()=>{
        let token = localStorage.getItem("token");
        const intance = axios.create({
            baseURL:"http://israfli.herokuapp.com/api",
            responseType:"json",
            headers:{
                "content-type":"application/json",
                Authorization: `Token ${token}`
            }
        });
        intance.post("/rest-auth/logout/")
        .then(res=>{
            localStorage.clear();
            history.push("/login");
        })
        .catch(err=>{
            console.log(err.repsonse);
        })
        
    }
    return (
        <div className="sidebar">
            <div className="header">
                <Image src={Logo} alt='logo' />
                <h1>Bienvenue à E-srafli Admin</h1>
            </div>
            <ul>
            <li className={activeItem === "dashboard" ?"active":""}>
                    <Icon name="chart pie" />
                    <p>
                        <Link to="/dashboard">
                        Tableau de bord
                        </Link>
                    </p>
                </li>
                <li className={activeItem === "command" ?"active":""}>
                    <Icon name="th list" />
                    <p>Gestion des commandes</p>
                </li>
                <li className={activeItem === "product" ?"active":""}>
                    <Icon name="sitemap" />
                    <p>
                        <Link to="/product" >
                        Gestion des produits
                        </Link>
                    </p>
                </li>
                <li className={activeItem === "fournisseur" ?"active":""}>
                    <Icon name="users" />
                    <p>Fournisseurs</p>
                </li>
            </ul>
            <div className="logout" onClick={handleLogout}>
                <Icon  name="log out" />
                <p>Se deconnecter</p>
            </div>
        </div>
    );
}

export default Sidebar;
