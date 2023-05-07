// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartCount = cartList.length
      let totalAmount = 0
      cartList.forEach(eachCart => {
        const price = eachCart.price * eachCart.quantity
        totalAmount += price
      })

      return (
        <div className="cart-summary">
          <h1>
            Order Total: <span>Rs {totalAmount}</span>
          </h1>
          <p>
            {cartCount} {cartCount < 2 ? 'item' : 'items'} in cart
          </p>
          <button type="button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
