import { useDispatch, useSelector } from 'react-redux'
import { closeFavorites, toggleFavorite, addToCart } from '../../store/productSlice'
import './Favorites.css'

export default function Favorites() {
  const dispatch = useDispatch()
  const favoritesOpen = useSelector(state => state.favoritesOpen)
  const products = useSelector(state => state.products)
  const favorites = useSelector(state => state.favorites)

  const favoriteProducts = favorites.map(id => products.find(p => p.id === id)).filter(Boolean)

  if (!favoritesOpen) return null

  return (
    // go
    <div className="favorites-overlay" onClick={() => dispatch(closeFavorites())}>
      <aside className="favorites-panel" onClick={event => event.stopPropagation()}>
        <div className="favorites-header">
          <h2>Saved Items</h2>
          <button className="favorites-close" type="button" onClick={() => dispatch(closeFavorites())}>✕</button>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="favorites-empty">
            <div className="favorites-empty-icon">♡</div>
            <h3>No saved items yet</h3>
            <p>Items you save will appear here.</p>
          </div>
        ) : (
          <div className="favorites-items">
            {favoriteProducts.map(product => (
              <div key={product.id} className="favorites-item">
                <img src={product.image} alt={product.title} />
                <div className="favorites-item-details">
                  <h4>{product.title}</h4>
                  <p className="favorites-item-price">${product.price[0].toFixed(2)} - ${product.price[1].toFixed(2)}</p>
                  <p className="favorites-item-supplier">{product.supplier}</p>
                  <div className="favorites-item-actions">
                    <button
                      className="favorites-item-add"
                      type="button"
                      onClick={() => dispatch(addToCart(product.id))}
                    >
                      Add to cart
                    </button>
                    <button
                      className="favorites-item-remove"
                      type="button"
                      onClick={() => dispatch(toggleFavorite(product.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>
    </div>
  )
}
