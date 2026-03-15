import React, { useState } from 'react'
import useStore from '../../store/useStore'
import Checkout from '../components/CheckOuts/Checkout'
import { useNavigate } from "react-router-dom"

const CheckoutPage = () => {

  const navigate = useNavigate()
  const AddPedido = useStore((state) => state.addPedidos)
  const prod = useStore((state) => state.Carrito)

  
  const handleConfirm = (nuevoPedido) => {
    
    AddPedido(nuevoPedido)
    console.log('pedido confirmado:', nuevoPedido)
   
    console.log('pedido confirmado:', nuevoPedido)
    navigate('/success' )
  }

  return (
    <div>
      <Checkout productos={prod} onConfirm={handleConfirm} />
       
    </div>
  )
}

export default CheckoutPage
