import { useSelector } from 'react-redux'
import Card from '../Card/Card'

export default function ProductList() {
  const products = useSelector(state => state.products)
  const query = useSelector(state => state.searchQuery)
  const activeCategory = useSelector(state => state.activeCategory)

  const searchText = query.toLowerCase()
  const visibleProducts = products
    .filter(product => {
      const inCategory = activeCategory === 'All' || product.category === activeCategory
      const matchesQuery =
        product.title.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText) ||
        (product.description || '').toLowerCase().includes(searchText)
      return inCategory && matchesQuery
    })
    .sort((left, right) => {
      if (left.title > right.title) return 1
      if (left.title < right.title) return -1
      return 0
    })

  const featuredProducts = visibleProducts.slice(0, 8)
  const readyProducts = visibleProducts.slice(0, 4)
  const bestSelling = visibleProducts.slice(4, 8)

  return (
    <>
      <section className="page-section">
        <div className="section-heading">
          <p className="section-eyebrow">Featured highlights</p>
          <h2 className="section-title">Products selected for your sourcing flow</h2>
          <p className="section-copy">
            Search with Redux state, open cart, select categories, and view product details.
          </p>
        </div>

        <div className="feature-grid">
          <article className="hero-quick-card">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"
              alt="Custom design"
            />
            <div className="hero-quick-overlay">
              <strong>Custom design</strong>
            </div>
          </article>
          <article className="hero-quick-card">
            <img
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80"
              alt="Bulk orders"
            />
            <div className="hero-quick-overlay">
              <strong>Bulk orders</strong>
            </div>
          </article>
          <article className="hero-quick-card">
            <img
              src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80"
              alt="Sample testing"
            />
            <div className="hero-quick-overlay">
              <strong>Sample testing</strong>
            </div>
          </article>
          <article className="hero-quick-card">
            <img
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80"
              alt="Quality check"
            />
            <div className="hero-quick-overlay">
              <strong>Quality check</strong>
            </div>
          </article>
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <p className="section-eyebrow">Just for you</p>
          <h2 className="section-title">Recommended picks from verified suppliers</h2>
          <p className="section-copy">Best selling products from trusted suppliers with quick dispatch.</p>
        </div>
        <div className="product-grid">
          {featuredProducts.length ? featuredProducts.map(product => (
            <Card key={product.id} product={product} />
          )) : <div className="empty-state">No products match the search.</div>}
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <p className="section-eyebrow">Fast dispatch</p>
          <h2 className="section-title">Ready to ship</h2>
          <p className="section-copy">Low MOQ and fast shipping products available now.</p>
        </div>
        <div className="product-grid">
          {readyProducts.length ? readyProducts.map(product => (
            <Card key={product.id} product={product} />
          )) : <div className="empty-state">No products to display.</div>}
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <p className="section-eyebrow">Best sellers</p>
          <h2 className="section-title">Top-ranking products</h2>
          <p className="section-copy">Most popular and highly rated items from trusted suppliers.</p>
        </div>
        <div className="product-grid">
          {bestSelling.length ? bestSelling.map(product => (
            <Card key={product.id} product={product} />
          )) : <div className="empty-state">No products to display.</div>}
        </div>
      </section>
    </>
  )
}
