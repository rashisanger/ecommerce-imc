import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import {Toaster} from 'sonner'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Collectionpage from './pages/Collectionpage'
import ProductDetails from './components/Products/ProductDetails'
import Checkout from './components/Cart/Checkout'
import AdminLayout from './components/Admin/AdminLayout'
import AdminHomePage from './pages/AdminHomePage'
import UserManagement from './components/Admin/UserManagement'
import ProductManagement from './components/Admin/ProductManagement'
import EditProductPage from './components/Admin/EditProductPage'
import OrderManagement from './components/Admin/OrderManagement'

import {Provider} from "react-redux";
import store from "./redux/store";
const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Toaster position="top-right" />
     <Routes>
      <Route path='/' element={<UserLayout/>}>
       <Route index element={<Home />} />
       <Route path='login' element={<Login/>}></Route>
       <Route path='register' element={<Register/>}></Route>
       <Route path='profile' element={<Profile/>}></Route>
       <Route path='collections/all' element={<Collectionpage/>}></Route>
       <Route path='product/:id' element={<ProductDetails/>}></Route>
       <Route path="checkout" element={<Checkout/>}></Route>
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        {/*Admin Layout*/}
        <Route index element={<AdminHomePage/>}></Route>
        <Route path="users" element={<UserManagement/>}></Route>
        <Route path="products" element={<ProductManagement/>}></Route>
        <Route path="products/:id/edit" element={<EditProductPage/>}></Route>
        <Route path="orders" element={<OrderManagement/>}></Route>
      </Route>
     </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App