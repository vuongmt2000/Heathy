export interface Product {
    id: number,
    errorDescription: String,
    image: String,
    name: String,
    sku: String,
    color: String
}

export interface Color {
    id: number,
    name: String
}


export interface HomeModel {
    loading: boolean,
    products: Product[],
    updateProducts: Product[],
    colors: Color[]
}

export interface ApiResponse {
    error?: object,
    data?: any
}