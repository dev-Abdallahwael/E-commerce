import React, { useContext } from 'react'
import { CartContext } from './Cart.context';
import { Link } from 'react-router-dom';


export default function Card({productInfo}) {

    const {title,imageCover,category,description,price,ratingsAverage , id} = productInfo; //Objects from the API
    let {AddProduct , AddToWishlist}= useContext(CartContext);
    return (
   <>
        <div className="card group/card md:space-y-4 overflow-hidden shadow-lg rounded-md">
        <div className="imgLayer py-3 relative">
        <img src={imageCover} alt="Product's image" className="mx-auto" />
        {/* Icons Layer */}
        <div className=' Layer group-hover/card:opacity-100 transition-opacity duration-300 flex justify-center items-center absolute bg-slate-400 top-0 left-0 w-full h-full bg-opacity-50 opacity-0'> 
                    <div className="flex items-center justify-center gap-4 text-white">
                        <div onClick={
                            ()=>{
                                AddProduct({productId: id })
                            }
                        } className="cart  bg-green-600 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer  hover:bg-green-800  duration-300">
                            <i className='fa-solid fa-shopping-cart text-lg'></i>
                        </div>

                        {/* linking each product with his id */}
                        <Link to={`/productview/${id}`} className="view  bg-green-600 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer  hover:bg-green-800  duration-300">
                            <i className='fa-solid fa-eye text-lg'></i>
                        </Link>
                        
                    </div>
        </div>
        </div>
        <header className='card body p-5 space-y-3'>
            <h3 className=' capitalize font-semibold text-gray-800 text-lg line-clamp-1'>{title}</h3>
            <h4 className=' font-semibold text-green-600'>{category.name}</h4>
            <p className='text-gray-400 line-clamp-2'>{description}</p>
                <div className='info flex justify-between'>
                    <h3>{price} L.E</h3>
                    <h3><i className=' fa-solid fa-star text-yellow-400'></i> {ratingsAverage}</h3>
                </div>
        </header>
        </div> 
     </>
)
}
