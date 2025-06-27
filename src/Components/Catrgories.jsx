import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from './Loading/Loading';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import { Autoplay } from 'swiper/modules';

export default function Catrgories() {
    const [categories , SetCategories] = useState(null);
    async function GetCategories(){
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/categories",
            method: "GET"
        }
        let { data } = await axios.request(options);
        SetCategories(data.data);
    }
    useEffect(()=>{
        GetCategories();
    },[])
     
  return (
    <>
    <section className='my-10 shadow-sm rounded-sm md:block hidden'>
        <h1 className=' text-xl font-semibold text-gray-800 mb-3'>Categories</h1>
        {! categories ? <Loading/> : (
            <Swiper 
            slidesPerView={5} 
            loop={true} 
            spaceBetween={15}
            modules={[Autoplay]} //Autoplay module
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}>
              {categories.map(categorie=><SwiperSlide key={categorie._id}>
                <div className='md:h-64 h-32 '>
                    <img className=' h-full w-full mb-8 object-cover' src={categorie.image} alt="categorie img" />
                </div>
                    <h3 className=' text-center font-semibold md:text-lg  text-sm'>{categorie.name}</h3>
              </SwiperSlide> )}
            </Swiper>
        )
        }
    </section>    
    </>
  )
}
