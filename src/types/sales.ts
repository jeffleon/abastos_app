import {ProductsI} from './products'

export interface SaleI {
    id?: number
    nombre: string
    telefono: string
    valor_total: number
    cantidad_total: number
    productos: ProductsI[]
    usuario_id: number
}

export interface SaleRequestI {
    id: number
    nombre: string
    telefono: string
    valor_total: number
    cantidad_total: number
    productos: SaleProductsI[]
    usuario_id: number
}


export interface SaleProductsI {
    nombre: string
    cantidad: number
    valor_total: number
    valor_unitario: number
    id: number
}