import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './slices/cart'

export const store = configureStore({
  reducer: {
    cart:cartSlice.reducer
  },
})