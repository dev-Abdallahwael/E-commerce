import { useFormik } from 'formik'
import React, {  useContext, useState } from 'react'
import { object, string } from 'yup';
import { CartContext } from '../Components/Cart.context';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Components/User.context';

export default function Checkout() {
    //getting the cart info
    const { cartinfo } = useContext(CartContext);
    const { token } = useContext(UserContext);

    //Payment state 
    const [Payment , SetPayment] = useState(null)

    //To navigate after submiting 
    const navigate = useNavigate()

     // Regex for Pass and Phone 
     const phone =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

     //Yup validation
     const validationSchema = object({
        shippingAddress: object({
          city: string().required("Please enter your city").min(3, "Minimum 3 letters").max(10, "Max 10 letters"),
          phone: string().required("Please enter your phone number").matches(phone, "Invalid phone number"),
        })
      });

    //Formik
    const formik =useFormik({
        initialValues:{
                shippingAddress:{
                    details: "",
                    phone: "",
                    city: ""
              },
        },validationSchema , onSubmit: (values)=>{ 
            if( Payment ==="cash") {
                CashOrder();
            }else{
                OnlinePayment();
            }
        } 
    })

    //Cash function
    async function CashOrder(values) {
        let toastid = toast.loading("We are creating your order...");
        try {
            const options={
                url: `https://ecommerce.routemisr.com/api/v1/orders/${cartinfo.cartId}`, 
                method: "POST",
                headers:{
                    token
                },
                data:values,
            }
            let {data}= await axios.request(options);
            if(data.status==="success"){
                toast.success("Order created");

                setTimeout(() => {
                    navigate("/allorders")
                }, 2000);
            }
        } catch (error) {
            toast.error(error);
            
        } finally{
            toast.dismiss(toastid);
        }
        
    }

    //Online pay
    async function OnlinePayment(values) {
        let toastid = toast.loading("We are creating your order...");
        try {
            const options={
                url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartinfo.cartId}?url=${location.origin}`, 
                method: "POST",
                headers:{
                    token
                },
                data:values,
            }
            let {data}= await axios.request(options);
            if(data.status==="success"){
                toast.success("Redirecting to stripe");
                if(data.status==="success"){
                    location.href= data.session.url
                }
            }
        } catch (error) {
            toast.error(error);           
        } finally{
            toast.dismiss(toastid);
        }
    }
 
    return (
    <>

    
    <section>
        <h1 className=' text-2xl text-slate-800 mb-4 md:text-left text-center'><i className="fa-solid fa-location-dot"></i> Shipping Address </h1>
        <form onSubmit={formik.handleSubmit} className='min-h-80 md:px-0 px-5'>
            <div className=' py-2'>
            <input type="text" placeholder='City' className=' w-full border-2 py-2 rounded-lg  ps-3 '
            value={formik.values.shippingAddress.city} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name='shippingAddress.city' 
            />
            {formik.touched.shippingAddress?.city && formik.errors.shippingAddress?.city &&
            (<p className='text-red-600'>{formik.errors.shippingAddress.city}</p> )}       
            </div>
        
            <div className=' py-2'>
            <input type="tel" placeholder='Phone number' className=' w-full border-2 py-2 rounded-lg  ps-3'
            value={formik.values.shippingAddress.phone} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name='shippingAddress.phone'
            />
            {formik.touched.shippingAddress?.phone && formik.errors.shippingAddress?.phone &&
            (<p className='text-red-600'>{formik.errors.shippingAddress.phone}</p> )}     
            </div>
            
            <div className=' py-2'>
            <textarea  placeholder='Details' className=' w-full border-2 py-2 rounded-lg  ps-3'
            value={formik.values.shippingAddress.details} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name='shippingAddress.details'
            />
            </div>

            <div className='flex gap-4'>

                <button 
                onClick={()=>{
                    SetPayment("cash")
                }}
                type='submit'
                className=' bg-green-600 px-1 py-2 md:px-7 md:py-2 rounded-xl flex text-white font-semibold hover:bg-green-800 duration-300 text-sm md:text-lg'>
                    Cash payment
                </button>

                <button
                onClick={()=>{
                    SetPayment("online")
                }}
                 type='submit'
                 className=' bg-blue-500 px-1 py-2 md:px-7 md:py-2 rounded-xl flex text-white font-semibold hover:bg-blue-800 duration-300 text-sm md:text-lg'>
                    Online payment
                </button>
            </div>
        </form>
    </section>      
    </>
  )
}