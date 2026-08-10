import { createSlice } from "@reduxjs/toolkit";

const loadSavedCart = () => {
  try {
    const saved = localStorage.getItem("cart_items");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState = {
  items: loadSavedCart(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const shopItem = action.payload;
      const foundItem = state.items.findIndex(
        (item) => item.name === shopItem.name
      );

      if (foundItem > -1) {
        state.items[foundItem].count = (state.items[foundItem].count || 1) + 1;
      } else {
        state.items.push({ ...shopItem, count: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const shopItem = action.payload;
      const foundItem = state.items.findIndex(
        (item) => item.name === shopItem.name
      );

      if (foundItem > -1) {
        if (state.items[foundItem].count > 1) {
          state.items[foundItem].count -= 1;
        } else {
          state.items.splice(foundItem, 1);
        }
      }
    },

    deleteItemFromCart: (state, action) => {
      const shopItem = action.payload;
      state.items = state.items.filter((item) => item.name !== shopItem.name);
    },
  },
});

export const { addToCart, removeFromCart, deleteItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;