import React, { useEffect, useState } from 'react';
import Slides from './Slides';
import { FetchProductDetails } from '../axios/Axios';
import { useParams } from 'react-router-dom';
import Header from '../Home/Header';
export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
const {cat}=useParams();

  const itemsPerPage = 2;
  const totalItems = 6; // 3 pages * 2 items per page

  console.log(cat);
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
    const filteredProducts = products.filter((product) =>
      product.category === cat
    );
    setFilteredProducts(filteredProducts);
  }, [products]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filtered.slice(startIndex, endIndex);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
   
      <div>
        <Slides products={currentProducts} />
      </div>

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
  );
}
