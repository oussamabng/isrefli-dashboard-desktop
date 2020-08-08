import React,{useState,useEffect} from 'react';
import { Image,Form,Button, Icon } from "semantic-ui-react";
import axios from "axios";
import {useHistory} from 'react-router-dom';

//? import css
import "../../assets/css/Login.css";

import Logo from "../../assets/icons/logo_fill.svg";

const Login = ()=>{
    const history = useHistory();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const [passwordHidden,setPasswordHidden] = useState(false);
    const [emailErr,setEmailErr] = useState(false);
    const [passwordErr,setPasswordErr] = useState(false);
    const [loadForm,setLoadForm] = useState(false);

    const handlePasswordState = ()=>{
        setPasswordHidden(prevState=>!prevState);
    }

    useEffect(()=>{
        let token = localStorage.getItem("token");
        if (token){
            const intance = axios.create({
                baseURL:"http://israfli.herokuapp.com/api",
                responseType:"json",
                headers:{
                    "content-type":"application/json",
                    Authorization: `Token ${token}`
                }
            });
            intance.get("/rest-auth/user/")
            .then(res=>{
                history.push("/product");
            })
            .catch(err=>{
                setLoadForm(true);
                console.log(err.response)
            })
        } else {
            setLoadForm(true);
        }
    },[])

    const handleInputChange = (e,{name,value})=>{
        switch (name) {
            case "email":
                if (emailErr) setEmailErr(false);
                setEmail(value)
                break;
            case "password":
                if (passwordErr) setPasswordErr(false);
                setPassword(value);
                break;
            default:
                break;
        }
    }
    
    const submitLogin = ()=>{
        setIsLoading(true);
        const intance = axios.create({
            baseURL:"http://israfli.herokuapp.com/api",
            responseType:"json",
            headers:{
                "content-type":"application/json",
            }
        });
        const body = {
            email,
            password
        }
        intance.post("/rest-auth/login/",body)
        .then(res=>{
            setIsLoading(false);
            localStorage.setItem('token',res.data.key);
            history.push("/dashboard")
        })
        .catch(err=>{
            let errors = err.response;
            if (err && errors){
                if (errors.data.email){
                    setEmailErr(true)
                }
                if (errors.data.password){
                    setPasswordErr(true);
                }
                if (errors.data.non_field_errors){
                    setPasswordErr(true);
                    setEmailErr(true);
                }
            }
            setIsLoading(false);
        })
    }
    return (
        <>
        {
            loadForm && 
            <div className="isrefli_login">
            <div className="form_login">
                <div className="header">
                    <Image alt="logo" src={Logo} />
                    <h1>E-Srafli Admin</h1>
                    <p>Veilluez saisir votre email et votre mots de <br /> passe pour vous connecter</p>
                </div>
                <Form>
                    <Form.Input   name="email" value={email} onChange={handleInputChange} type="text" icon="user" iconPosition="left" placeholder="Email" />
                    <div style={{
                        position:"relative"
                    }}>
                        <Form.Input error={passwordErr} name="password" value={password} onChange={handleInputChange} type={!passwordHidden?"password":"text"} icon="lock" iconPosition="left" placeholder="Mot de passe" />
                        <Icon name={!passwordHidden?'eye':'eye slash'} id="eye_password" onClick={handlePasswordState} />
                    </div>
                    <Button loading={isLoading} content="S'IDENTIFIER" onClick={submitLogin} />
                </Form>
            </div> 
        </div>
    
        }
        </>
    )
}

export default Login
