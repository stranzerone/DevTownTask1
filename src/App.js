import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components]/Home/HomePage";
import Products from "./components]/Products/Products";
import Header from "./components]/Home/Header";
import AllProducts from "./components]/Products/AllProducts";
function App() {

return(

  <div>
 
<BrowserRouter>

<div>
  <Header />
</div>
  <Routes>

    <Route path="/" element={<HomePage />}  />
    <Route  path='/product/:cat'  element={<Products />}/>
    <Route  path="/all"   element={<AllProducts />}/>
  </Routes>
</BrowserRouter>


</div>




) 
}

export default App;
