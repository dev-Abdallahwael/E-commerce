import React from 'react'
import paypal from "../assets/imgs/paypal.png"
import amazon from "../assets/imgs/amazon-pay.png"
import mastercard from "../assets/imgs/mastercard.webp"
import americanExpress from "../assets/imgs/American-Express-Color.png"
export default function Footer() {
  return (
    <>
    <footer className=' bg-slate-200 py-6'>
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">

                <div className=' py-6'>
                <h1 className='text-2xl capitalize font-bold text-slate-700'>Our paying partners</h1>
                <div className="flex gap-5 py-3">
                    <img src={paypal} alt="paypal" className=' w-20' />
                    <img src={mastercard} alt="Mater card"  className=' w-20'/>
                    <img src={americanExpress} alt="American express" className=' w-20' />
                </div>

                </div>

                <div className='Socialmedia' >
                <h1 className=' text-2xl capitalize font-bold text-slate-700'>Contact us</h1>

                    <ul className='flex text-2xl gap-5 py-3 justify-center md:justify-start'>
                        
                    <li>
                        <a href=""><i className="fa-brands fa-facebook hover:text-blue-600 hover:duration-300"></i></a>
                    </li>
                    <li>
                        <a href=""><i className="fa-brands fa-instagram  hover:text-orange-800 hover:duration-300"></i></a>
                    </li>
                    </ul>

                </div>
            </div>

    </footer>
    
    </>
  )
}
