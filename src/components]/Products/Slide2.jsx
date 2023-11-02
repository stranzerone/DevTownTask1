import React, { useState, useEffect } from 'react';
import "../Home/Home.css";
import { FetchProductDetails } from '../axios/Axios';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function Slides() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='slideCoin d-flex'>
      <div className='slideBox d-flex '>
        {currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <div key={index} className='product-item'>
              <div className='product-img bg-dark'>
                <img src={product.thumbnail} alt='product' className='p-image' />
              </div>
              <div className='product-text'>
                <h1>{product.title}</h1>
                <p className='text-wrapper text-ellipsis overflow-hidden'>{product.description}</p>
                <h2>₹{product.price * 100} /-</h2>
                <h3>Rating: {product.rating}</h3>
              </div>
              <div className='product-cart'>
                <button class="btn btn-primary btn-lg" type="submit">
                  <AddShoppingCartIcon /> Add to cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <ul className="pagination">
        {Array.from({ length: pageNumbers }).map((_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
            <button className="page-link" onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
