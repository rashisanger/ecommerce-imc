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

const App = () => {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
     <Routes>
      <Route path='/' element={<UserLayout/>}>
       <Route index element={<Home />} />
       <Route path='login' element={<Login/>}></Route>
       <Route path='register' element={<Register/>}></Route>
       <Route path='profile' element={<Profile/>}></Route>
       <Route path='collections/:collection' element={<Collectionpage/>}></Route>
       <Route path='product/:id' element={<ProductDetails/>}></Route>
       <Route path="checkout" element={<Checkout/>}></Route>
      </Route>
      <Route>{/*Admin Layout*/}</Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App