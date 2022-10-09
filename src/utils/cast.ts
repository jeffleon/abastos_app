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
        productos: []
    };
    req.productos.forEach((element) => {
        const product:ProductsI = {
            id: element.id,
            nombre: "",
            descripcion: "",
            inventario: 0,
            precio_promedio: 0,
            image_url: ""
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
        productos: []
    };
    sale.productos.forEach((element) => {
        const product:ProductsI = {
            id: element.id,
            nombre: "",
            descripcion: "",
            inventario: 0,
            precio_promedio: 0,
            image_url: ""
        }
        res.productos.push(product)
    });
    return res;
}

