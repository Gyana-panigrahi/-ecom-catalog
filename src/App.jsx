import { useState, useEffect } from "react";
import './App.css';
import ProductList from './productList';
import CategoryFilter from "./CategoryFilter";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [error, setError] = useState(null);   

  // Fetch products
  useEffect(() => {
    fetch('http://localhost:8086/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(err => setError(err.message));
  }, []);

  // Fetch categories
  useEffect(() => {
    fetch('http://localhost:8086/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(err => setError(err.message));
  }, []);

  // Handlers
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId ? Number(categoryId) : null);
  };

  // Filter + Sort logic
  const filteredProducts = products
  .filter(product => {
    return (
      (selectedCategory ? product.category?.id === selectedCategory : true) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  })
  .sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  ); 

  return (
    <div className='container'>
      <h1 className="my-4">Product Catalog</h1>

      <div className="row align-items-center mb-4">

        <div className="col-md-3 col-sm-12 mb-2">
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect} 
          />
        </div>

        <div className="col-md-5 col-sm-12 mb-2">
          <input 
            type="text" 
            className="form-control" 
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={handleSearchChange} 
          />
        </div>

        <div className="col-md-4 col-sm-12 mb-2">
          <select 
            className="form-control" 
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="asc">Sort by Price: Low to High</option>
            <option value="desc">Sort by Price: High to Low</option>
          </select>
        </div>

      </div>

      {error && <p style={{color:'red'}}>Error: {error}</p>} 

      {filteredProducts.length ? (
        <ProductList products={filteredProducts} />
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}

export default App;