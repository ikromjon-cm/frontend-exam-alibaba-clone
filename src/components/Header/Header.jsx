import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { openCart, openFavorites } from '../../store/productSlice'
import './Header.css'

export default function Header() {
  const dispatch = useDispatch()
  const cartCount = useSelector(state => state.cart.reduce((sum, item) => sum + item.qty, 0))
  const favoriteCount = useSelector(state => state.favorites.length)

  return (
    <header className="header">
      <div className="header-banner">
        <div className="header-bar">
          <div className="header-branding">
            <strong>Alibaba.com</strong>
            <span>Trusted B2B marketplace</span>
          </div>
          <button className="header-button" disabled>Learn More</button>
        </div>
      </div>

      <div className="header-main">
        <div className="header-layout">
          <Link className="header-logo" to="/">
            <span className="brand-mark">Alibaba</span>
            <span className="brand-suffix">.com</span>
          </Link>

          <div className="header-actions">
            <div className="header-region">
              <span>Deliver to:</span>
              <strong>UZ</strong>
            </div>
            <button className="header-pill" disabled>English-UZS</button>
            <button className="header-pill" onClick={() => dispatch(openCart())}>
              Cart ({cartCount})
            </button>
            <button className="header-pill" onClick={() => dispatch(openFavorites())}>
              Favorites ({favoriteCount})
            </button>
            <button className="header-link" disabled>Sign in</button>
            <button className="header-cta" disabled>Create account</button>
          </div>
        </div>
      </div>
    </header>
  )
}
