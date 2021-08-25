import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../App';
import OderedItems from '../OderedItems/OderedItems';

const Orders = () => {
    let count = 0;
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`https://mudi-store.herokuapp.com/previousOrders?email=`+loggedInUser.email,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
        })
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
    }, [])
    return (
        <div>
            {
                loggedInUser.email?<div className="m-4">
                <p className='text-xl mb-6 text-center'>Previous Orders:</p>
                <div className="grid grid-cols-3 justify-items-center border-b-2 pb-2 ">
                    <p>Name</p>
                    <p>Quantity</p>
                    <p>Price</p>
                </div>
                {
                    products.map(pd => {
                        return <OderedItems key={count=count+1} pd={pd}></OderedItems>
                    })
                }
            </div>: <Redirect to='/login'></Redirect>
            }
        </div>
    );
};

export default Orders;