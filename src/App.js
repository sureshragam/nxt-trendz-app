import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const cartExisted = cartList.some(eachCart => eachCart.id === product.id)
    if (cartExisted) {
      const updatedCartList = cartList.map(eachCart => {
        if (eachCart.id === product.id) {
          return {...eachCart, quantity: eachCart.quantity + 1}
        }
        return eachCart
      })
      this.setState({cartList: updatedCartList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList.filter(
        eachCart => eachCart.id !== id,
      )
      return {cartList: updatedCartList}
    })
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList.map(eachProduct => {
        if (eachProduct.id === id) {
          return {...eachProduct, quantity: eachProduct.quantity + 1}
        }
        return eachProduct
      })
      return {cartList: updatedCartList}
    })
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList.map(eachProduct => {
        if (eachProduct.id === id) {
          return {...eachProduct, quantity: eachProduct.quantity - 1}
        }
        return eachProduct
      })
      const filterCartList = updatedCartList.filter(
        eachProduct => eachProduct.quantity > 0,
      )
      return {cartList: filterCartList}
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
