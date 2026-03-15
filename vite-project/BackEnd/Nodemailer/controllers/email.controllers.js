import { sendEmail } from "../services/email2.services.js"

export const confirmEmail = async (req, res) => {

  const { email, nombre, productos, total } = req.body

  // generar lista de productos
  const productosHTML = productos.map(p => {

    const subtotal = p.price * p.cantidad

    return `
      <tr>
        <td>${p.name}</td>
        <td>${p.cantidad}</td>
        <td>$${p.price}</td>
        <td>$${subtotal}</td>
      </tr>
    `
  }).join("")

  await sendEmail({
    to: email,
    subject: "Confirmación de compra",
    html: `
      <h1>Gracias por tu compra ${nombre}</h1>

      <h2>Resumen de tu pedido</h2>

      <table border="1" cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        <tbody>
          ${productosHTML}
        </tbody>

      </table>

      <h3>Total: $${total}</h3>

      <p>Gracias por confiar en nuestra tienda.</p>
    `
  })

  res.json({ ok: true, message: "Email enviado correctamente" })
}