import React from 'react'
import Success from '../components/Success/Success'
import useStore from '../../store/useStore'
import { useNavigate } from 'react-router-dom'

const SuccessOrder = () => {

const navigate = useNavigate()  
const orden = useStore(state => state.Pedidos)
const limpiar = useStore(state => state.limpiapedidos)


const handlerVolver = () => {
 navigate("/")
  limpiar()
}

  return <div>
 {orden.map(pedido => (
        <Success key={pedido.id} order={pedido} handler={handlerVolver} />
      ))}

  </div>
}

export default SuccessOrder
