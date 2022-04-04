import { HomeModel } from "../type";
import { homeReducer } from "./HomeReducer";




export interface RootReducerModel {
    homeReducer :HomeModel
}

const allReducers = {
    homeReducer
}

export default allReducers;