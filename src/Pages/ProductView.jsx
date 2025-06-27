import React, { useContext, useEffect, useState } from 'react'
import test from"../assets/imgs/test-image.png"
import axios from 'axios';
import Loading from '../Components/Loading/Loading';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Components/Cart.context';
import ReactImageGallery from 'react-image-gallery';

export default function ProductView() {

    const [ productDetails , setProductDetails ] = useState(null);

    let {id} = useParams(); // to get the id from the routing 

    const {AddProduct} =useContext(CartContext); // TO have access to the shared function of adding the product to cart from the Cart Context 

    //Specific products function 
    async function GetSpecificProduc() {
        try {
            const options={
                url: `https://ecommerce.routemisr.com/api/v1/products/${id}`, // Id for each product using the useprams to get it from the routing 
                method: "GET"
            }
            let {data} = await axios.request(options);
            //Chnage the state 
            setProductDetails(data.data);
        
        } catch (error) {
            console.log(error); 
        }
    }

    useEffect(() => {
        GetSpecificProduc()
    })

  return (
    <>

    {productDetails ?
        <section className="container grid grid-cols-12 gap-3 md:gap-8">

        <div className='md:col-span-3 col-span-12'>
            <ReactImageGallery 
            //Adjusting the props 
            useBrowserFullscreen={false}
            showPlayButton={false}
            showNav={false}
            items={productDetails.images.map((image)=>{
                return{
                    original: image,
                    thumbnail: image
                }
            })}  />
        </div>
 
         <div className='md:col-span-9 col-span-12 space-y-3'>

            <h1 className=' text-gray-800 font-semibold text-2xl '>{productDetails.title}</h1>
            <h3 className=' text-green-600 font-semibold text-lg'>{productDetails.category.name}</h3>
            <p className='text-gray-500'>{productDetails.description}</p>
            <div className=' flex justify-between font-semibold'>
                <h3>{productDetails.price} L.E</h3>
                <h3><i className='fa-solid fa-star text-yellow-400'></i> {productDetails.ratingsAverage}</h3>
            </div>
            <button onClick={ ()=>{
                AddProduct({ productId: id})
            } }
            
            className='w-full bg-green-600 py-2 font-semibold rounded-xl hover:bg-green-900 duration-300 text-white '>Add to cart </button>
         </div>
        </section>   

    :
    <Loading/>
    
    }

    </>
  )
}
