import { createSlice } from '@reduxjs/toolkit'
import { products } from '../data/catalog'

const initialState = {
  products,
  cart: [],
  favorites: [],
  searchQuery: '',
  activeCategory: 'All',
  cartOpen: false,
  favoritesOpen: false,
  modalProductId: null,
}

const productSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.searchQuery = action.payload
    },
    setCategory(state, action) {
      state.activeCategory = action.payload
    },
    toggleFavorite(state, action) {
      const id = action.payload
      const index = state.favorites.indexOf(id)
      if (index >= 0) {
        state.favorites.splice(index, 1)
      } else {
        state.favorites.push(id)
      }
    },
    addToCart(state, action) {
      const id = action.payload
      const item = state.cart.find(item => item.id === id)
      if (item) {
        item.qty += 1
      } else {
        state.cart.push({ id, qty: 1 })
      }
    },
    updateQty(state, action) {
      const { id, qty } = action.payload
      const item = state.cart.find(item => item.id === id)
      if (item && qty > 0) {
        item.qty = qty
      }
    },
    removeFromCart(state, action) {
      const id = action.payload
      state.cart = state.cart.filter(item => item.id !== id)
    },
    openCart(state) {
      state.cartOpen = true
    },
    closeCart(state) {
      state.cartOpen = false
    },
    openFavorites(state) {
      state.favoritesOpen = true
    },
    closeFavorites(state) {
      state.favoritesOpen = false
    },
    openModal(state, action) {
      state.modalProductId = action.payload
    },
    closeModal(state) {
      state.modalProductId = null
    },
  },
})

export const {
  setQuery,
  setCategory,
  toggleFavorite,
  addToCart,
  updateQty,
  removeFromCart,
  openCart,
  closeCart,
  openFavorites,
  closeFavorites,
  openModal,
  closeModal,
} = productSlice.actions

export default productSlice.reducer
