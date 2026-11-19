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

/** "$21.137": pesos sin decimales y con punto de miles. */
export const formatPesos = (n: number) => `$${Math.round(n).toLocaleString("es-UY")}`;

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
 * Mínimo para poder señar la fecha: cada menú principal del presupuesto tiene que tener al menos
 * 15 personas. Los menús NO se combinan (10 de Pizzas + 5 de Chivitos no alcanza).
 * Hace falta al menos un menú principal; los complementos no cuentan ni tienen mínimo.
 */
export const MIN_PERSONAS_SENA = 15;

interface ItemSena {
    id: number;
    quantity: number;
    title?: string;
}

export interface MenuPendiente {
    id: number;
    title: string;
    quantity: number;
    faltan: number;
}

export const estadoSena = (items: ItemSena[]) => {
    const principales = items.filter(esMenuPrincipal);
    const pendientes: MenuPendiente[] = principales
        .filter(i => i.quantity < MIN_PERSONAS_SENA)
        .map(i => ({ id: i.id, title: i.title ?? "Menú", quantity: i.quantity, faltan: MIN_PERSONAS_SENA - i.quantity }));
    const sinMenuPrincipal = principales.length === 0;
    return {
        sinMenuPrincipal,
        pendientes,
        habilitada: !sinMenuPrincipal && pendientes.length === 0,
    };
};

/** Cantidad mínima del selector: 15 en menús principales, 1 en complementos. */
export const cantidadMinima = (item: { id: number }) =>
    esMenuPrincipal(item) ? MIN_PERSONAS_SENA : 1;

const personas = (n: number) => (n === 1 ? "1 persona" : `${n} personas`);

/** Mensaje corto explicando qué falta para poder señar. */
export const mensajeMinimoSena = (estado: ReturnType<typeof estadoSena>) => {
    if (estado.sinMenuPrincipal) {
        return `Para señar la fecha agregá un menú principal (mínimo ${MIN_PERSONAS_SENA} personas).`;
    }
    const detalle = estado.pendientes.map(p => `a ${p.title} le ${p.faltan === 1 ? "falta" : "faltan"} ${personas(p.faltan)}`);
    return `Cada menú principal necesita mínimo ${MIN_PERSONAS_SENA} personas (los menús no se combinan): ${detalle.join(", ")}.`;
};

export const calcularTotales = (items: ItemBase[]) => {
    const lineas = items.map(calcularLinea);
    const subtotal = lineas.reduce((t, l) => t + l.bruto, 0);
    const descuento = lineas.reduce((t, l) => t + l.descuento, 0);
    return { subtotal, descuento, total: subtotal - descuento };
};
