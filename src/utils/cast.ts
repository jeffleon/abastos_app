import { ProductsI } from "../types/products";
import { PurchaseI, PurchaseRequestI } from "../types/purchase"
import { SaleI, SaleRequestI } from "../types/sales";

export function ItemsIToProductsPurchase(req:PurchaseRequestI) {
    const res:PurchaseI = {
        provedor: req.provedor,
        telefono: req.telefono,
        valor_total: req.valor_total,
        cantidad_total: req.cantidad_total,
        valor_deuda: req.valor_deuda,
        usuario_id: req.usuario_id,
        productos: []
    };
    req.productos.forEach((element) => {
        const product:ProductsI = {
            id: element.producto_id,
        }
        res.productos.push(product)
    });
    return res;
}

export function ItemsIToProductsSale(sale: SaleRequestI) {
    const res:SaleI = {
        nombre: sale.nombre,
        telefono: sale.telefono,
        valor_total: sale.valor_total,
        cantidad_total: sale.cantidad_total,
        usuario_id: sale.usuario_id,
        productos: []
    };
    sale.productos.forEach((element) => {
        const product:ProductsI = {
            id: element.producto_id,
        }
        res.productos.push(product)
    });
    return res;
}

