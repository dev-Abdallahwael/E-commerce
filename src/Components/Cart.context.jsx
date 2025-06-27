import { createContext, useContext, useState } from "react";
import  { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);
export default function CartProvider({children}){

    const {token} = useContext(UserContext);    //Token requied in all function headers 

    const [ cartinfo , SetCartInfo ]= useState(null); //Setting cartinfo as null first

    // Adding Products to the cart function 
   async function AddProduct({productId})
   {
    let toastid = toast.loading("Adding product....")
        try {
            const options={
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method:"POST",
                headers:{
                    token
                },
                data:{
                    productId
                }
            }
            let {data} = await axios.request(options);
            if(data.status==="success"){
                toast.success(data.message)
                GetAddedProducts()
            }
            
        } catch (error) {
            toast.error(error)
            
        } finally{
            toast.dismiss(toastid)
        }
    }

    //Getting Added products to cart page to update the state 
    async function GetAddedProducts() {
        try {
           const options={
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method:"GET",
                headers:{
                    token
                }
            }
            let {data} =await axios.request(options);
            SetCartInfo(data);
            
        } catch (error) {
            console.log(error);
        } finally{

        }
        
    }

    // Deleting specific Product from cart 
    async function DeleteProduct({productId}) {

        let toastid = toast.loading("Deleting product....")
        try {
            const options={
                url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method:"DELETE",
                headers:{
                    token
                },
            }
            let {data} = await axios.request(options);
            if(data.status==="success"){
                toast.success("Producted removed")
                SetCartInfo(data);
            }
        } catch (error) {
            toast.error(error)
        } finally {
            toast.dismiss(toastid);
        }

    }

    //Clear All cart
    async function ClearCart() {
        let toastid = toast.loading("Clearing your cart...")
        try {
            const options={
                url:'https://ecommerce.routemisr.com/api/v1/cart',
                method: "DELETE",
                headers:{
                    token
                },
            }
            let {data}=await axios.request(options);

            if(data.message === "success"){
                toast.success("Cart cleared")                
                 SetCartInfo({numOfCartItems:0});
            }
            
        } catch (error) {
            toast.error(error);
        } finally{
            toast.dismiss(toastid);
        }
        
    }

    //Update Count of Products
    async function UpdateCount({ productId , count })
    {
        let toastid = toast.loading("Loading...")         
        try {
             const options={
                 url: ` https://ecommerce.routemisr.com/api/v1/cart/${ productId } `,
                 method:"PUT",
                 headers:{
                     token,
                 },
                 data:{
                     count
                 },
             }
             let {data} = await axios.request(options);

             if(data.status==="success"){
                toast.success("Quantity updated ");
                 SetCartInfo(data);
             }
             
         } catch (error) {
             toast.error(error);
         } finally{
             toast.dismiss(toastid)
         }
     }

    return(
    <>
        {/* Shared values among app */}
        <CartContext.Provider value={{AddProduct , GetAddedProducts ,cartinfo ,DeleteProduct ,ClearCart , UpdateCount }}>
            {children}
        </CartContext.Provider>
    </>
    );  
}