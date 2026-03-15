import styles from './Paginacion.module.css'



export default function Paginacion({ totalPaginas, pagina, handler }) {

  const numeros = [...Array(totalPaginas)].map((_, index) => index + 1)

  return (
    <article>
      {numeros.map((item) => (
        <button
          key={item}
          onClick={() => handler(item)}
          style={{
            background: 'transparent',
            border: pagina === item ? '2px solid white' : '1px solid #000000',
            margin: '5px',
          }}
          className={styles.buttons}
        >
          {item}
        </button>
      ))}
    </article>
  )
}