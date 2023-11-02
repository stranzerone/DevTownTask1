


    import React, { useState,useEffect } from 'react';
    import '../Home/Home.css'; // Import your CSS file for styling
    import { Tooltip } from '@mui/material';
    import { FetchProductDetails } from '../axios/Axios';
    export default function Filter2({onValueChange,onCatChange,priceChange}) {

  
      const [menu,setMenu]=useState(false)
      const [catList, setCatList] = useState(false);
      const [priceList, setPriceList] = useState(false);
      const [brandList, setBrandList] = useState(false);
      const [catego, setCategory] = useState([]);
      const [selectedBrand, setSelectedBrand] = useState([]);
    
      const [selectedPrice, setSelectedPrice] = useState(0);
      const [Products,setProducts] =useState([]);
   
    
    
    
      const handleCheckboxChange = (event) => {
        const checkboxId = event.target.id;
        if (event.target.checked) {
          setCategory((catego) => [
            ...catego,
            checkboxId
          ]);
       
        } else {
          setCategory((catego) =>
            catego.filter((label) => label !== checkboxId)
          );
        }
      };
    
    
    
      const handleInputCheckboxChange = (event) => {
        const checkboxId = event.target.id;
        if (event.target.checked) {
          setSelectedBrand((selectedBrand) => [
            ...selectedBrand,
            checkboxId,
          ]);
        } else {
          setSelectedBrand((selectedBrand) =>
            selectedBrand.filter((label) => label !== checkboxId)
          );
        }
      };
    
      const handlePriceChange = (event) => {
        setSelectedPrice(event.target.value);
        priceChange(event.target.value)
       
      };
    
    
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
      const filteredProducts = Products.filter(product => catego.includes(product.category));
      const brandNames = Array.from(new Set(filteredProducts.map(product => product.brand)));  
    
      const applyFilter = () => {
       
      
    
        // Call the callback function to pass the value to the parent
        onValueChange(selectedBrand);
        onCatChange (catego);
        priceChange(selectedPrice);
       
      }
    
      const handleToggle=()=>{
        setMenu(!menu);
      }

  return (
    <div>{menu?(
    <div className='FilterBox Box my-4 d-flex' > 

        <div className='col-4  bg-light'>
     
          <h1 onClick={() => {setCatList(true);setBrandList(false);setPriceList(false)}}>Category</h1>
          <h1 onClick={() => {
                        setPriceList(!priceList);
                        setCatList(false);
                        setBrandList(false);
                      }}>Price Range</h1>

                     <h1  onClick={() => {
                        setBrandList(!brandList);
                        setCatList(true);
                        setPriceList(false);
                      }}>Brand
                       <Tooltip title="First select category for getting specific brand" >
                   
                   </Tooltip>
                      </h1>
<button onClick={applyFilter}>Apply Filters</button>
        </div>



        <div className='col-4 col-md-4'>
        <div className='cateFilter  '>
                
                {catList ? (
                  <div className='catBox'>
                
                      <label  htmlFor='smartphones'>smartphones</label>
                      <input
                        onChange={handleCheckboxChange}
                        type='checkbox'
                        id='smartphones'
                      />
                      <label htmlFor='laptops'>laptops</label>
                      <input
                        onChange={handleCheckboxChange}
                        type='checkbox'
                        id='laptops'
                      />
                      <label htmlFor='fragrances'>fragrances</label>
                      <input
                        onChange={handleCheckboxChange}
                        type='checkbox'
                        id='fragrances'
                      />
                      <label htmlFor='skincare'>skincare</label>
                      <input
                        onChange={handleCheckboxChange}
                        type='checkbox'
                        id='skincare'
                      />
                      <label htmlFor='groceries'>groceries</label>
                      <input
                        onChange={handleCheckboxChange}
                        type='checkbox'
                        id='groceries'
                      />
                      <label htmlFor='home-decoration'>home-decoration</label>
                      <input
                        onChange={handleCheckboxChange}
                        type='checkbox'
                        id='home-decoration'
                      />
                  
                  </div>
                ) : null}

                <div className='my-5'>
                {priceList ? (
                  <div className='rangeBox'>
                    <label className='range-label' htmlFor='priceRange'>
                      Price Range:
                    </label>
                    <input
                      className='range-input'
                      type='range'
                      id='priceRange'
                      min='0'
                      max='200000'
                      step='1'
                      value={selectedPrice}
                      onChange={handlePriceChange}
                    />
                    <span id='selectedPrice'>{selectedPrice}</span>
                  </div>
                ) : (null)}
                </div>


              </div>


        </div>

        <div className=' brand col-4'>


        <div className='brandFilter'>

{brandList?(
 <div >
                   
  {brandNames.map((brand) => (
    <div key={brand} className='brand Box bg-red d-flex'>
      <label htmlFor={brand}>{brand}</label>
      <input
        onChange={handleInputCheckboxChange}
        type='checkbox'
        name={brand}
        id={brand}
      />
    </div>
  ))}





                  
                    </div>
                  ):null}



</div>

        </div>
    </div>):(
       null
    )}
    <div>
    <div >
       <button className='filterButton' onClick={handleToggle}  >
       <svg className="icon"  xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" class="bi bi-funnel-fill" viewBox="0 0 16 16">
<path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
</svg>
</button>
</div>
    </div>
    </div>
  )
}
