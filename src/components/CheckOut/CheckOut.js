import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { ProductContext, UserContext } from '../../App';

const CheckOut = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [cart, setCart] = useContext(ProductContext);
    console.log("cart", cart);
    const { name, price, Url } = cart;
    const orderData = { ...loggedInUser, Products:cart, Time: new Date() }
    return (
        <div className="mt-4 text-center">
            <p className=" text-white mt-4 bg-green-700 border-2  px-4 py-1 ">CheckOut</p>
            <p>Email:{loggedInUser.email}</p>

            {
                cart.name ? <div className="product mx-auto p-6 my-16 w-1/2 border-2 ">
                    <img className="h-64 md:h-96 mx-auto" src={Url} alt="Product" />
                    <p>Product: {name}</p>
                    <p>Price: {price} Tk.</p>
                    <button onClick={() => {
                        fetch('https://mudi-store.herokuapp.com/ordered', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(orderData)
                        })
                            .then(res => {
                                console.log(res);
                            })
                        alert("Order Completed");
                        setCart({});
                    }} className="btn-green">CheckOut</button>
                </div> : <Redirect to='/'></Redirect>
            }


        </div>
    );
};

export default CheckOut;