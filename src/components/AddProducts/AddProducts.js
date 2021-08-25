import React, { useState } from 'react';
import { useForm } from "react-hook-form";
const axios = require('axios').default;

const AddProducts = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [imageUrl, setImageUrl] = useState(null);
    //handling form data
    const onSubmit = data => {
        const { name, quantity, price } = data;
        const productData = {
            name: name,
            quantity: quantity,
            price: price,
            imageUrl: imageUrl
        };
        //sending data to backend
        const url = `https://mudi-store.herokuapp.com/addProducts`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData),
        })
            .then(res => {
                console.log(res);
            })

    };


    // uploading image to imagebb server 
    const handleImage = (event) => {
        const imageInfo = event.target.files[0];
        const imageData = new FormData();
        imageData.set('key', 'b4f1417efc14b5a46f1db949319855da');
        imageData.append('image', imageInfo);
        // using axios from github to post image link 
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(response => {
                setImageUrl(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (
        <div className="bg-gray-300 min-h-screen py-4 text-center">
            <h2 className="text-2xl">Add a product</h2>
            <form className="px-32 md:px-64 mt-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="name">Product Name: </label>
                <input name="name" type="text" className=" mt-2 p-1" placeholder="Product Name"{...register("name", { required: true })} /> <br />

                <label htmlFor="quantity">Product Quantity: </label>
                <input name="quantity" type="text" className="mt-2 p-1" placeholder="Product Quantiry"{...register("quantity", { required: true })} /> <br />

                <label htmlFor="price">Product Price: </label>
                <input name="price" type="text" className="mt-2 p-1" placeholder="Product Price"{...register("price", { required: true })} /> <br />
                <input onChange={handleImage} type="file" className="mt-2 p-1" /> <br />

                {errors.Required && <span >This field is required</span>} <br />
                <input className="cursor-pointer mt-2 px-4 py-1" type="submit" />
            </form>

        </div>
    );
};

export default AddProducts;