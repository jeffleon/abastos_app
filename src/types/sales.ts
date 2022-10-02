import {ProductsI} from './products'

export interface SaleI {
    id: number
    nombre: string
    telefono: string
    valor_total: number
    cantidad_total: number
    productos: ProductsI[]
}