import styles from "./Card.module.css"

export default function Card({
  image,
  title,
  price,
  children,
  action,
  className = ""
}) {
  return (
    <article className={`${styles.card} ${className}`}>
      
      {image && (
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} />
        </div>
      )}

      <div className={styles.content}>
        {title && <h3 className={styles.title}>{title}</h3>}
        
        {price && <span className={styles.price}>${price}</span>}

        {children}
      </div>

      {action && (
        <div className={styles.footer}>
          {action}
        </div>
      )}
    </article>
  )
}
