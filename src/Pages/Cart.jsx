import React, { useContext, useEffect } from 'react'
import EmtyCart from "../assets/imgs/Empty cart.webp"
import { CartContext } from '../Components/Cart.context'
import Loading from '../Components/Loading/Loading'
import Cartitem from '../Components/Cartitem';
import { Link } from 'react-router-dom';

export default function Cart() {

    //Function call to display Products 
    let {GetAddedProducts , cartinfo ,ClearCart}= useContext(CartContext);
    useEffect(()=>{
        GetAddedProducts()
    },[])
  return (
    <>

    {cartinfo === null ?<Loading/> : 
    
        <section>
            <h1 className=' text-gray-800 md:text-xl text-lg md:text-left text-center font-semibold capitalize mb-5'>your shoping cart</h1>
            {cartinfo.numOfCartItems === 0 ?
                 <div className='flex justify-center items-center '>
                     <img src={EmtyCart} alt="Emty Cart" className='hover:-translate-x-5 hover:-translate-y-5 hover:-rotate-3 transition-all duration-200' />
                 </div> : ( <div className=' space-y-4'>
                    
                               {cartinfo.data.products.map((product)=><Cartitem key={product._id} productInfo={product}/>)} 

                               <div className='flex justify-between items-center mb-5 font-semibold '>
                                    <p className='text-lg capitalize text-gray-800'><i className='fa-solid fa-dollar-sign text-green-600 md:text-lg text-sm font-bold'></i> Your total price is : <span className='text-green-600 font-bold text-lg'>{cartinfo.data.totalCartPrice}</span> LE</p>
                                    <button className=' flex gap-2 items-center bg-red-500 hover:bg-red-700 transition-colors duration-200 text-white px-3 py-2 rounded-xl md:text-lg text-sm' onClick={ClearCart}><i className='fa-solid fa-trash'></i> Clear cart</button>
                               </div>
                               <Link to={"/checkout"}>
                               <button className=' mt-5 w-full bg-green-600 py-2 font-semibold rounded-xl hover:bg-green-900 duration-300 text-white '>Continue to checkout</button>
                               </Link>

                            </div>)
            }

        </section>
    } 
    </>
  )
}
