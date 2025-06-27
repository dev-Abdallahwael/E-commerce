import React, { useEffect, useState } from 'react'
import Loading from '../Components/Loading/Loading'
import Card from '../Components/Card'
import axios from "axios"
import HomeSlider from '../Components/HomeSlider'
import Catrgories from '../Components/Catrgories'

export default function Home() {
  const [Products, SetProducts] = useState(null)

  async function GetProducts() {
    const options = {
      url: 'https://ecommerce.routemisr.com/api/v1/products',
      method: "GET"
    }
    let { data } = await axios.request(options)
    SetProducts(data.data)
  }
  useEffect(() => {
    GetProducts()
  }, [])

  return (
    <>

    <HomeSlider/>
    <Catrgories/>

      {!Products ? (
        <Loading />
      ) : (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
          {Products.map((Product) => (
            <Card key={Product.id} productInfo={Product} />
          ))}
        </div>
      )}
      
    </>
  )
}
