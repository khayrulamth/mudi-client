import React from 'react';

const OderedItems = ({ pd }) => {
    // const {Products} = pd;
    const { name, price, quantity } = pd.Products;
    console.log(pd.Products);
    return (
        <div className="grid mx-4 border-b grid-cols-3 py-2 justify-items-center ">
            <p className=" grid justify-start ">{name}</p>
            <p className=" grid justify-center">{quantity}</p>
            <p className=" grid justify-end pb-2">Tk. {price} </p>
        </div>
    );
};

export default OderedItems;