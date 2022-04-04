import { createSlice } from '@reduxjs/toolkit'
import { HomeModel } from '../type'

export const initialState: HomeModel = {
    product: [],
    updateProduct: [],
    loading: false,
    color: [],
}


const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {

        requestProduct: (state) => {
            state.loading = true
        },
        requestProductSuccess: (state, { payload }) => {
            state.product = payload
            state.loading = false
        },
        requestProductFailed: (state) => {
            state.loading = false
        },

        requestColor: (state) => {
            state.loading = true
        },
        requestColorSuccess: (state, { payload }) => {
            state.color = payload
            state.loading = false
        },
        requestColorFailed: (state) => {
            state.loading = false
        },
    }
})

export const homeActions = homeSlice.actions
export const homeReducer = homeSlice.reducer