import styles from './Success.module.css'


export default function Success({ order , handler}) {
 



 

  const sampleOrder = {
    id: 4582,
    productos: [
      { nombre: 'Zapatillas Nike', cantidad: 2, precio: 25000 },
      { nombre: 'Remera Adidas', cantidad: 1, precio: 18000 },
    ],
    total: 68000,
  }

  const data = order || sampleOrder // final order data
  
  return (
    <div className={styles.container}>
      <h1>🎉 ¡Gracias por tu compra!</h1>

      <p>
        Tu pedido <strong>#{data.id}</strong> fue confirmado correctamente.
      </p>

      <h2>📦 Resumen del pedido</h2>

      <ul>
        {data.productos.map((p, i) => (
           <li key={i} className={styles.productItem}> 
             <img src={p.image} alt="" style={{width:100, height:100}} />

            {p.name} × {p.cantidad} — ${p.price * p.cantidad}
          </li>
        ))}
      </ul>

      <h3>Total: ${data.total}</h3>

      <p>📧 Te enviamos un email con los detalles de tu compra.</p>
      <button onClick={handler}>Volver</button>
    </div>
  )
}

