import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, toggleFavorite } from '../../store/productSlice'
import './Card.css'

export default function Card({ product }) {
  const dispatch = useDispatch()
  const isFavorite = useSelector(state => state.favorites.includes(product.id))

  return (
    <article className="product-card">
      <button
        className={`favorite-button ${isFavorite ? 'favorite-button--active' : ''}`}
        onClick={() => dispatch(toggleFavorite(product.id))}
        type="button"
      >
        {isFavorite ? '♥' : '♡'}
      </button>

      <Link className="product-media" to={`/product/${product.id}`}>
        <img className="product-image" src={product.image} alt={product.title} />
      </Link>

      <div className="product-body">
        <div className="product-meta-row">
          <span className="product-badge">{product.badge}</span>
          <span className="product-category">{product.category}</span>
        </div>

        <Link className="product-title-link" to={`/product/${product.id}`}>
          <h3 className="product-title">{product.title}</h3>
        </Link>

        <p className="product-price">
          <span className="product-price-main">${product.price[0].toFixed(2)}</span>
          <span className="product-price-divider">-</span>
          <span>${product.price[1].toFixed(2)}</span>
          <span className="product-price-unit">/ piece</span>
        </p>

        <p className="product-moq">Min. order: {product.moq} pieces</p>

        <p className="product-supplier">
          <span className="verified-pill">Verified</span>
          <span>{product.supplier}</span>
          <span>{product.years} yrs</span>
        </p>

        <p className="product-stats">
          <span>{product.rating}</span>
          <span>({product.reviews.toLocaleString()} reviews)</span>
          <span>{product.sold.toLocaleString()}+ sold</span>
        </p>

        <p className="product-meta-list">
          <span>{product.location}</span>
          <span>{product.leadTime}</span>
          <span>Response {product.responseRate}</span>
        </p>

        <div className="product-tags">
          {product.tags.map(tag => (
            <span key={tag} className="product-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="product-actions">
          <button
            className="product-action primary"
            type="button"
            onClick={() => dispatch(addToCart(product.id))}
          >
            Add to cart
          </button>
          <Link className="product-action secondary" to={`/product/${product.id}`}>
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}
