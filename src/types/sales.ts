import {ProductsI} from './products'

export interface SaleI {
    id?: number
    nombre: string
    telefono: string
    valor_total: number
    cantidad_total: number
    productos: ProductsI[]
}

export interface SaleRequestI {
    id: number
    nombre: string
    telefono: string
    valor_total: number
    cantidad_total: number
    productos: SaleProductsI[]
}


export interface SaleProductsI {
    nombre: string
    cantidad: number
    precio: number
    id: number
}