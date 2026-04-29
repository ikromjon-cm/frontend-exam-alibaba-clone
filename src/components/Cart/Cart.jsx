import { useDispatch, useSelector } from 'react-redux'
import { closeCart, removeFromCart, updateQty } from '../../store/productSlice'
import './Cart.css'

export default function Cart() {
  const dispatch = useDispatch()
  const cartOpen = useSelector(state => state.cartOpen)
  const products = useSelector(state => state.products)
  const cart = useSelector(state => state.cart)

  const cartItems = cart.map(item => ({
    ...item,
    product: products.find(product => product.id === item.id),
  }))

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product?.price?.[0] || 0
    return total + price * item.qty
  }, 0)

  const handleQtyChange = (id, qty) => {
    if (qty > 0) {
      dispatch(updateQty({ id, qty }))
    }
  }

  if (!cartOpen) return null

  return (
    <div className="cart-overlay" onClick={() => dispatch(closeCart())}>
      <aside className="cart-panel" onClick={event => event.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping cart</h2>
          <button className="cart-close" type="button" onClick={() => dispatch(closeCart())}>✕</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">📦</div>
            <h3>Your cart is empty</h3>
            <p>Add a product to see it here.</p>
          </div>
        ) : (
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.product.image} alt={item.product.title} />
                <div className="cart-item-details">
                  <strong>{item.product.title}</strong>
                  <p className="cart-item-price">${item.product.price[0].toFixed(2)} × {item.qty} = <strong>${(item.product.price[0] * item.qty).toFixed(2)}</strong></p>
                  <div className="cart-item-qty">
                    <button
                      className="qty-btn"
                      type="button"
                      onClick={() => handleQtyChange(item.id, item.qty - 1)}
                    >
                      −
                    </button>
                    <input
                      className="qty-input"
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => handleQtyChange(item.id, parseInt(e.target.value) || 1)}
                    />
                    <button
                      className="qty-btn"
                      type="button"
                      onClick={() => handleQtyChange(item.id, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="cart-remove"
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="cart-summary">
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="cart-summary-row">
            <span>Estimated shipping</span>
            <strong>$0.00</strong>
          </div>
          <div className="cart-summary-row cart-summary-total">
            <span>Total</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <button className="cart-checkout" type="button" disabled>Go to checkout</button>
        </div>
      </aside>
    </div>
  )
}
