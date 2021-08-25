import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../App';



const SingleProduct = ({ pd }) => {

    const { imageUrl, name, price, _id,quantity } = pd;
    const [cart, setCart] = useContext(ProductContext)
    const handleBuy = () => {
        const product = {
            id: _id,
            name: name,
            quantity: quantity || 1,
            price: price,
            Url: imageUrl,
        }
        setCart(product);
        console.log(product);
    } 
    return (

        <div className=" mx-auto w-64 md:w-80 border-2 px-2 rounded   mt-4 content-center">
            <div className="cardImage flex flex-col">
                <img className="mx-auto h-64" src={imageUrl} alt="" />
                <p className="flex justify-evenly"><span>{name}</span> <span>৳{price}</span></p>

                <Link to="/checkOut">
                    <button onClick={handleBuy} className="btn-green">Buy Now</button>
                </Link>
            </div>

        </div>

    );
};

export default SingleProduct;