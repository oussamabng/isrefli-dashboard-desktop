import React,{useEffect,useState} from 'react';
import { Table,Dropdown,Icon,Pagination,Button, Segment, Input } from "semantic-ui-react";
import axios from "axios";

//? import css
import "../../assets/css/ProductTable.css";

const ProductTable = () => {
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [count,setCount] = useState(0);
    const [activePage,setActivePage] = useState(1);
    const [categories,setCategories] = useState([]);
    const [sous_categories,setSous_categories] = useState([]);
    const [activeCategory,setActiveCategory] = useState();
    const [activeSousCategory,setActiveSousCategory] = useState();
    const [searchBtn,setSearchBtn] = useState(false);
    const [searchField,setSearchField] = useState("");
    const [idc,setIdc] = useState("");
    const [idsc,setIdsc] = useState("");

    const handleSearchField = (e,{name,value})=>{
        setSearchField(value);
    }

    const handlePagination = (e,{activePage})=>{
        setActivePage(activePage);
        setSearchBtn(true);
    }
    //? get all categories
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
        intance.get("category")
        .then(res=>{
            setCategories(res.data);
        })
        .catch(err=>{
            console.log(err.response);
        })
    },[])
    //? add sous categories
    useEffect(()=>{
        if (categories.filter(ctg=>ctg.name === activeCategory)[0]){
            setSous_categories(categories.filter(ctg=>ctg.name === activeCategory)[0].subCategories)
        }
    },[activeCategory,categories])
    //? get data of table
    useEffect(()=>{
        if (searchBtn || (data.length === 0 && categories.length > 0 )){
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const intance = axios.create({
            baseURL:"http://israfli.herokuapp.com/api",
            responseType:"json",
            headers:{
                "content-type":"application/json",
                Authorization: `Token ${token}`
            }
        });
        intance.get(`/products?page_size=6&page=${activePage}&search=${searchField}&idc=${idc}&idsc=${idsc}&ordering=-created_on`)
        .then(res=>{
            setData(res.data.results);
            if (res.data.count % 5 !== 0) {
                setCount(Math.floor(res.data.count / 5) + 1);
            } else setCount(Math.floor(res.data.count / 5));
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err.reponse);
            return setIsLoading(false);
        })
        }
    },[searchBtn,categories,activePage])

    const handleCategory = (e)=>{
        setIdsc("");
        setActiveSousCategory(null);
        const id = e.currentTarget.attributes["data-key"].value;
        if (id === 6969){
            setIdc("");
            setActiveCategory(null)
        } else if (categories[id]) {
        setActiveCategory(categories[id].name);
        setIdc(categories[id].idc);
        }
    }
    const handleSousCategory = (e)=>{
        const id = e.currentTarget.attributes["data-key"].value;
        setActiveSousCategory(sous_categories[id].name)
        setIdsc(sous_categories[id].idsc);
    }
    const handleSearch = ()=>{
        if (!searchBtn){
            setSearchBtn(true);
        }
    }
    return (
        <div className="project_table">
            <Segment loading={isLoading}>
                <div className="header">
                    <p>Produits</p>
                    <div className="right">
                    <Input onChange={handleSearchField} value={searchField} type="text" iconPosition="left" icon="search" />
                    <Dropdown
                        selection
                        text={activeSousCategory ? activeSousCategory : "Sous-Catégorie"}
                        icon='filter'
                        floating
                        labeled
                        button
                        className='icon'
                    >
                        <Dropdown.Menu>
                            <Dropdown.Header icon='tags' content='Filter by tag' />
                                {
                                    sous_categories && sous_categories.map((sctg,index)=>
                                    <Dropdown.Item key={index} data-key={index} onClick={handleSousCategory}>{sctg.name}</Dropdown.Item>
                                )
                                }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown
                        text={activeCategory ? activeCategory : "Catégorie"}
                        icon='filter'
                        floating
                        labeled
                        button
                        className='icon'
                    >
                        <Dropdown.Menu>
                            <Dropdown.Header icon='tags' content='Filter by tag' />
                            <>
                            <Dropdown.Item key={6969} data-key={6969} onClick={handleCategory}>Tout</Dropdown.Item>
                            {categories && categories.map((categorie,index)=>
                                <Dropdown.Item key={index} data-key={index} onClick={handleCategory}>{categorie.name}</Dropdown.Item>
                            )}
                            </>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button loading={searchBtn && isLoading} className="search" content="Rechercher" onClick={handleSearch} />
                    </div>
                </div>
                {
                    <Table stackable singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nom produit</Table.HeaderCell>
                            <Table.HeaderCell>Catégorie</Table.HeaderCell>
                            <Table.HeaderCell>Sous-Catégorie</Table.HeaderCell>
                            <Table.HeaderCell>Prix</Table.HeaderCell>
                            <Table.HeaderCell>Gérer</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                        data.map((product,index)=>{
                            return (
                                <Table.Row key={index}>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell>{categories.length> 0 &&  categories.filter(ctg=>ctg.idc === product.idc)[0].name}</Table.Cell>
                                <Table.Cell>{categories.length> 0 &&  categories.filter(ctg=>ctg.idc === product.idc)[0].subCategories.filter(subCtg=>subCtg.idsc === product.idsc)[0].name}</Table.Cell>
                                <Table.Cell>{product.price} DZ</Table.Cell>
                                <Table.Cell>
                                    <Button className="icon-btn info" icon="info" />
                                    <Button className="icon-btn update" icon="pencil" />
                                    <Button className="icon-btn delete" icon="times" />
                                </Table.Cell>
                            </Table.Row>
                                
                            )
                        }
                    )
                        }
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                        <Table.HeaderCell>
                        {data.length > 0 && (
                        <Pagination
                        onPageChange={handlePagination}
                        firstItem={null}
                        lastItem={null}
                        activePage={activePage}
                        totalPages={count}
                        boundaryRange={1}
                        siblingRange={0}
                        />
                        )}
                        </Table.HeaderCell>
                            <Table.HeaderCell colSpan='4'>
                                <Button
                                    className="primary_btn"
                                    floated='right'
                                    size='small'
                                >
                                    Ajouter un produit
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                }
        </Segment>
        </div>
    );
}

export default ProductTable;
