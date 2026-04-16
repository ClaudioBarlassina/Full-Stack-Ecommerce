import { useEffect, useState } from 'react'
import { getProducts } from '../api/products.api'
import Layoud from '../components/LayoudShop/LayoudShop'
import Card from '../components/Card1-Ecom/Card'
import Grid from '../components/Grid-Cuadricula/Grid'
import Filtros from '../components/FiltroAutomatico/FiltroAut'
import Paginacion from "../components/PaginacionButon/Paginacion"
import useStore from '../../store/useStore'


export default function Home() {

const [cartOpen, setCartOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [onSearch, setonSearch] = useState("")
  const [pag , setPag] = useState("")
  const [es, setes] = useState(1)
  const [valores, setvalores] = useState({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    search: '',
  })

 const addCarrito = useStore(state => state.addCarrito)
 const prod = useStore(state => state.Carrito)

 console.log(prod)

const handler =(item)=>{
  addCarrito(item)
  setCartOpen(true)
}
 console.log(valores)

  // Traer productos cuando se monta el componente
  useEffect(() => {
    getProducts({ category:valores.category, brand:valores.brand, maxPrice:valores.price, search:onSearch,page:Number(es) }) // opcional: filtros
      .then((res) => {
        // tu backend devuelve JSON
        const prods = res.data.products || res.data
        setProducts(prods.data)
        console.log(prods)
        setPag(prods)
      })
      .catch((err) => console.error('Error al cargar productos:', err))
  }, [valores, onSearch, es])

  return (
    <div className="home">
      <Layoud onSearch={setonSearch} cartOpen={cartOpen} setCartOpen={setCartOpen} prod={prod} >
        <h1 style={{ marginTop: 80, color: 'white', fontFamily: 'sans-serif' }}>
          Productos
        </h1>
        <Paginacion totalPaginas={pag.totalPages} pagina={pag.page} handler={setes} ></Paginacion>

        
        <Filtros
          filters={[
            {
              name: 'category',
              label: 'Categoría',
              options: ['audio', 'gaming', 'telefonia',"tv","computacion","perifericos","monitores","accesorios","hardware","almacenamiento"],
            },
            {
              name: 'brand',
              label: 'Marca',
              options: ['Sony', 'Samsung', 'Apple',"JBL","LG","HP","Logitech","HyperX","ASUS","AMD"],
            },
            {
              name: 'price',
              label: 'Precio',
              options: [{"menor de $100000": 100000},
                {"Hasta  $300.000":300000},
                 {"Hasta  $500.000":500000}
              ],
            },
          ]}
          onChange={setvalores}
        ></Filtros>
        <Grid minWidth={200} gap={20}>
          {products.map((item) => (
            <Card
              title={item.name}
              image={item.image}
              price={item.price}
              action={
                <button style={{ height: 35, borderRadius: 15 }} onClick={()=> handler(item) }>
                  Agregar al carrito
                </button>
              }
            >
              {' '}
            </Card>
          ))}
        </Grid>
      </Layoud>
    </div>
  )
}

