import { useDispatch, useSelector } from 'react-redux'
import { setQuery } from '../../store/productSlice'
import './Hero.css'

export default function Hero() {
  const dispatch = useDispatch()
  const query = useSelector(state => state.searchQuery)

  return (
    <section className="hero">
      <div className="hero-shell">
        <div className="hero-copy">
          <p className="hero-eyebrow">Alibaba-style sourcing</p>
          <h1 className="hero-title">Find verified suppliers and fast shipping</h1>
          <p className="hero-text">
            Search product listings with Redux state, use the cart, and open product details instantly.
          </p>
        </div>

        <div className="hero-search">
          <input
            className="hero-search-input"
            value={query}
            onChange={event => dispatch(setQuery(event.target.value))}
            placeholder="Search products, categories, suppliers"
          />
          <button className="hero-search-button" disabled>
            Search
          </button>
        </div>

        <div className="hero-labels">
          <button className="hero-label" disabled>AI Mode</button>
          <button className="hero-label" disabled>Worldwide</button>
          <button className="hero-label" disabled>Manufacturers</button>
        </div>
      </div>
    </section>
  )
}
