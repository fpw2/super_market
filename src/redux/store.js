import {configureStore, createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: []
    },
    reducers: {
        addProduct: (state, action) => {
            console.log(state, action);
            const existingProduct = state.cart.find(product => product.id === action.payload.id)
            if(existingProduct) {
                existingProduct.quantity++ // immer makes this immutable
            } else {
                state.cart.push({...action.payload, quantity: 1}) // immer makes this immutable

            }
        },
        removeProduct: (state, action) => {
            const index = state.cart.findIndex(product => product.id === action.payload.id)
            state.cart.splice(index, 1) // immer makes this immutable

        },
    },
});

const store = configureStore({
    reducer: cartSlice.reducer
})

const {addProduct,removeProduct} = cartSlice.actions;

const cartCountSelector = (state) => {
    return state.cart.reduce((total, product) => {
        return total + product.quantity
    },0)
}

const totalCartSelector = (state) => {
    return state.cart.reduce((total, product) => {
        return total + product.price * product.quantity
    },0)
}

export {store, addProduct, removeProduct, cartCountSelector, totalCartSelector}




