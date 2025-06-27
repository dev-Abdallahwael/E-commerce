import React, { useEffect, useState } from 'react'
import axios from "axios"
import Loading from '../Components/Loading/Loading'
import toast from 'react-hot-toast'

export default function Categories_page() { 

    const [Categories, Setcategories] = useState(null)
    async function GetCategories() {
      let toasid ;
      try {
        const options = {
          url: 'https://ecommerce.routemisr.com/api/v1/categories',
          method: "GET"
        }
        let { data } = await axios.request(options)
        Setcategories(data.data);    
        console.log(data);
        
      } catch (error) {
        toasid= toast.error(error);
      } finally{
        toast.dismiss(toasid);
      }
    }
    useEffect(() => {
      GetCategories()
    }, [])
  
    return (
   <>


          { !Categories ? 
          (
          <Loading />
          ) :
          (
          <div className='grid grid-cols-12 gap-10'>
            {Categories.map((cat) => (
              <div key={cat._id} className=' col-span-6 md:col-span-3'>
                 <img src={cat.image} alt={cat.name} className='h-full w-full object-cover'  />
                 <p className='text-lg font-semibold text-center'>{cat.name}</p>
              </div>
            ))}
          </div>
        )}
        
  </>
    )
  }
  