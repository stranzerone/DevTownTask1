import React from 'react';
import "../Home/Home.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function Slides({ products }) {
  return (
    <div className='slideCoin col-12'>
    
        {products.length > 0 ? (
          products.map((product, index) => (
            <div className='d-flex slideBox' key={index}>
              <div className='product-img  col-3 bg-dark'>
                <img src={product.thumbnail} alt='product' className='p-image' />
              </div>
              <div className='product-text col-7'>
              <div className='title'> <h1>{product.title}</h1></div>  
                <div className='dis py-2 overflow-hidden'>
                  <p className='text-wrapper text-ellipsis disco'>{product.description}</p>
                </div>
               <div className='price'> <h2>₹{product.price * 100} /-</h2>
                <h3>Rating: {product.rating}</h3>
                </div>
              </div>
              <div className='product-cart col-2'>
                <button className="button" type="submit">
                  <AddShoppingCartIcon /> 
                </button>
              </div>
            </div>
          ))
        ) : (
          <div > Loading Your Products</div>
        )}
    
    </div>
  );
}
