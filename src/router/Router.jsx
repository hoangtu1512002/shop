import React from 'react'
import {Routes, Route} from 'react-router-dom';

import Home from '../pages/home/Home';
import Catelog from '../pages/catalog/CataLog';
import Product from '../pages/product/Product';
import Cart from '../pages/cart/Cart';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/catalog' element={<Catelog></Catelog>}></Route>
      <Route path='/product' element={<Product></Product>}></Route>
      <Route path='/cart' element={<Cart></Cart>}></Route>
    </Routes>
  )
}

export default Router;