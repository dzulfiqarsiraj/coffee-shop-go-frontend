import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
}

const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            //state.data = [...state.data, action.payload]
            const data = state.data
            data.push(action.payload)
            state.data = data
        },
        removeFromCart: (state, action) => {
            let data = state.data
            const newData = data.filter((value) => (value.uniqueId !== action.payload.uniqueId))
            state.data = newData
        }
        ,
        emptyCart: () => {
            return initialState
        }
    }
})

export const {addToCart, emptyCart, removeFromCart} = cart.actions
export default cart.reducer