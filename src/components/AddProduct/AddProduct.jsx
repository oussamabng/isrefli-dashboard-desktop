import React,{useState,useEffect} from 'react';
import { Form, Label,Dropdown } from "semantic-ui-react";
import axios from 'axios';

import swal from 'sweetalert';
import Dropzone from 'react-dropzone-uploader';
import CurrencyInput from '../CurrentlyInput/CurrentlyInput';

import "../../assets/css/AddProduct.css";
import 'react-dropzone-uploader/dist/styles.css'



const AddProduct = ()=>{
    const [stores,setStores] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [imageSubmited,setImageSubmited] = useState(false);
    const [file,setFile] = useState();
    const [name,setName] = useState("")
    const [desc,setDesc] = useState("");
    const [ids,setIds] = useState(null);
    const [unity,setUnity] = useState();
    const [min,setMin] = useState("");
    const [max,setMax] = useState("");
    const [price,setPrice] = useState("");
    const [pricePromo,setPricePromo] = useState("");
    const [codeBarre,setCodeBarre] = useState("");
    const [dispo,setDispo] = useState(false);
    const [idc,setIdc] = useState();
    const [idsc,setIdsc] = useState();
    const [categories,setCategories] = useState([])
    const [sous_categories,setSousCategories] = useState([]);

    //?specify upload params and url for your files
    const getUploadParams = ({ meta, file }) => { return { url: 'https://httpbin.org/post' } }
    
    //? called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => {  }

    // receives array of files that are done uploading when submit button is clicked
    const handleImagesSubmit = (files, allFiles) => {
        files.map(f => submitImage(f.file))
        allFiles.forEach(f => f.remove())
        setImageSubmited(true);
    }
    const submitImage = (file)=>{
        setFile(file);
    }
    //? get stores
    useEffect(()=>{
        const token = localStorage.getItem("token");
        const intance = axios.create({
            baseURL:"http://israfli.herokuapp.com/api",
            responseType:"json",
            headers:{
                "content-type":"application/json",
                Authorization: `Token ${token}`
            }
        });
        //? get fournisseurs
        intance.get("/stores")
        .then(res=>{
            res.data.map(store=>{
                setStores(prevState=>[...prevState,{
                    key:store.ids,
                    text:store.name,
                    value:store.ids
                }])
            })
        })
        .catch(err=>{
            console.log(err.response);
        })
        //? get categories
        intance.get("/category")
        .then(res=>{
            res.data.map(category=>{
                setCategories(prevState=>[...prevState,{
                    key:category.idc,
                    value:category.idc,
                    text:category.name
                }]);
            })
            
        })
        .catch(err=>{
            console.log(err.response);
        })
    },[])
    //? get sous_categories
    useEffect(()=>{
        setSousCategories([]);
        const token = localStorage.getItem("token");
        const intance = axios.create({
            baseURL:"http://israfli.herokuapp.com/api",
            responseType:"json",
            headers:{
                "content-type":"application/json",
                Authorization: `Token ${token}`
            }
        });
        intance.get("/souscategory")
        .then(res=>{
            res.data.map(category=>{
                if (category.idc === idc){
                    setSousCategories(prevState=>[...prevState,{
                        key:category.idsc,
                        value:category.idsc,
                        text:category.name
                    }]);
                }
            })
        })
        .catch(err=>{
            console.log(err.response);
        })
    },[idc])
    const unités = [
        {
            key:0,value:"Kg",text:"Gramme",
        },
        {
            key:1,value:"L",text:"Litre",
        },
        {
            key:2,value:"Un",text:"Unité"
        }
    ]
    //? handleInput changes
    const handleInput = (e,{name,value})=>{
        switch (name) {
            case "name":
                setName(value)
                break;
            case "desc":
                setDesc(value);
                break;
            case "codeBarre":
                setCodeBarre(value);
                break;
            default:
                break;
        }
    }
    const handleDropDown = (e,{name,value})=>{
        switch (name) {
            case "four":
                setIds(value)
                break;
            case "unity":
                setUnity(value);
                break;
            case "idc":
                setIdc(value);
                break;
            case "idsc":
                setIdsc(value);
                break;
            default:
                break;
        }
    }
    const fetchAddProduct = ()=>{
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const intance = axios.create({
            baseURL:"http://israfli.herokuapp.com/api",
            responseType:"json",
            headers:{
                "content-type":"multipart/form-data",   
                Authorization: `Token ${token}`
            }
        });
        const form_data = new FormData();
        form_data.append("productImage",file);
        form_data.append("name",name);
        form_data.append("desc",desc);
        form_data.append("ids",ids);
        form_data.append("idc",idc);
        form_data.append("idsc",idsc);
        form_data.append("price",price);
        form_data.append("unity",unity);
        form_data.append("promo",pricePromo);
        form_data.append("code_bar",codeBarre);
        form_data.append("availability",dispo);
        form_data.append("min",min);
        form_data.append("max",max);

        intance.post("/products/",form_data)
        .then(res=>{
            console.log(res);
            setIsLoading(false);
            swal({
                title: "Succée!",
                text: "Produit ajouté avec succès",
                icon: "success",
                timer: 2000,
                button: false
            });
            setName("");
            setPrice("");
            setCodeBarre("");
            setIdc("");
            setIds("");
            setIdsc("");
            setDispo(false);
            setUnity("");
            setDesc("");
            setPrice("");
            setMax("");
            setMin("");
            setFile({});
            setImageSubmited(false);
        })
        .catch(err=>{
            console.log(err.response);
            swal({
                title: "Erreur d'ajout!",
                text: "Veuillez entrer tour les information demander",
                icon: "error",
            })
            setIsLoading(false);
        })
    }
    return (
        <div className="add_product">
            <h1>Ajouter un produit</h1>
            <div className="form_add">
            <Form>
                <Form.Group>
                    <Form.Input value={name} name="name" onChange={handleInput} type="text" label="Nom du produit" />
                    <Form.Input value={desc} name="desc" onChange={handleInput} type="text" label="Description du produit" />
                </Form.Group>
                <Form.Group>
                    <div className="field">
                        <Label content="Fournisseur" />
                        <Dropdown name="four" onChange={handleDropDown} fluid  selection options={stores} />
                    </div>
                    <div className="field">
                        <Label content="Sélectionner l'unité" />
                        <Dropdown name="unity" onChange={handleDropDown} fluid  selection options={unités} />
                    </div>
                </Form.Group>
                <Form.Group>
                    <div className="field">
                        <Label content="Catégorie" />
                        <Dropdown name="idc" onChange={handleDropDown} fluid  selection options={categories} />
                    </div>
                    <div className="field">
                        <Label content="Sous Catégorie" />
                        <Dropdown name="idsc" onChange={handleDropDown} fluid  selection options={sous_categories} />
                    </div>
                </Form.Group>
                <Form.Group>
                    <div className="field">
                        <Label content="Prix de produit" />
                        <CurrencyInput setPrice={setPrice} value={price} name="price"  className="input_currency" type="text" />
                    </div>
                    <div className="field">
                        <Label content="Prix en promotion" />
                        <CurrencyInput setPricePromo={setPricePromo} value={pricePromo} name="pricePromo" className="input_currency"  type="text" />
                    </div>
                </Form.Group>
                <Form.Group>
                    <div className="field">
                    <Label content="Max" />
                        <CurrencyInput setMax={setMax} value={max} name="max"  className="input_currency"  type="text" />
                    </div>
                    <div className="field">
                    <Label content="Min" />
                        <CurrencyInput setMin={setMin} value={min} name="min" className="input_currency" type="text" />
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Input value={codeBarre} name="codeBarre" onChange={handleInput} type="text" label="Code barre" />
                    <Form.Checkbox checked={dispo} name="dispo" onChange={()=>setDispo(prevState=>!prevState)} label="Disponibilité" />
                </Form.Group>
                <Form.Group>
                <Dropzone
                    disabled={imageSubmited}
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    onSubmit={handleImagesSubmit}
                    accept="image/*"
                    maxFiles={1}
                    />
                </Form.Group>
                <Form.Button onClick={fetchAddProduct} loading={isLoading} className="action_btn" content="ENREGISTER" />
            </Form>
            </div>
        </div>
    )
}

export default AddProduct;
