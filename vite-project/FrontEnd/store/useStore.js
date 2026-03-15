import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

const useStore = create(
  devtools(
    persist(
      (set, get) => ({
        Carrito: [],
        Pedidos: [],

        // 🛒 Agregar al carrito
        addCarrito: (producto) =>
          set((state) => {
            const existe = state.Carrito.find(
              (item) => item.id === producto.id
            )

            if (existe) {
              return {
                Carrito: state.Carrito.map((item) =>
                  item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
                ),
              }
            }

            return {
              Carrito: [
                ...state.Carrito,
                { ...producto, cantidad: 1 }
              ],
            }
          }),

        // ➕ Aumentar cantidad
        addAumentar: (id) =>
          set((state) => ({
            Carrito: state.Carrito.map((item) =>
              item.id === id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            ),
          })),

        // ➖ Disminuir cantidad
        addDisminuir: (id) =>
          set((state) => ({
            Carrito: state.Carrito
              .map((item) =>
                item.id === id
                  ? { ...item, cantidad: item.cantidad - 1 }
                  : item
              )
              .filter((item) => item.cantidad > 0),
          })),

        // ❌ Eliminar producto
        addEliminar: (id) =>
          set((state) => ({
            Carrito: state.Carrito.filter((item) => item.id !== id),
          })),

        // 🧾 Crear pedido (sin backend)
        addPedidos: (cliente) => {
          const carritoActual = get().Carrito

          const total = carritoActual.reduce(
            (acc, item) => acc + item.price * item.cantidad,
            0
          )

          const nuevoPedido = {
            id: Date.now(),
            cliente,
            productos: carritoActual,
            total,
            fecha: new Date().toLocaleString(),
          }

          set((state) => ({
            Pedidos: [...state.Pedidos, nuevoPedido],
            Carrito: [], // limpiar carrito después de crear pedido
          }))
        },

        // 🧹 Limpiar carrito
        limpiaCarrito: () => set({ Carrito: [] }),
         // 🧹 Limpiar pedidos
        limpiapedidos: () => set({ Pedidos: [] }),


        // 📊 Obtener total carrito
        getTotalCarrito: () => {
          return get().Carrito.reduce(
            (acc, item) => acc + item.precio * item.cantidad,
            0
          )
        },
      }),
      {
        name: "StorePersist",

        // 🔥 Ahora sí persistimos lo correcto
        partialize: (state) => ({
          Carrito: state.Carrito,
          Pedidos: state.Pedidos,
        }),
      }
   )
  )
)

export default useStore