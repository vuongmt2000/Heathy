import { createSlice } from '@reduxjs/toolkit'
import { HomeModel } from '../type'

export const initialState: HomeModel = {
    products: [],
    updateProducts: [],
    loading: false,
    colors: [],
}


const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {

        requestProduct: (state) => {
            state.loading = true
        },
        requestProductSuccess: (state, { payload }) => {
            state.products = payload
            state.loading = false
        },
        requestProductFailed: (state) => {
            state.loading = false
        },

        requestColor: (state) => {
            state.loading = true
        },
        requestColorSuccess: (state, { payload }) => {
            state.colors = payload
            state.loading = false
        },
        requestColorFailed: (state) => {
            state.loading = false
        },

        requestUpdateProduct: (state, {payload}) =>{
            state.products = payload
        }
    }
})

export const homeActions = homeSlice.actions
export const homeReducer = homeSlice.reducer