import { ProductsI } from "./products"

export interface PurchaseI {
    id?: number 
    provedor: string
    telefono: string
    valor_total: number
    cantidad_total: number
    valor_deuda: number
    productos: ProductsI[]
}

export interface PurchaseRequestI {
    id: number
    provedor: string
    telefono: string
    valor_total: number
    cantidad_total: number
    valor_deuda: number
    productos: PurchaseProductsI[]
}

export interface PurchaseProductsI {
    nombre: string
    cantidad: number
    precio: number
    id: number
}

export interface paymentI {
    payment: number
}
