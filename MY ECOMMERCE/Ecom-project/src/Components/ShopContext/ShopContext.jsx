import React, {createContext, useState, useEffect} from 'react';

// create context
export const ShopContext = createContext();

import { productsData } from '../../data';

const ShopContextProvider = ({children}) => {
    // product state
    const [products, setProducts]= useState(productsData);

    // cart state
    const [cart, setCart]= useState([]);

    // amount state
    const [itemAmount, setItemAmount]= useState(0);

    //  total price state
    const[total, setTotal]= useState(0);

    // get total amount
    useEffect(() => {
        const total = cart.reduce((accumulator, currentItem) => {
            const priceAsNumber = parseFloat(currentItem.price);
            if (isNaN(priceAsNumber)) {
                return accumulator;
            }
            return accumulator + priceAsNumber*currentItem.amount
        }, 0);
        setTotal(total);
    }, [cart]);

    //add to cart
    const addToCart = (product,id) => {
        const newItem = {...product, amount: 1};
        
        
        
        // check if an item is already in the cart
        const cartItem = cart.find((item) => {
            return item.id ===id;
        })
    
        if(cartItem) {
            const newCart = [...cart].map((item) => {
                if(item.id === id){
                    return {...item, amount : cartItem.amount +1};
                } else {
                    return item;
                }
            });
            setCart(newCart);
        }else{
            setCart([...cart, newItem])
        }


    }

    // update item amount
    useEffect(() => {
        if (cart) {
            const amount = cart.reduce((accumulator, currentItem) => {
                return accumulator +currentItem.amount;
            }, 0);
            setItemAmount(amount);


        }
    }, [cart])

    


    // remove an item from cart
    const removeFromCart = (id) => {
        const newCart = cart.filter((item) => {
            return item.id !== id;
        });
        setCart(newCart);
    }
    //  clear cart
    const clearCart = () => {
        setCart([]);
    }
    
    //   increase the quantity of an item

     const increaseAmount = (id) => {
        const cartItem = cart.find((item) => item.id ===id);
        addToCart(cartItem, id)
     }
    //  decrease the Quantity of an item
    const decreaseAmount = (id) => {
        const cartItem = cart.find((item) => {
            return item.id === id
    });
    if(cartItem) {
        const newCart = cart.map((item) => {
            if(item.id === id){
                return {...item, amount: cartItem.amount -1};
            } else {
                return item;
            }
        });
        setCart(newCart)
    } else {
        if(cartItem.amount < 2){
            removeFromCart(id);
        }
    }
    }

return <ShopContext.Provider value= {{products, total, addToCart, cart,removeFromCart, clearCart, increaseAmount, decreaseAmount, itemAmount}}>
    {children}
</ShopContext.Provider>
};

export default ShopContextProvider
