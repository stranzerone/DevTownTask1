import React from 'react'
import "./Home.css"
import { NavLink } from 'react-router-dom'
export default function Midsection() {
  return (
    <div className='midCoin  mx-5'>

    <div className='col-10   Box1'>
   <NavLink  className="link" to={'/all'}>  <h1 className='my-4'>All products</h1> </NavLink>  
    </div>
<div  className='d-md-flex '>


<div className='Box3 col-9 col-md-5 col-lg-4   my-5'>
 <NavLink  to={"/smartphones"} className="link"> <h1>Electronics</h1></NavLink>  
</div>



<div className='Box4 col-9 col-md-5 col-lg-4  my-5 '>

<NavLink to={"/groceries"}  className="link"><h1>Grocciers</h1></NavLink>

</div>
</div>


<div  className='d-md-flex'>

<div className='Box5 col-9 col-md-5  col-lg-4  my-5 '>
<NavLink to={"/skincare"} className="link"><h1>Skin Care</h1></NavLink>
</div>


<div className='Box6 col-9 col-md-5 col-lg-4 my-5 '>

<NavLink to={"/home-decoration"} className="link"><h1>home-decoration</h1></NavLink>

</div>

</div>











    </div>
  )
}
