import { useDispatch } from 'react-redux'
import { explorerSidebarLinks, categoryExplorerSections, quickCategoryLinks } from '../../data/catalog'
import { setCategory } from '../../store/productSlice'
import './CategoryExplorer.css'

function CategoryIcon({ label }) {
  return (
    <span className="category-explorer-sidebar-icon">
      {label.slice(0, 2).toUpperCase()}
    </span>
  )
}

function resolveCategory(label) {
  const normalized = label.toLowerCase()

  if (
    normalized.includes('electronics') ||
    normalized.includes('mobile') ||
    normalized.includes('laptop') ||
    normalized.includes('watch')
  ) {
    return 'Consumer Electronics'
  }

  if (
    normalized.includes('apparel') ||
    normalized.includes('shoe') ||
    normalized.includes('bag') ||
    normalized.includes('dress')
  ) {
    return 'Apparel & Accessories'
  }

  if (normalized.includes('beauty') || normalized.includes('personal care')) {
    return 'Beauty & Personal Care'
  }

  if (normalized.includes('sport') || normalized.includes('outdoor')) {
    return 'Sports & Entertainment'
  }

  if (normalized.includes('home') || normalized.includes('garden')) {
    return 'Home & Garden'
  }

  if (normalized.includes('packaging') || normalized.includes('printing')) {
    return 'Packaging & Printing'
  }

  return 'All'
}

export default function CategoryExplorer() {
  const dispatch = useDispatch()
  const sidebarCategories = explorerSidebarLinks.slice(0, 12)
  const featuredCategories = categoryExplorerSections[0]?.items ?? []
  const selectCategory = category => dispatch(setCategory(resolveCategory(category)))

  return (
    <section className="category-explorer-section">
      <div className="category-explorer-shell">
        <div className="category-explorer-layout">
          <aside className="category-explorer-sidebar">
            <div className="category-explorer-sidebar-header">
              <p className="category-explorer-kicker">Browse faster</p>
              <h3>Categories for you</h3>
            </div>
            <div className="category-explorer-sidebar-list">
              {sidebarCategories.map(category => (
                <button
                  type="button"
                  key={category}
                  className="category-explorer-sidebar-item"
                  onClick={() => selectCategory(category)}
                >
                  <CategoryIcon label={category} />
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="category-explorer-main">
            <div className="category-explorer-main-header">
              <div>
                <p className="category-explorer-kicker">Categories for you</p>
                <h2>Discover trending product categories</h2>
              </div>
              <button
                type="button"
                className="category-explorer-more"
                onClick={() => selectCategory('All')}
              >
                Browse all
              </button>
            </div>

            <div className="category-explorer-main-grid">
              {featuredCategories.map(category => (
                <button
                  type="button"
                  key={category.name}
                  className="category-card"
                  onClick={() => selectCategory(category.name)}
                >
                  {category.flag ? (
                    <span className="category-card-badge">{category.flag}</span>
                  ) : null}
                  <div className="category-card-media">
                    <img src={category.image} alt={category.name} />
                  </div>
                  <span className="category-card-label">{category.name}</span>
                </button>
              ))}
            </div>

            <div className="category-explorer-main-footer">
              <div className="category-explorer-footer-headline">
                <h3>Apparel & Accessories</h3>
                <p>Explore related categories and products in one place.</p>
              </div>
              <div className="category-explorer-footer-links">
                {quickCategoryLinks.map(link => (
                  <button
                    key={link}
                    type="button"
                    className="category-explorer-footer-button"
                    onClick={() => selectCategory(link)}
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
