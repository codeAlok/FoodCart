import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        restaurant: null,
    },

    reducers: {
        addItems: (state, action) => {
            const data = action.payload;

            if(state.restaurant === null) {
                state.restaurant = data.resNeededData;
                state.items.push({...data.itemInfo, quantity: 1});
            }
            else if (state.restaurant.id !== data.resNeededData.id) {
                state.restaurant = data.resNeededData;
                state.items = [{...data.itemInfo, quantity: 1}];
            }else {
                state.items.push({...data.itemInfo, quantity: 1});
            }
        }
    }
})

export const { addItems } = cartSlice.actions;

export default cartSlice.reducer;