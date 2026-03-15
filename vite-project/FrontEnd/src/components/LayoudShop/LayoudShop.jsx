import { useState, useEffect } from 'react'
import styles from './LayoudShop.module.css'
import logo from '../../../public/logo-electroShop.jpg'
import CardCarrito from '../Card1-Carrito/CardCarrito'
import { useNavigate } from "react-router-dom"

import useStore from '../../../store/useStore'

export default function LayoutShop({ children, onSearch, cartOpen, setCartOpen, prod  }) {
  // cart={prod1:[], incr2:0, decr2:0}
  const [menuOpen, setMenuOpen] = useState(false)
 
   const navigate = useNavigate()
  //estados de Zustand
 
  const incr = useStore((state)=> state.addAumentar)
  const decr = useStore((state) => state.addDisminuir)
  const elim  = useStore(state => state. addEliminar)

  const totalCantidad = prod.reduce((acc, item) => {
    return acc + item.cantidad
  }, 0)
  const total = prod.reduce((acc, item) => {
    return acc + item.price * item.cantidad
  }, 0)

  console.log(total)

  return (
    <>
      <header className={styles.navbar}>
        <span className={styles.brand}>
          <img src={logo} style={{ width: 50 }} alt="" />
        </span>

        <input
          type="text"
          className="search"
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className={styles.actions}>
          <button onClick={() => setMenuOpen(true)}>☰</button>
          <button onClick={() => setCartOpen(true)}>
            🛒<span>{totalCantidad}</span>
          </button>
        </div>
      </header>

      <main className={styles.content}>{children}</main>
      <div
        className={`${styles.overlay} ${menuOpen || cartOpen ? styles.overlayOpen : ''}`}
        onClick={() => {
          setMenuOpen(false)
          setCartOpen(false)
        }}
      />

      <aside className={`${styles.drawer} ${menuOpen ? styles.open : ''}`}>
        <button onClick={() => setMenuOpen(false)}>✕</button>

        <a href="/">Inicio</a>
        <a href="/productos">Productos</a>
        <a href="/contacto">Contacto</a>
      </aside>

      <aside className={`${styles.cart} ${cartOpen ? styles.open : ''}`}>
        <button onClick={() => setCartOpen(false)}>✕</button>
        <h3>Carrito</h3>
        <div className={styles.cartContent}>
          {prod.map((item) => (
            <CardCarrito
              key={item.id}
              image={item.image}
              title={item.name}
              price={item.price}
              quantity={item.cantidad}
              onIncrease={() => incr(item.id)}
              onDecrease={() => decr(item.id)}
              onRemove={()=> elim(item.id)}
            />
          ))}
        </div>
        {prod.length > 0 && (
          <div className={styles.cartFooter}>
            <div className={styles.totalRow}>
              <span>Total:</span>
              <strong>${total.toLocaleString()}</strong>
            </div>

            <div className={styles.cartButtons}>
              <button
                className={styles.btnPrimary}
                onClick={() => navigate("/carrito")}
              >
                Finalizar compra
              </button>

              <button
                className={styles.btnSecondary}
                onClick={() => setCartOpen(false)}
              >
                Seguir comprando
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
