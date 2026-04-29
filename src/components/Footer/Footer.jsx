import { footerColumns } from '../../data/catalog'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {footerColumns.map(column => (
            <div key={column.title} className="footer-column">
              <h3 className="footer-title">{column.title}</h3>
              <div className="footer-links">
                {column.links.map(link => (
                  <button key={link} className="footer-link">
                    {link}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>2026 Alibaba-style demo marketplace. Built in JSX with working favorites and cart.</p>
          <div className="footer-legal">
            <button className="footer-link">Terms</button>
            <button className="footer-link">Privacy</button>
            <button className="footer-link">Cookie policy</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
