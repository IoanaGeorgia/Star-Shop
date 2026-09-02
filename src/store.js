import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './slices/cart'
import { authSlice } from './slices/auth'

export const store = configureStore({
  reducer: {
    cart:cartSlice.reducer,
    auth: authSlice.reducer
  },
})