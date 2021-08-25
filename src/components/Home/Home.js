import React, { useEffect, useState } from 'react';
import ProgressBar from '../ProgressBar';
import SingleProduct from '../SingleProduct/SingleProduct';

const Home = () => {
    let [products, setProducts] = useState([{}]);
    let [reverse,setReverse] = useState([{}]);
    useEffect(() => {
        fetch('https://mudi-store.herokuapp.com/products')
            .then((res) => res.json())
            .then((data) => {               
                setReverse(data);
            })
    }, []);
    products = reverse.reverse();
    
    return (

        <div className="all text-center mx-auto my-16">
            <p className=" text-green-700 text-center text-2xl border-b pb-4 mx-16">Pure Daily Needs At Your Door Steps </p>
            {
                products.length < 2 && <ProgressBar ></ProgressBar>
            }
            <div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-4 mt-4 text-center">

                {
                    products.map(product => <SingleProduct key={product._id} pd={product}></SingleProduct>)
                }
            </div>
           
        </div>
    );
};

export default Home;