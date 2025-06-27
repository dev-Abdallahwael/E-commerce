import React, { useContext } from 'react'
import { CartContext } from './Cart.context';
import { Link } from 'react-router-dom';
export default function Cartitem({productInfo}) {

    const{count ,price, product}= productInfo;
    const {title , imageCover , category , id}= product;

    // Delete product function from cart context
     let { DeleteProduct , UpdateCount } = useContext(CartContext);

     

  return (
    <>
    <div className='flex md:flex-row flex-col gap-2'>
        <div className="cartitem flex md:grow items-center justify-between bg-gray-200 py-4 px-6 rounded-lg">
            <img src={imageCover} alt={title} className=' rounded-full w-24 h-24 object-cover border-4  border-white md:mr-0 mr-1' />
            <div className='flex md:flex-row flex-col md:mx-0 mx-3'>

                <h3 className=' text-gray-700 font-semibold md:text-lg md:pr-24 cursor-pointer line-clamp-1'><Link to={`/productview/${id}`}>{title}</Link></h3>
                <h4 className=' text-gray-500 font-semibold text-sm md:text-lg'>{category.name}</h4>
            </div>
            <div className="count flex flex-col md:flex-row items-center md:items-center md:space-x-4">
            <div className="flex items-center">
                <span className='pr-3 font-semibold'>{count}</span>
                <div className="count_icons space-y-3">
                <div
                    className="plus flex cursor-pointer bg-white w-10 h-10 justify-center items-center rounded-full border-2 border-white hover:border-gray-700 duration-300 md:mr-0 mr-1"
                    onClick={() => UpdateCount({ productId: id, count: count + 1 })}
                >
                    <i className='fa-solid fa-plus'></i>
                </div>
                <div
                    className="minus flex cursor-pointer bg-white w-10 h-10 justify-center items-center rounded-full border-2 border-white hover:border-gray-700 duration-300"
                    onClick={() => UpdateCount({ productId: id, count: count - 1 })}
                >
                    <i className='fa-solid fa-minus'></i>
                </div>
                </div>
                </div>

                <span className='font-semibold mt-3 md:mt-0'><i className='fa-solid fa-dollar-sign text-green-600 md:text-lg text-sm font-bold'></i> {price} L.E</span>
        </div>
        </div>



        {/* Delete product btn  */}
        <div className="delete flex items-center justify-center bg-gray-200 py-4 px-5 rounded-lg ">
            <button className='flex cursor-pointer justify-center items-center  duration-200'
             onClick={
                 () => {
                    DeleteProduct({productId: id}); //Arrow function to take prams that is productid 
                 }}>
                < i className='fa-solid fa-trash text-2xl text-red-500 hover:text-red-700 transition-colors duration-200'></i>
            </button>
        </div>
    </div>
    </>
  )
}
