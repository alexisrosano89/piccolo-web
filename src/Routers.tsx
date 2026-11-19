import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home6Page from "./pages/homePages/Home6";

import AboutUsPage from "./pages/innerPages/AboutUsPage";

import FoodMenuPage from "./pages/FoodPage/FoodMenu";
import FoodSinglePage from "./pages/FoodPage/FoodSinglePage";

import CartPage from "./pages/shopPage/CartPage";
// /reservar se carga aparte: trae el selector de teléfono con banderas, el calendario y el
// generador de PDF, que son pesados y no hacen falta en el resto del sitio.
const CheckoutPage = lazy(() => import("./pages/shopPage/CheckoutPage"));

import NotFoundPage from "./pages/innerPages/NotFoundPage";
import EventosPage from "./pages/innerPages/EventosPage";
import DeliveryPage from "./pages/innerPages/DeliveryPage";
import FaqPage from "./pages/innerPages/FaqPage";

// Solo las páginas reales del sitio. Las páginas de demo de la plantilla (home-1..6, blog, shop,
// chef, login, etc.) se quitaron para que Google no las indexe; sus archivos siguen en src/ por si
// hace falta reutilizar algo.
const Routers = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home6Page />} ></Route>
                <Route path="/nosotros" element={<AboutUsPage />} ></Route>
                <Route path="/cotizar" element={<FoodMenuPage />} ></Route>
                <Route path="/cotizar/:slug" element={<FoodSinglePage />} ></Route>
                <Route path="/eventos" element={<EventosPage />} ></Route>
                <Route path="/delivery" element={<DeliveryPage />} ></Route>
                <Route path="/preguntas-frecuentes" element={<FaqPage />} ></Route>
                <Route path="/faq" element={<Navigate to="/preguntas-frecuentes" replace />} ></Route>
                <Route path='/presupuesto' element={<CartPage />}></Route>
                <Route path='/reservar' element={<Suspense fallback={null}><CheckoutPage /></Suspense>}></Route>

                {/* Direcciones viejas o en inglés que redirigen a la página real */}
                <Route path="/home-6" element={<Navigate to="/" replace />} ></Route>
                <Route path="/about-us" element={<Navigate to="/nosotros" replace />} ></Route>
                <Route path="/contacto" element={<Navigate to="/" replace />} ></Route>
                <Route path="/contact" element={<Navigate to="/" replace />} ></Route>
                <Route path='/cart' element={<Navigate to="/presupuesto" replace />}></Route>
                <Route path='/checkout' element={<Navigate to="/reservar" replace />}></Route>

                <Route path="*" element={<NotFoundPage />} ></Route>
            </Routes>
        </>
    );
};

export default Routers;
