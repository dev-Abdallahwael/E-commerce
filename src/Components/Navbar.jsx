import React, { useContext, useState, useEffect } from 'react';
import logo from "../assets/imgs/freshcart-logo.svg";
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from './User.context';
import { CartContext } from './Cart.context';

export default function Navbar() {
    const { token, logout } = useContext(UserContext);
    const { cartinfo, GetAddedProducts } = useContext(CartContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        GetAddedProducts();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the menu open/close state
    };

    return (
        <nav className="bg-slate-200 py-5 drop-shadow-md fixed z-50 top-0 left-0 right-0">
            <div className="container flex justify-between items-center">
                <div className="Logo md:ml-0 ml-5">
                    <img src={logo} alt="Logo" className="w-full" />
                </div>

                {/* Navigation Links */}
                <div className="NavLinks text-lg">
                    {token && (
                        <ul className="xl:flex gap-8 font-semibold hidden">
                            <li>
                                <NavLink 
                                    to={"/"} 
                                    className={({ isActive }) => 
                                        isActive ? "text-green-600 font-bold" : "hover:text-green-600 transition delay-100"}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/categories" 
                                    className={({ isActive }) => 
                                        isActive ? "text-green-600 font-bold" : "hover:text-green-600 transition delay-100"}>
                                    Categories
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/allorders" 
                                    className={({ isActive }) => 
                                        isActive ? "text-green-600 font-bold" : "hover:text-green-600 transition delay-100"}>
                                    Orders
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </div>

                {/* Social Media & Cart */}
                <div className="Socialmedia">
                    <ul className="flex gap-6 text-lg justify-center items-center">
                        <li className='md:m-0 -mr-12'>
                            <Link to={'cart'}>
                                <i className="fa-solid fa-cart-shopping hover:scale-110 duration-300"></i>
                                <div className="absolute w-6 h-6 translate-x-4 -translate-y-10 bg-green-600 rounded-full text-sm justify-center flex items-center">
                                    {cartinfo === null ? 
                                        <i className="fa-solid fa-spinner fa-spin text-white"></i> : 
                                        <span className="text-white font-semibold">{cartinfo.numOfCartItems}</span>}
                                </div>
                            </Link>
                        </li>
                        <li>
                            <a href=""><i className="fa-brands fa-facebook hover:text-blue-600 hover:duration-300 hidden md:flex"></i></a>
                        </li>
                        <li>
                            <a href=""><i className="fa-brands fa-instagram hover:text-orange-800 hover:duration-300  hidden md:flex "></i></a>
                        </li>

                        {/* Login & Signup Buttons */}
                        {!token && (
                            <>
                                <li>
                                    <NavLink 
                                        to={"/signup"} 
                                        className={({ isActive }) => 
                                            isActive ? "text-green-600 font-bold" : "hover:text-green-600 transition delay-100 hover:font-semibold"}>
                                        Signup
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to={"/login"} 
                                        className={({ isActive }) => 
                                            isActive ? "text-green-600 font-bold" : "hover:text-green-600 transition delay-100 hover:font-semibold"}>
                                        Login
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {token && (
                            <li onClick={logout}>
                                <NavLink to={"/login"}>
                                    <i className="fa-solid fa-right-from-bracket hover:scale-110 duration-300 md:mr-0 mr-5"></i>
                                </NavLink>
                            </li>
                        )}
                    {/* display Icon for mobile */}
                    <i 
                        onClick={toggleMenu} 
                        className="fa-solid fa-bars mr-5 text-2xl font-semibold  cursor-pointer md:hidden flex"></i>
                    </ul>


                    {/* Mobile Menu */}
                    <div className={` list-none md:hidden absolute top-24 left-0 w-full bg-white flex flex-col gap-5 text-lg justify-center items-center transition-all duration-300 ease-in-out ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}`}>
                    <li>
                            <NavLink 
                                to={"/"} 
                                className={({ isActive }) => 
                                    isActive ? "text-green-600 font-bold" : "hover:text-green-600 transition delay-100"}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/categories" 
                                className={({ isActive }) => 
                                    isActive ? "text-green-600 font-bold" : "hover:text-green-600 transition delay-100"}>
                                Categories
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/allorders" 
                                className={({ isActive }) => 
                                    isActive ? "text-green-600 font-bold" : "hover:text-green-600 transition delay-100"}>
                                Orders
                            </NavLink>
                        </li>
  
                    </div>
                </div>
            </div>
        </nav>
    );
}
