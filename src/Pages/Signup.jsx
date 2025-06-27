import React, { useState } from 'react'
import {useFormik} from "formik"
import {object, ref, string} from "yup"
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function Signup() {
    
    // Email Backend  Errors State 
    const [accountError , SetAAccountExistError ]=useState(null);

    const Navigate = useNavigate()

    //Sending data to backend then navigation 
    async function sendData(values){
        const load = toast.loading("Wait...");
        try {
            const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
            const data = response.data;
    
            if (data.message === "success") {
                toast.success("Completed");
                setTimeout(() => { Navigate("/login") }, 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
            SetAAccountExistError(error.response?.data?.message);
        } finally {
            toast.dismiss(load);
        }
    }
    

    // Regex for Pass and Phone 
    const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    const phone =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    //Yup Validation
    const validationSchema= object({
        name:string().required("Plz enter your name ").min(3,"enter minimum of 3 letters").max(20,"20 letters maximum"),
        email:string().required("Plz enter valid email").email("Email is invalid"),
        password:string().required("plz enter your password").matches(password,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
        rePassword: string().required("plz confirm your password").oneOf([ref('password')], "password and repassword don't match"),
        phone:string().required("plz enter your phone no").matches(phone , "Enter valid phone number")
    })
    
    //Using Formik with BackEnd Initial values
    const formik= useFormik({
        initialValues:{
            "name": "",
            "email":"",
            "password":"",
            "rePassword":"",
            "phone":""
        },validationSchema, onSubmit:sendData
    });
    

  return (
    <>

    <h1 className=' text-2xl text-slate-800 mb-4 md:text-left text-center'><i className="fa-solid fa-user "></i> Register Now :</h1>
    <form onSubmit={formik.handleSubmit} className='min-h-80 md:px-0 px-5'>
        
        <div className=' py-2'>
        <label htmlFor="name">Name :</label>
        <input type="text" placeholder='Name' className=' w-full border-2 py-2 rounded-lg  ps-3 '
         value={formik.values.name} 
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         name='name' 
         />
         {formik.errors.name && formik.touched.name && (<p className=' text-red-600'>{formik.errors.name}</p>)}
        </div>

        <div className=' py-2'>
        <label htmlFor="name">Email :</label>
        <input type=" email" placeholder='Emali Adress' className=' w-full border-2 py-2 rounded-lg  ps-3'
        value={formik.values.email} 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name='email'
        />
        {formik.errors.email && formik.touched.email && (<p className=' text-red-600'>{formik.errors.email}</p>)}
        {accountError && (<p className='text-red-600'>{accountError}</p>)}

        </div>


        <div className=' py-2'>
        <label htmlFor="name">Password :</label>
        <input type="password" placeholder='Password' className=' w-full border-2 py-2 rounded-lg  ps-3'
        value={formik.values.password} 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name='password'
        />
        {formik.errors.password && formik.touched.password && (<p className=' text-red-600'>{formik.errors.password}</p>)}

        </div>

        <div className=' py-2'>
        <label htmlFor="name">Re Password :</label>
        <input type="password" placeholder='Confirm password' className=' w-full border-2 py-2 rounded-lg  ps-3'
        value={formik.values.rePassword} 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name='rePassword'
        />
        {formik.errors.rePassword && formik.touched.rePassword && (<p className=' text-red-600'>{formik.errors.rePassword}</p>)}
        </div>


        <div className=' py-2'>
        <label htmlFor="name">Phone :</label>
        <input type="tel" placeholder='Phone number' className=' w-full border-2 py-2 rounded-lg  ps-3'
        value={formik.values.phone} 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name='phone'
        />
      {formik.errors.phone && formik.touched.phone && (<p className=' text-red-600'>{formik.errors.phone}</p>)}
        </div>

        <button type='submit' className=' bg-green-500 px-7 py-2 rounded-xl flex ml-auto text-white font-semibold hover:bg-green-700 duration-300'>
            Signup
        </button>

    </form>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </>
  )
}
