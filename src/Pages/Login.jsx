import React, { useContext, useState } from 'react'
import {useFormik} from "formik"
import {object, ref, string} from "yup"
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Components/User.context';

export default function Login() {

    let {SetToken}= useContext(UserContext);

    // Login Backend  Errors State 
    const [LiginError , SetLoginError ] = useState(null);

    const Navigate = useNavigate()

    //Sending data to backend then navigation 
    async function sendDataToLogin(values){
        const load = toast.loading("Wait...");
        try {
            const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
            const data = response.data;
            if (data.message === "success") {
                localStorage.setItem("token",data.token)
                SetToken(data.token)
                toast.success("Logged in successfully");
                setTimeout(() => { Navigate("/") }, 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
            SetLoginError(error.response?.data?.message);
        } finally {
            toast.dismiss(load);
        }
    }
    

    // Regex for Password 
    const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

    //Yup Validation
    const validationSchema= object({
        email:string().required("Plz enter valid email").email("Email is invalid"),
        password:string().required("plz enter your password").matches(password,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character")
    })

    //Using Formik with BackEnd Initial values   
    const formik= useFormik({
        initialValues:{
            "email":"",
            "password":"",
        },validationSchema, onSubmit:sendDataToLogin 
    });
    


  return (
    <>
  
    
    <h1 className=' text-2xl text-slate-800 mb-4 md:text-left text-center'><i className="fa-solid fa-user"></i> Login Now :</h1>

    <form onSubmit={formik.handleSubmit} className=' min-h-80 md:px-0 px-5'>

        <div className=' py-2'>
        <label htmlFor="name">Email :</label>
        <input type=" email" placeholder='Emali Adress' className=' w-full border-2 py-2 rounded-lg  ps-3'
        value={formik.values.email} 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name='email'
        />
        {formik.errors.email && formik.touched.email && (<p className=' text-red-600'>{formik.errors.email}</p>)}
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
        {LiginError && (<p  className=' text-red-600'>{LiginError}</p>)}
        </div>

        <button type='submit' className=' bg-green-500 px-7 py-2 rounded-xl flex ml-auto text-white font-semibold hover:bg-green-700 duration-300'>
            Login
        </button>
    </form>
    </>
  )
}