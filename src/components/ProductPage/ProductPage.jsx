import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, openCart, toggleFavorite } from '../../store/productSlice'
import Card from '../Card/Card'
import './ProductPage.css'

export default function ProductPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const favorites = useSelector(state => state.favorites)
  const product = products.find(item => item.id === Number(id))

  if (!product) {
    return (
      <main className="single-page">
        <div className="single-empty">
          <h1>Product not found</h1>
          <Link className="single-back" to="/">Back to products</Link>
        </div>
      </main>
    )
  }

  const isFavorite = favorites.includes(product.id)
  const relatedProducts = products
    .filter(item => item.category === product.category && item.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    dispatch(addToCart(product.id))
    dispatch(openCart())
  }

  return (
    <main className="single-page">
      <div className="single-shell">
        <Link className="single-back" to="/">Back to marketplace</Link>

        <section className="single-grid">
          <div className="single-gallery">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="single-info">
            <div className="single-meta">
              <span>{product.badge}</span>
              <span>{product.category}</span>
            </div>

            <h1>{product.title}</h1>
            <p className="single-description">{product.description}</p>

            <div className="single-price">
              <strong>${product.price[0].toFixed(2)}</strong>
              <span>-</span>
              <strong>${product.price[1].toFixed(2)}</strong>
              <small>/ piece</small>
            </div>

            <div className="single-stats">
              <div>
                <span>Min. order</span>
                <strong>{product.moq} pcs</strong>
              </div>
              <div>
                <span>Lead time</span>
                <strong>{product.leadTime}</strong>
              </div>
              <div>
                <span>Rating</span>
                <strong>{product.rating}</strong>
              </div>
              <div>
                <span>Response</span>
                <strong>{product.responseRate}</strong>
              </div>
            </div>

            <div className="single-actions">
              <button type="button" className="single-primary" onClick={handleAddToCart}>
                Add to cart
              </button>
              <button
                type="button"
                className="single-secondary"
                onClick={() => dispatch(toggleFavorite(product.id))}
              >
                {isFavorite ? 'Saved favorite' : 'Add to favorite'}
              </button>
            </div>

            <div className="single-supplier">
              <h2>{product.supplier}</h2>
              <p>{product.location} | {product.years} years | {product.sold.toLocaleString()}+ sold</p>
            </div>

            <div className="single-tags">
              {product.features.map(feature => (
                <span key={feature}>{feature}</span>
              ))}
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="single-related">
            <div className="section-heading">
              <p className="section-eyebrow">Related products</p>
              <h2 className="section-title">More from {product.category}</h2>
            </div>
            <div className="product-grid">
              {relatedProducts.map(item => (
                <Card key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
