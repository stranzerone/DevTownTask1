import React, { useState, useEffect } from "react";
import { Box, InputBase, List, ListItem, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { nanoid } from "nanoid";
import styled from "@emotion/styled";
import { FetchProductDetails } from "../axios/Axios";
import { NavLink } from "react-router-dom";


const SearchCoin= styled(Box)`
background:#fff;
width:70vw;
height:3rem;
zIndex:12;
margin-top:1rem;

box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
border-radius:1rem;
display:flex;
align-item:center;
justify-content:center;
`
const NewInputBase = styled(InputBase)`
padding-left:0;
width:100%;
height:100%
`
const SearchIcons = styled(Box)`
color:black;
padding-top:.8rem;
paddingRight:.4rem;
margin-right:1rem;

`


const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search,setSearch] =useState("");
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await FetchProductDetails();
        setProducts(response); 
       
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on the search text
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
    if(filtered.length>0){
      setSearch(filtered[0].category);

    }
 
  }, [searchText, products]);



  return (
    <div >
    <SearchCoin display="flex">
      <NewInputBase
        placeholder="Search for products..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
 <NavLink to={"/product/"+search} >
      <SearchIcons style={{color:"red" , height:"1rem"}}  >
             <SearchIcon />
            </SearchIcons>
            </NavLink>
      {
        searchText?(
      
      
    <List style={{display:'block',direction:'column',position:"absolute",marginTop:"3rem",background:"white",zIndex:'3',color:'black' }}>
        {filteredProducts.map((product) => (
          
          <ListItem key={nanoid()}>
          <NavLink to={"/product/"+product.category} style={{textDecoration:"none"}} onClick={()=>setSearchText('')} >   <Typography>{product.title}</Typography> </NavLink>  

          </ListItem>
        ))}
      </List>
        ):null
        }

    </SearchCoin>
   

    </div>
  );
};

export default SearchBar;
