import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

const ManageProduct = () => {
    const [products, setProducts] = useState([])
    const [editable, setEditable] = useState(false)
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    let [event, setEvent] = useState('');
    useEffect(() => {
        fetch('http://localhost:4000/products')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            })
    }, [])

    const deleteProduct = (event, id) => {
        fetch(`http://localhost:4000/delete/${id}`, {
            method: 'DELETE',
        })
            .then(result => {
            })
        alert('Product deleted successfully');
    }

    const handleBlur = (e) => {
        setEvent(e);
    }

    const editProduct = (pdt,id) => {
        
        if (event.target.name === 'name') {
            setName(event.target.value);
        }
        else{
            setName(pdt.name);
        }
        if (event.target.name === 'price') {
            setPrice(event.target.value);
        }
        else{
            setPrice(pdt.price);
        }
        if (event.target.name === 'quantity') {
            setQuantity(event.target.value);
        }
        else{
            setQuantity(pdt.quantity);
        }

        const product = { name, quantity, price }
        console.log(product);
        fetch(`http://localhost:4000/edit/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
            })
    }

    return (
        <div className="products">
            <div className="grid grid-cols-4 mx-4 border-b grid-cols-3 py-2 justify-items-center ">
                <p className=" ">Name</p>
                <p className=" ">Quantity</p>
                <p className=" ">Price</p>
                <p>Action</p>
            </div>
            {
                products.map(pdt => {
                    return <div className="">
                        {
                            editable && <div key={pdt._id} className="grid mx-4 border-b grid-cols-4 pt-4 justify-items-center ">
                                <input onBlur={handleBlur} type="text" name="name" id="name" defaultValue={pdt.name} />
                                <input onBlur={handleBlur} type="text" name="quantity" id="quantity" defaultValue={pdt.quantity} />
                                <input onBlur={handleBlur} type="text" name="price" id="price" defaultValue={pdt.price} />
                                <button onClick={() =>{editProduct(pdt,pdt._id)}} className="btn-green">Done</button>
                            </div>

                        }
                        {
                            !editable && <div key={pdt._id} className="grid mx-4 border-b grid-cols-4 pt-4 justify-items-center ">
                                <p name="name" className=" ">{pdt.name}</p>
                                <p name="quantity" className=" ">{pdt.quantity}</p>
                                <p name="price" className=" ">Tk.{pdt.price}  </p>
                                <p className='flex justify-between text-xl'>
                                    <EditOutlined onClick={() => { setEditable(true) }} className='mr-2 cursor-pointer p-1 hover:bg-green-700' />
                                    <DeleteTwoTone onClick={(event) => deleteProduct(event, pdt._id)} className='ml-2 cursor-pointer p-1 hover:bg-red-700' />
                                </p>
                            </div>
                        }
                    </div>
                })
            }
        </div>
    );
};

export default ManageProduct;