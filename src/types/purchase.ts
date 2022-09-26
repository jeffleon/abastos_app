import {ProductsI} from './products'

export interface PurchaseI {
    id: number
    provedor: string
    telefono: string
    valor_total: string
    valor_deuda: number
    productos: ProductsI[]
}

export interface paymentI {
    payment: number
}
