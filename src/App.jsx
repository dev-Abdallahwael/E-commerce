import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import toast, { Toaster } from 'react-hot-toast';
import GuestRoute from './Components/GuestRoute';
import UserProvider from "./Components/User.context";
import ProtectedRouter from "./Components/ProtectedRouter";
import CartProvider from "./Components/Cart.context";
import Cart from "./Pages/Cart";
import ProductView from "./Pages/ProductView";
import Checkout from "./Pages/checkout";
import Orders from "./Pages/Orders";
import Categories_page from "./Pages/Categories_page";


function App() {
  
  const routes = createBrowserRouter([
    {
    path: '/',element:(
      <ProtectedRouter>
        <Layout/>
      </ProtectedRouter>
    ),
    children:[{index:true ,element: <Home/>},
              {path:'cart',element: <Cart/>},
              {path:'productview/:id',element: <ProductView/>},
              {path:'checkout' , element: <Checkout/> },
              {path: "/allorders", element: <Orders/> },
              {path: "/categories", element:  <Categories_page/>},
    ],
  },
  {
    path: "/",element:(
      <GuestRoute>
         <Layout/>
      </GuestRoute>
    ),
    children:[
      {path:'login', element:<Login/>},
      {path:'signup', element:<Signup/>},
    ],
  },
  ]);
  return (
    <>
    <UserProvider>
      <CartProvider>
       <RouterProvider router={routes}></RouterProvider>
      </CartProvider>
    </UserProvider>
    <Toaster />

    </>
    
  );
}


export default App;
