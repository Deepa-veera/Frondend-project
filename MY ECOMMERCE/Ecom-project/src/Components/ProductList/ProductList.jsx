import React, {useContext} from 'react'

import { ShopContext } from '../ShopContext/ShopContext'
import './ProductList.css'
import {Link} from 'react-router-dom'

const ProductList = () => {
    const {products,addToCart} = useContext(ShopContext);
  return (
    <div>
        <div className="product_list">
            <h2>Our Elegant Collections</h2>
            <div className="product_grid">
                {products.map((product) => {
                    // destructure products
                    const {id, image, title, price} = product;
                    return(
                        <div className="product_card" key={id}>
                        <Link to={`/product/${product.id}`} key={product.id}>
                         <img src={image} alt="" className='product-img'/>
                   <div className="product_info">
                                <h4>{title}</h4>
                                <p>$ {price}</p>
                        </div>
                        </Link>
                        <button onClick={() =>addToCart(product, id)} className='add-to-cart'>Add to Cart</button>
                    </div>
                    )
                })}

            </div>
        </div>
    </div>
  )
}

export default ProductList