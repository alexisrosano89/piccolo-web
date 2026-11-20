import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import FoodMenuData from './src/assets/jsonData/menu/FoodMenuData.json'
import { slugify } from './src/assets/jsonData/menu/slugify.ts'

// El proyecto no instala @types/node; alcanza con tipar lo que usamos.
declare const process: { env: Record<string, string | undefined> }

/**
 * Dominio público del sitio, sin "/" al final. Se usa en el sitemap, robots.txt, URLs canónicas
 * y la tarjeta al compartir. La variable de entorno SITE_URL lo pisa si alguna vez cambia.
 */
const PRODUCTION_URL = 'https://piccolo.com.uy'
const DEV_URL = 'http://localhost:5173'

// Páginas que queremos en Google. /presupuesto y /reservar quedan afuera (son privadas de cada cliente).
const SITEMAP_PATHS = [
  '/',
  '/cotizar',
  '/eventos',
  '/nosotros',
  '/preguntas-frecuentes',
  ...FoodMenuData.map(food => `/cotizar/${slugify(food.title)}`),
]

/** Reemplaza %SITE_URL% en index.html y genera robots.txt y sitemap.xml en el build. */
const seoPlugin = (siteUrl: string): Plugin => ({
  name: 'piccolo-seo',
  transformIndexHtml: html => html.replaceAll('%SITE_URL%', siteUrl),
  generateBundle() {
    const today = new Date().toISOString().slice(0, 10)
    const urls = SITEMAP_PATHS.map(path => [
      '  <url>',
      `    <loc>${siteUrl}${path}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      '  </url>',
    ].join('\n')).join('\n')

    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    })
    this.emitFile({
      type: 'asset',
      fileName: 'robots.txt',
      source: [
        'User-agent: *',
        'Allow: /',
        'Disallow: /presupuesto',
        'Disallow: /reservar',
        'Disallow: /api/',
        '',
        `Sitemap: ${siteUrl}/sitemap.xml`,
        '',
      ].join('\n'),
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const siteUrl = (process.env.SITE_URL || (command === 'build' ? PRODUCTION_URL : DEV_URL)).replace(/\/$/, '')
  return {
    plugins: [react(), seoPlugin(siteUrl)],
    define: {
      'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl),
    },
    css: {
      devSourcemap: true
    },
  }
})
