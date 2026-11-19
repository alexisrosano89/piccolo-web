import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Título, descripción, URL canónica y etiquetas para compartir (Open Graph / Twitter) de cada página.
 *
 * Google ejecuta JavaScript, así que ve estos valores por página. WhatsApp/Facebook/Instagram NO
 * ejecutan JavaScript: para la tarjeta al compartir usan las etiquetas fijas de index.html.
 */

export const SITE_NAME = "Piccolo Cocina Artesanal";
const DEFAULT_IMAGE = "/assets/img/og-image.jpg";

// Dominio público del sitio. Lo inyecta vite.config.ts (SITE_URL o el dominio de producción de Vercel).
const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "")
    || (typeof window !== "undefined" ? window.location.origin : "");

interface SeoProps {
    /** Título de la página, sin el nombre del sitio (se agrega solo). */
    title?: string;
    description: string;
    /** Ruta canónica; por defecto, la ruta actual sin query string. */
    path?: string;
    /** Imagen para compartir, ruta dentro de /public. */
    image?: string;
    /** true para páginas que no deben aparecer en Google (presupuesto, reservar, 404). */
    noindex?: boolean;
}

const setMeta = (attr: "name" | "property", key: string, content: string) => {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
};

const setCanonical = (href: string) => {
    let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        document.head.appendChild(el);
    }
    el.setAttribute("href", href);
};

const Seo = ({ title, description, path, image = DEFAULT_IMAGE, noindex = false }: SeoProps) => {
    const location = useLocation();
    const canonicalPath = path ?? location.pathname;

    useEffect(() => {
        const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
        const url = `${SITE_URL}${canonicalPath === "/" ? "/" : canonicalPath.replace(/\/$/, "")}`;
        const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

        document.title = fullTitle;
        setMeta("name", "description", description);
        setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
        setCanonical(url);

        setMeta("property", "og:title", fullTitle);
        setMeta("property", "og:description", description);
        setMeta("property", "og:url", url);
        setMeta("property", "og:image", imageUrl);
        setMeta("name", "twitter:title", fullTitle);
        setMeta("name", "twitter:description", description);
        setMeta("name", "twitter:image", imageUrl);
    }, [title, description, canonicalPath, image, noindex]);

    return null;
};

export default Seo;
