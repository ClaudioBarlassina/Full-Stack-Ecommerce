import React from "react"
import styles from "../OrderItems/OrderItem.module.css"


const OrderItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove
}) => {

  return (
    <ul className={styles.Tabla_Orden}>
     
     
     
      <li>
        <img
          src={item.image}
          width={80}
          height={80}
          alt={item.name}
        />
      </li>

      <div className={styles.tabla_Orden_NP}>
        {/* tabla_Orden_NP */}
        <li>{item.name}</li>
        <li className={styles.precio}>${item.price}</li>

        <li>
          <div className={styles.tabla_Order_Cantidad}>
            <button onClick={() => onDecrease(item.id)}>-</button>
            <p>{item.cantidad}</p>
            <button onClick={() => onIncrease(item.id)}>+</button>
          </div>
        </li>
      </div>

      <li className={styles.precio}>
        ${item.price * item.cantidad}
      </li>

      <li>
        <button onClick={() => onRemove(item.id)}>
          🗑
        </button>
      </li>
    </ul>
  )
}

export default OrderItem
