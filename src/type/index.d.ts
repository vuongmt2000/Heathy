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
    product: Product[],
    updateProduct: Product[],
    color: Color[]
}

export interface ApiResponse {
    error?: object,
    data?: any
}