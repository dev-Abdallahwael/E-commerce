import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Layout() {
  return <>
        <Navbar/>
        <div className=' container pb-10 pt-24 md:px-0 px-5'>
            <Outlet/>
        </div>
        <Footer/>
     </>
}
