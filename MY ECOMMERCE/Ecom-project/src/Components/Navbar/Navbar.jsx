import React, {useContext} from  'react'
import {BiCart, BiUser} from 'react-icons/bi'
import './Navbar.css'
import {Link} from 'react-router-dom'
import { ShopContext } from '../ShopContext/ShopContext'

const Navbar = () => {
    window.addEventListener("scroll", function () {
        const navbar = document.querySelector('.navbar')
        navbar.classList.toggle("active" , window.scrollY > 100)
    })
    const {itemAmount} = useContext(ShopContext)
  return (
    <div>
        <div className="navbar">
            <div className="logo">
                <h2>Shopx</h2>
            </div>
            <div className="link">
                <ul>
                    <li>Home</li>
                    <li>Product</li>
                    <li>Contact</li>
                    <li>Use App</li>
                </ul>
            </div>
            <div className="nav_icon_wrapper">
                <Link to='/cart'>
                <div className="nav_cart">
                    <BiCart className='nav_icon' />
                    <p className="nav_cart_amount">{itemAmount}</p>
                </div>
                </Link>
                
                <BiUser className='nav_icon' />
            </div>
            </div>
        </div>
  )
}

export default Navbar