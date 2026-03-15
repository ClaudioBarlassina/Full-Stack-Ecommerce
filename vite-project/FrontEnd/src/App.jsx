import React from 'react'
import Home from './pages/Home'
import Carrito from './pages/carrito'
import Checkout from './pages/checkout'
import Success from './pages/success'
import { Routes, Route } from "react-router-dom"


const App = () => {
  return (
    <div className='conteiner'>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/carrito" element={<Carrito></Carrito>} />
      <Route path="/checkout" element={<Checkout></Checkout>} />
      <Route path="/producto/:id" element={"<Detalle />"} />
      <Route path="/success" element={<Success />} />
    </Routes>


    
    </div>
  )
}

export default App