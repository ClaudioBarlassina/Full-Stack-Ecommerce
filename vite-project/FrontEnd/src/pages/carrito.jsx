import React from 'react'
import OrderSummary from '../components/Ordenes_Ecom/OrderSumary/OrderSummary'
import useStore from '../../store/useStore'
import { useNavigate } from 'react-router-dom'

const carrito = () => {
  const navigate = useNavigate()
  const prod = useStore((state) => state.Carrito)
  const incr = useStore((state) => state.addAumentar)
  const decr = useStore((state) => state.addDisminuir)
  const elim = useStore((state) => state.addEliminar)

  const handleContinue = () => {
    navigate('/')
  }
  const handleCheckout = () => {
    navigate('/checkout')
  }
  console.log(prod)

  return (
    <div>
      <OrderSummary
        items={prod}
        onIncrease={incr}
        onDecrease={decr}
        onRemove={elim}
        onCheckout={handleCheckout}
        onContinue={handleContinue}
      />
    </div>
  )
}

export default carrito
