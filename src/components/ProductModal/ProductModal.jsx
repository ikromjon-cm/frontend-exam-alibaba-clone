import { useDispatch, useSelector } from 'react-redux'
import { addToCart, closeModal, toggleFavorite, openFavorites, closeFavorites } from '../../store/productSlice'
import './ProductModal.css'

export default function ProductModal() {
  const dispatch = useDispatch()
  const modalProductId = useSelector(state => state.modalProductId)
  const favoritesOpen = useSelector(state => state.favoritesOpen)
  const products = useSelector(state => state.products)
  const favorites = useSelector(state => state.favorites)

  const product = products.find(item => item.id === modalProductId)
  const isFavorite = product ? favorites.includes(product.id) : false

  if (!product) return null

  return (
    <>
      <div className="modal-overlay" onClick={() => dispatch(closeModal())}>
        <div className="product-modal" onClick={event => event.stopPropagation()}>
          <button
            className="product-modal-close"
            type="button"
            onClick={() => dispatch(closeModal())}
          >
            ✕
          </button>

          <div className="product-modal-grid">
            <div className="product-modal-media">
              <img src={product.image} alt={product.title} />
            </div>

            <div className="product-modal-copy">
              <span className="product-modal-badge">{product.badge}</span>
              <h2 className="product-modal-title">{product.title}</h2>
              <p className="product-modal-description">{product.description}</p>

              <div className="product-modal-price">
                <strong>${product.price[0].toFixed(2)}</strong>
                <span>-</span>
                <span>${product.price[1].toFixed(2)}</span>
                <span className="product-modal-price-unit">/ piece</span>
              </div>

              <div className="product-modal-highlights">
                <div>
                  <span className="highlight-label">MOQ</span>
                  <strong>{product.moq} pcs</strong>
                </div>
                <div>
                  <span className="highlight-label">Lead time</span>
                  <strong>{product.leadTime}</strong>
                </div>
                <div>
                  <span className="highlight-label">Supplier</span>
                  <strong>{product.supplier}</strong>
                </div>
                <div>
                  <span className="highlight-label">Response</span>
                  <strong>{product.responseRate}</strong>
                </div>
              </div>

              <div className="product-modal-actions">
                <button
                  type="button"
                  className="product-modal-button primary"
                  onClick={() => {
                    dispatch(addToCart(product.id))
                    dispatch(closeModal())
                  }}
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  className="product-modal-button secondary"
                  onClick={() => dispatch(openFavorites())}
                >
                  {isFavorite ? '♥ Favorite' : '♡ Save favorite'}
                </button>
              </div>

              <div className="product-modal-meta">
                <div>
                  <span>Supplier</span>
                  <strong>{product.supplier}</strong>
                </div>
                <div>
                  <span>Location</span>
                  <strong>{product.location}</strong>
                </div>
                <div>
                  <span>Rating</span>
                  <strong>{product.rating}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {favoritesOpen && (
        <div className="favorites-modal-overlay" onClick={() => dispatch(closeFavorites())}>
          <div className="favorites-modal" onClick={event => event.stopPropagation()}>
            <div className="favorites-modal-header">
              <h3>Add to Favorites</h3>
              <button
                className="favorites-modal-close"
                type="button"
                onClick={() => dispatch(closeFavorites())}
              >
                ✕
              </button>
            </div>

            <div className="favorites-modal-content">
              <div className="favorites-product-card">
                <img src={product.image} alt={product.title} />
                <div className="favorites-product-info">
                  <h4>{product.title}</h4>
                  <p className="favorites-price">${product.price[0].toFixed(2)} - ${product.price[1].toFixed(2)}</p>
                  <p className="favorites-supplier">{product.supplier}</p>
                </div>
              </div>

              <div className="favorites-modal-actions">
                <button
                  type="button"
                  className="favorites-modal-button primary"
                  onClick={() => {
                    dispatch(toggleFavorite(product.id))
                    dispatch(closeFavorites())
                  }}
                >
                  {isFavorite ? '♥ Saved to Favorites' : '♡ Add to Favorites'}
                </button>
                <button
                  type="button"
                  className="favorites-modal-button secondary"
                  onClick={() => dispatch(closeFavorites())}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
