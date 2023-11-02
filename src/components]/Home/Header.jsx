import React from 'react'
import "./Home.css"
import SearchBar from './SearchBar'
import { NavLink } from 'react-router-dom'
export default function Header() {
  return (
    <div className='headerCoin '>
    
    <div className='head d-flex'>

<div className='logo col-2' >
<NavLink to={'/'}><h1>SM</h1></NavLink>
</div>
<div className='col-6'>
<SearchBar />

</div>

    </div>
    
    </div>
  )
}
