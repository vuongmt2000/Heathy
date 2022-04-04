
import VAxios from "./VAxios"
import Urls from "./Urls"
import { ApiResponse } from "../type"


const processResponse = (promise: Promise<ApiResponse>) => {
    console.log('first', promise)
    return  promise.then(response => ({ error: null, data: response.data?.data ?? response.data })).catch(error => ({ error, data: error?.response?.data?.data ?? error?.response?.data ?? error?.response ?? error }))
}

export const getProduct = async  () =>{
    return  processResponse(VAxios.get(Urls.API_DATA))
}

export const getColor = async  () =>{
    return  processResponse(VAxios.get(Urls.API_COLOR))
}