import {ProductsI} from './products'

export interface PurchaseI {
    id: number
    provedor: string
    telefono: string
    valor_total: string
    cantidad_total: number
    valor_deuda: number
    productos: ProductsI[]
}

export interface paymentI {
    payment: number
}
