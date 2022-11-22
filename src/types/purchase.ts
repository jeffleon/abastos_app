import { ProductsI } from "./products"

export interface PurchaseI {
    id?: number 
    proveedor: string
    telefono: string
    valor_total: number
    cantidad_total: number
    valor_deuda: number
    productos: ProductsI[]
    usuario_id: number
}

export interface PurchaseRequestI {
    id: number
    proveedor: string
    telefono: string
    valor_total: number
    cantidad_total: number
    valor_deuda: number
    productos: PurchaseProductsI[]
    usuario_id: number
}

export interface PurchaseProductsI {
    nombre: string
    cantidad: number
    valor_total: number
    valor_unitario: number
    producto_id: number
    compra?: PurchaseRequestI 
}

export interface paymentI {
    payment: number
}
