import React, { useState,useEffect } from 'react'
import { FetchProductDetails } from '../axios/Axios';
import Slides from './Slides';
import Filter2 from './Filter2';

export default function AllProducts() {
const [Products,setProducts] =useState([])
const [childVlaue,setChildValue]=useState([]);
const [priceRange,setPriceRange] =useState();
const [filteredProduct,setFilterdProducts]=useState([]);
const [cate,setCate] =useState([]);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;
const [totalItems,setTotalItems]=useState(1); // 3 pages * 2 items per page
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;

useEffect(() => {
  async function fetchProducts() {
    try {
      const response = await FetchProductDetails();
 setTotalItems(response.length);
      // Filter products based on brand
      const filteredProducts = response.filter(product => childVlaue.includes(product.brand));
      const cateFiltred = response.filter(product => cate.includes(product.category)); 
      // Filter products based on category
      const finalProducts = filteredProducts.filter(product => cate.includes(product.category));
      const rangeFinalProduct = finalProducts.filter(product => product.price < priceRange/100);
      const catAndPrice = cateFiltred.filter(product=> product.price <priceRange/100)
      // Set filteredProducts
      setFilterdProducts(finalProducts);
   
      // Check if any filters are applied
      if (cate.length > 0 && childVlaue.length > 0 && priceRange > 0) {
        setProducts(rangeFinalProduct);
        setTotalItems(filteredProduct.length)
        console.log(rangeFinalProduct)
      }else if(cate.length===0 && childVlaue.length>0){
setProducts(catAndPrice)
console.log("childValue")
      }else if(cate.length > 0 &&  priceRange > 0){
setProducts(rangeFinalProduct);
console.lof("cate price ",rangeFinalProduct)

      }
      
      else if(cate.length>0 && childVlaue.length===0){
        setProducts(cateFiltred.slice(startIndex, endIndex))
        setTotalItems(cateFiltred.length)
        console.log("cate")

     
      }else if(cate.length>0 && childVlaue.length>0){
        console.log("final");
      setProducts(finalProducts.slice(startIndex, endIndex))
      setTotalItems(filteredProduct.length)


      } else {
       // Reset Products to the original response
        const currentProducts = response.slice(startIndex, endIndex);
        setProducts(currentProducts);
        setTotalItems(response.length)

      }





    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  }

  fetchProducts();
}, [cate, childVlaue,startIndex,endIndex]);


const totalPages = Math.ceil(totalItems / itemsPerPage);

      const handleChildValue = (value) => {
        setChildValue(value);
      }


      const priceChange =(value)=>{
setPriceRange(value)


      }


      const handleCat = (values) => {
       setCate(values);
      
      }
   

      const handlePageClick = (page) => {
        setCurrentPage(page);
      };




  return (
    <div>
   <Filter2  onValueChange={handleChildValue} priceChange={priceChange}  onCatChange={handleCat} />
 <Slides  products={Products} />

 <div className='d-flex pagination'>
        {[...Array(totalPages).keys()].map((page) => (
          <div
            key={page}
            className={`page ${page + 1 === currentPage ? 'active-page' : ''}`}
            onClick={() => handlePageClick(page + 1)}
          >
            {page + 1}
          </div>
        ))}
      </div>

    </div>
  )
}
