import FoodMenuData from "../assets/jsonData/menu/FoodMenuData.json";

/**
 * Cálculo del presupuesto con descuento por cantidad de invitados.
 * Única fuente de verdad: lo usan /presupuesto, el carrito del encabezado, /reservar, el PDF y WhatsApp.
 *
 * Reglas (confirmadas con el dueño):
 *  - Solo aplica a menús principales (pizzas, chivitos, asado), no a complementos.
 *  - Cada menú se evalúa por separado según su propia cantidad.
 *  - Desde 50 personas 5%, desde 100 10%, desde 150 15%.
 */

// Los menús se guardan en el carrito con este offset en el id (ver componentes de menu/).
export const MENU_CART_ID_OFFSET = 9000;

export const GROUP_DISCOUNTS = [
    { personas: 150, descuento: 15 },
    { personas: 100, descuento: 10 },
    { personas: 50, descuento: 5 },
] as const;

interface ItemBase {
    id: number;
    price: number;
    quantity: number;
}

export interface LineaPresupuesto {
    bruto: number;       // precio × cantidad
    porcentaje: number;  // 0, 5, 10 o 15
    descuento: number;   // monto descontado
    neto: number;        // bruto − descuento
}

export const esMenuPrincipal = (item: { id: number }) => {
    if (item.id < MENU_CART_ID_OFFSET) return false;
    const food = FoodMenuData.find(f => f.id === item.id - MENU_CART_ID_OFFSET);
    return !!food && !food.category.includes("complementos");
};

export const porcentajeDescuento = (cantidad: number) =>
    GROUP_DISCOUNTS.find(d => cantidad >= d.personas)?.descuento ?? 0;

export const calcularLinea = (item: ItemBase): LineaPresupuesto => {
    const bruto = item.price * item.quantity;
    const porcentaje = esMenuPrincipal(item) ? porcentajeDescuento(item.quantity) : 0;
    const descuento = Math.round(bruto * porcentaje / 100);
    return { bruto, porcentaje, descuento, neto: bruto - descuento };
};

/**
 * Mínimo para poder señar la fecha: 15 personas sumando todos los menús principales
 * (se pueden combinar, p. ej. 10 de Pizzas + 5 de Chivitos). Los complementos no cuentan.
 */
export const MIN_PERSONAS_SENA = 15;

export const personasMenuPrincipal = (items: { id: number; quantity: number }[]) =>
    items.filter(esMenuPrincipal).reduce((t, i) => t + i.quantity, 0);

export const estadoSena = (items: { id: number; quantity: number }[]) => {
    const personas = personasMenuPrincipal(items);
    return {
        personas,
        faltan: Math.max(0, MIN_PERSONAS_SENA - personas),
        habilitada: personas >= MIN_PERSONAS_SENA,
    };
};

export const mensajeMinimoSena = (faltan: number) =>
    `Mínimo ${MIN_PERSONAS_SENA} personas en menús principales para señar la fecha (podés combinar menús). ` +
    `Te ${faltan === 1 ? "falta 1 persona" : `faltan ${faltan} personas`}.`;

export const calcularTotales = (items: ItemBase[]) => {
    const lineas = items.map(calcularLinea);
    const subtotal = lineas.reduce((t, l) => t + l.bruto, 0);
    const descuento = lineas.reduce((t, l) => t + l.descuento, 0);
    return { subtotal, descuento, total: subtotal - descuento };
};
