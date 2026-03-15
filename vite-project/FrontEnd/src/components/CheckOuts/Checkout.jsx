import { useState, useMemo } from 'react'
import styles from './Checkout.module.css'

export default function Checkout({ productos = [], onConfirm , resEmail }) {
  const [delivery, setDelivery] = useState('')
  const [payment, setPayment] = useState('')
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
  })
  const [errors, setErrors] = useState({}) // almacenar mensajes de validación

  const total = useMemo(() => {
    return productos.reduce((acc, item) => acc + item.price * item.cantidad, 0)
  }, [productos])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
    // borrar error de ese campo si existía
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const handleSubmit = async () => {
  // validación básica
  const newErrors = {}

  if (!form.nombre.trim()) newErrors.nombre = 'Nombre requerido'
  if (!form.apellido.trim()) newErrors.apellido = 'Apellido requerido'

  if (!form.email.trim()) {
    newErrors.email = 'Email requerido'
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      newErrors.email = 'Email inválido'
    }
  }

  if (!form.telefono.trim()) newErrors.telefono = 'Teléfono requerido'
  if (!delivery) newErrors.delivery = 'Seleccione forma de entrega'

  if (delivery === 'domicilio' && !form.direccion.trim()) {
    newErrors.direccion = 'Dirección requerida'
  }

  if (!payment) newErrors.payment = 'Seleccione forma de pago'

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors)
    return
  }

  const pedido = {
    cliente: form,
    productos,
    entrega: delivery,
    pago: payment,
    total,
    fecha: new Date(),
  }

  try {

    const res = await fetch("http://localhost:3000/email/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: form.email, nombre: form.nombre + " " + form.apellido, productos, total })
    })

    const data = await res.json()
   
    console.log("respuesta backend", data)

    if (onConfirm) {
      onConfirm(data)
    }

  } catch (error) {
    console.error("Error enviando pedido", error)
  }
}

  return (
    <div className={styles.checkout}>
      {/* 🛒 Resumen */}
      <div className={styles.section}>
        <h2>Resumen del pedido</h2>

        {productos.map((item) => {
          const subtotal = item.price * item.cantidad

          return (
            <div key={item.id} className={styles.itemRow}>
              <div className={styles.image}>
                <img src={item.image} alt={item.title} />
              </div>

              <div className={styles.name}>{item.title}</div>

              <div className={styles.price}>${item.price}</div>

              <div className={styles.quantity}>{item.cantidad}</div>

              <div className={styles.subtotal}>${subtotal}</div>
            </div>
          )
        })}

        <div className={styles.h3}>
          <h3>Total: </h3> <h3>${total}</h3>
        </div>
      </div>

      {/* 📋 Datos */}
      <div className={styles.section}>
        <h2>Datos de contacto</h2>
        <div className={styles.contacto}>
          {' '}
          Contacto
          <input name="nombre" placeholder="Nombre" onChange={handleChange} />
          {errors.nombre && (
            <span className={styles.error}>{errors.nombre}</span>
          )}
          <input
            name="apellido"
            placeholder="Apellido"
            onChange={handleChange}
          />
          {errors.apellido && (
            <span className={styles.error}>{errors.apellido}</span>
          )}
          <input name="email" placeholder="Email" onChange={handleChange} />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
          <input
            name="telefono"
            placeholder="Teléfono"
            onChange={handleChange}
          />
          {errors.telefono && (
            <span className={styles.error}>{errors.telefono}</span>
          )}
        </div>
        <div className={styles.entrega}>
          {' '}
          Entrega
          {/* 🚚 Entrega */}
          <select
            value={delivery}
            onChange={(e) => {
              setDelivery(e.target.value)
              if (errors.delivery) setErrors({ ...errors, delivery: null })
            }}
          >
            <option value="">Forma de entrega</option>
            <option value="retiro">Retiro en local</option>
            <option value="domicilio">Envío a domicilio</option>
          </select>
          {errors.delivery && (
            <span className={styles.error}>{errors.delivery}</span>
          )}
          {delivery === 'domicilio' && (
            <>
              <input
                name="direccion"
                placeholder="Dirección"
                onChange={handleChange}
              />
              {errors.direccion && (
                <span className={styles.error}>{errors.direccion}</span>
              )}
            </>
          )}
        </div>
        <div className={styles.pago}>
          Pago
          {/* 💳 Pago */}
          <select
            value={payment}
            onChange={(e) => {
              setPayment(e.target.value)
              if (errors.payment) setErrors({ ...errors, payment: null })
            }}
          >
            <option value="">Forma de pago</option>
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia</option>
            <option value="mercadopago">Mercado Pago</option>
          </select>
          {errors.payment && (
            <span className={styles.error}>{errors.payment}</span>
          )}
        </div>
        <button onClick={handleSubmit} className={styles.submit}>
          Confirmar Pedido
        </button>
      </div>
    </div>
  )
}
