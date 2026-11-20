import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice"; // Import the cart reducer
import FoodMenuData from "../assets/jsonData/menu/FoodMenuData.json";
import ProductData from "../assets/jsonData/product/ProductData.json";

// Los ítems del menú se guardan en el presupuesto con este offset en el id
// (ver MENU_CART_ID_OFFSET en los componentes de menu/).
const MENU_CART_ID_OFFSET = 9000;

// ¿El ítem guardado sigue existiendo en los datos actuales del sitio?
// Descarta productos viejos que quedaron en el navegador (p. ej. de la plantilla).
const isKnownItem = (item: { id?: number; title?: string }) => {
    const id = item?.id;
    if (typeof id !== "number") return false;
    if (id >= MENU_CART_ID_OFFSET) {
        return FoodMenuData.some(
            food => food.id === id - MENU_CART_ID_OFFSET && food.title === item.title
        );
    }
    return ProductData.some(product => product.id === id && product.name === item.title);
};

// Los menús guardados toman la foto y el precio actuales (si cambian, el presupuesto guardado
// en el navegador se actualiza solo y no queda con la imagen o el precio viejos).
const conDatosActuales = <T extends { id: number; thumb?: string; price?: number }>(item: T): T => {
    if (item.id < MENU_CART_ID_OFFSET) return item;
    const food = FoodMenuData.find(f => f.id === item.id - MENU_CART_ID_OFFSET);
    return food ? { ...item, thumb: `menu/${food.thumb}`, price: food.price } : item;
};

// Load state from localStorage
const loadFromLocalStorage = () => {
    try {
        const stateStr = localStorage.getItem("cartState");
        if (!stateStr) return undefined;
        const state = JSON.parse(stateStr);
        const items = Array.isArray(state?.items)
            ? state.items.filter(isKnownItem).map(conDatosActuales)
            : [];
        return { ...state, items };
    } catch (err) {
        console.error("Could not load state", err);
        return undefined;
    }
};

// Save state to localStorage
const saveToLocalStorage = (state: any) => {
    try {
        const stateStr = JSON.stringify(state);
        localStorage.setItem("cartState", stateStr);
    } catch (err) {
        console.error("Could not save state", err);
    }
};

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    preloadedState: {
        cart: loadFromLocalStorage(), // Load cart from localStorage
    },
});

store.subscribe(() => {
    saveToLocalStorage(store.getState().cart); // Save only cart state
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
