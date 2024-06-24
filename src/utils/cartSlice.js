import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        restaurant: null,
    },

    reducers: {
        addItems: (state, action) => {
            state.items.push(action.payload.itemInfo);

            if(state.restaurant === null) {
                state.restaurant = action.payload.resNeededData;
            }
            else if (state.restaurant.resNeededData.id !== action.payload.resNeededData.id) {
                state.restaurant = action.payload.resNeededData;
            }   
        }
    }
})

export const { addItems } = cartSlice.actions;

export default cartSlice.reducer;