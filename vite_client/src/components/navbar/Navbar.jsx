import React from 'react'
import './Navbar.css'

const Navbar = () => {
  
  return (
    
    <div className="nav_container">

        <div className = 'navbar'>
            <div className = "nav-logo">
              <p>AD</p>
            </div>
            <ul className= "nav-menu">
                <li><a href="/">Overview</a></li>
                <li><a href="/">Logout</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar