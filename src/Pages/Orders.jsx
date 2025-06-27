import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Components/User.context';
import {jwtDecode} from "jwt-decode"
import axios from 'axios';
import Loading from '../Components/Loading/Loading';

export default function Orders() {

    const [orders , SetOrders ] = useState(null);
    const { token } = useContext(UserContext);
    let {id} = jwtDecode(token) ;

    async function GetUserOrder(params) {  
        const options={
            url:`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
            method:"GET",
        };
        let {data} = await axios.request(options);
        SetOrders(data)
    }

    useEffect(( ) => {
        GetUserOrder()
    },[]);



  return (
    <>

    { orders ?  
       <section >
        {orders.map((order)=>
        <div key={order.id}  className=' border-2 border-opacity-40 p-4 space-y-4 mb-5'>
                <div className='flex justify-between'>
                    <div> 
                        <h1 className='text-gray-700 font-semibold'>Order Id</h1>
                        <h2>#{order.id}</h2>
                    </div>

                    <div className='flex gap-2'>
                        {order.isPaid ?       
                        <h2 className='text-white bg-green-600 rounded-lg px-3 py-1 flex items-center justify-center' >Paid</h2> 
                        :<h2 className='text-white bg-red-600 rounded-lg px-2 py-1 flex items-center justify-center' >Unpaid</h2>
                         }

                         {order.isDelivered ? 
                            <h2 className='text-white bg-blue-600 rounded-lg px-2 py-1 flex items-center justify-center' >Delivered</h2>
                            :<h2 className='text-white bg-blue-600 rounded-lg px-2 py-1 flex items-center justify-center' >Delivering</h2>
                        
                        }
                    </div>
                </div>

                <div className='cart items grid grid-cols-12 gap-3 '>
                        {order.cartItems.map((product)=>(
                                                    <div className='single cartitem md:col-span-3 lg:col-span-2 col-span-6' key={product._id}>
                                                    <div>
                                                        <div className="card border-2 border-opacity-40 space-y-6">
                                                            <img src={product.product.imageCover} alt="product img" className='w-full'/>
                                                            <div className='px-3'>
                                                                <h2 className=' font-semibold text-lg line-clamp-1'>{product.product.title}</h2>
                                                                <h3>{product.price} L.E</h3>
                                                            </div>
                    
                                                        </div>
                                                    </div>
                                                    </div>


                        ))}
                </div>               
                <h1 className='text-lg font-semibold'><i className='fa-solid fa-dollar text-green-600 '></i> Total order price is <span className='text-green-600'></span>{order.totalOrderPrice} L.E</h1>

        </div>)}
       </section> 
             : <Loading/>
  }

    </>
  )
}

