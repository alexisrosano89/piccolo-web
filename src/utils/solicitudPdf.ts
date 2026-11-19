import { jsPDF } from "jspdf";
import { METODOS_SENA, SENA_IMPORTANTE, SENA_MONTO } from "./sena";

export interface SolicitudItem {
    title: string;
    price: number;
    quantity: number;
    porcentaje: number; // descuento por cantidad aplicado a esta línea (0 si no tiene)
    neto: number;       // subtotal de la línea ya con descuento
}

export interface Solicitud {
    numero: string;
    emitida: Date;
    nombre: string;
    fechaEvento: Date | null;
    horaEvento: string; // "HH:mm"
    departamento: string;
    direccion: string;
    direccion2: string;
    telefono: string;
    email: string;
    comentarios: string;
    items: SolicitudItem[];
    subtotal: number;  // sin descuentos
    descuento: number; // total descontado por cantidad
    total: number;     // a pagar
}

const LOGO_URL = "/assets/img/logo-piccolo-rojo.png";
const LOGO_RATIO = 295 / 628; // alto / ancho del PNG
const ROJO: [number, number, number] = [227, 24, 55];
const GRIS: [number, number, number] = [110, 110, 110];

export const formatFecha = (d: Date | null) =>
    d ? d.toLocaleDateString("es-UY", { day: "2-digit", month: "2-digit", year: "numeric" }) : "-";

export const formatPesos = (n: number) => `$${Math.round(n).toLocaleString("es-UY")}`;

/** Número corto y legible para identificar la solicitud, p. ej. P-251119-1432. */
export const nuevoNumeroSolicitud = (d = new Date()) => {
    const p = (n: number) => String(n).padStart(2, "0");
    return `P-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
};

const cargarLogo = async (): Promise<string | null> => {
    try {
        const res = await fetch(LOGO_URL);
        if (!res.ok) return null;
        const blob = await res.blob();
        return await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch {
        return null;
    }
};

/** Arma el PDF de la solicitud de reserva. */
export const generarSolicitudPdf = async (s: Solicitud): Promise<jsPDF> => {
    const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();
    const M = 18; // margen
    let y = M;

    const nuevaPaginaSiHaceFalta = (alto: number) => {
        if (y + alto > H - M) {
            doc.addPage();
            y = M;
        }
    };

    // Encabezado: logo + título
    const logo = await cargarLogo();
    if (logo) {
        const w = 48;
        doc.addImage(logo, "PNG", M, y, w, w * LOGO_RATIO, undefined, "FAST");
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(30, 30, 30);
    doc.text("Solicitud de reserva", W - M, y + 8, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...GRIS);
    doc.text(`N.º ${s.numero}`, W - M, y + 14, { align: "right" });
    doc.text(`Emitida: ${formatFecha(s.emitida)}`, W - M, y + 19, { align: "right" });
    y += 48 * LOGO_RATIO + 8;

    doc.setDrawColor(...ROJO);
    doc.setLineWidth(0.6);
    doc.line(M, y, W - M, y);
    y += 10;

    // Datos del cliente y del evento
    const seccion = (titulo: string) => {
        nuevaPaginaSiHaceFalta(14);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(...ROJO);
        doc.text(titulo, M, y);
        y += 7;
    };

    const fila = (label: string, valor: string) => {
        if (!valor) return;
        const lineas = doc.splitTextToSize(valor, W - M * 2 - 45);
        nuevaPaginaSiHaceFalta(lineas.length * 5 + 2);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.text(label, M, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(30, 30, 30);
        doc.text(lineas, M + 45, y);
        y += lineas.length * 5 + 2;
    };

    seccion("Datos de contacto");
    fila("Nombre y apellido", s.nombre);
    fila("Teléfono / WhatsApp", s.telefono);
    fila("Email", s.email);
    y += 4;

    seccion("Evento");
    fila("Fecha del evento", formatFecha(s.fechaEvento));
    fila("Hora del evento", s.horaEvento ? `${s.horaEvento} hs` : "");
    fila("Departamento", s.departamento);
    fila("Dirección", [s.direccion, s.direccion2].filter(Boolean).join(" - "));
    fila("Comentarios", s.comentarios);
    y += 4;

    // Tabla del presupuesto
    seccion("Presupuesto");
    const colCant = W - M - 70;
    const colPrecio = W - M - 40;
    const colSub = W - M;

    const encabezadoTabla = () => {
        doc.setFillColor(244, 244, 244);
        doc.rect(M, y - 5, W - M * 2, 8, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.text("Menú", M + 2, y);
        doc.text("Cant.", colCant, y, { align: "right" });
        doc.text("Precio p/p", colPrecio, y, { align: "right" });
        doc.text("Subtotal", colSub - 2, y, { align: "right" });
        y += 8;
    };
    encabezadoTabla();

    doc.setFont("helvetica", "normal");
    if (s.items.length === 0) {
        doc.setTextColor(...GRIS);
        doc.text("Sin menús seleccionados.", M + 2, y);
        y += 7;
    }
    s.items.forEach(item => {
        const nombre = item.porcentaje ? `${item.title} (-${item.porcentaje}% por cantidad)` : item.title;
        const titulo = doc.splitTextToSize(nombre, colCant - M - 25);
        const alto = titulo.length * 5 + 2;
        if (y + alto > H - M) {
            doc.addPage();
            y = M;
            encabezadoTabla();
            doc.setFont("helvetica", "normal");
        }
        doc.setTextColor(30, 30, 30);
        doc.text(titulo, M + 2, y);
        doc.text(String(item.quantity), colCant, y, { align: "right" });
        doc.text(formatPesos(item.price), colPrecio, y, { align: "right" });
        doc.text(formatPesos(item.neto), colSub - 2, y, { align: "right" });
        y += alto;
        doc.setDrawColor(230, 230, 230);
        doc.setLineWidth(0.2);
        doc.line(M, y - 3, W - M, y - 3);
        y += 2;
    });

    if (s.descuento > 0) {
        nuevaPaginaSiHaceFalta(16);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.text("Subtotal sin descuento", colPrecio, y + 2, { align: "right" });
        doc.text(formatPesos(s.subtotal), colSub - 2, y + 2, { align: "right" });
        y += 6;
        doc.setTextColor(...ROJO);
        doc.text("Descuento por cantidad", colPrecio, y + 2, { align: "right" });
        doc.text(`-${formatPesos(s.descuento)}`, colSub - 2, y + 2, { align: "right" });
        y += 8;
    }

    nuevaPaginaSiHaceFalta(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.text("Total", colPrecio, y + 2, { align: "right" });
    doc.text(formatPesos(s.total), colSub - 2, y + 2, { align: "right" });
    y += 14;

    // Cómo señar (datos de pago, de utils/sena.ts)
    const anchoCaja = W - M * 2;
    const importante = doc.splitTextToSize(SENA_IMPORTANTE.join(" "), anchoCaja - 10);
    const altoMetodo = (m: (typeof METODOS_SENA)[number]) => 6 + (m.nota ? 5 : 0) + m.datos.length * 5 + 3;
    const altoCajaSena = 12 + METODOS_SENA.reduce((t, m) => t + altoMetodo(m), 0) + 8 + importante.length * 5 + 2;
    nuevaPaginaSiHaceFalta(altoCajaSena + 4);

    const yCaja = y - 5;
    doc.setFillColor(253, 236, 239);
    doc.roundedRect(M, yCaja, anchoCaja, altoCajaSena, 2, 2, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.text("¿Cómo señar?", M + 5, y + 2);
    doc.setTextColor(...ROJO);
    doc.text(formatPesos(SENA_MONTO), W - M - 5, y + 2, { align: "right" });
    y += 10;

    METODOS_SENA.forEach((m, i) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(30, 30, 30);
        doc.text(`${i + 1}. ${m.titulo}`, M + 5, y);
        y += 5;
        if (m.nota) {
            doc.setFont("helvetica", "italic");
            doc.setFontSize(9);
            doc.setTextColor(...GRIS);
            doc.text(m.nota, M + 9, y);
            y += 5;
        }
        m.datos.forEach(d => {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(...GRIS);
            doc.text(`${d.label}:`, M + 9, y);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(30, 30, 30);
            doc.text(d.valor, M + 9 + doc.getTextWidth(`${d.label}: `), y);
            y += 5;
        });
        y += 3;
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...ROJO);
    doc.text("IMPORTANTE", M + 5, y + 1);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(importante, M + 5, y);
    y = yCaja + altoCajaSena + 8;

    // Pie
    doc.setFontSize(9);
    doc.setTextColor(...GRIS);
    doc.text("Piccolo Cocina Artesanal · Este documento es una solicitud y no confirma la reserva.", W / 2, H - 10, { align: "center" });

    return doc;
};

/** Texto del resumen para WhatsApp (sin el PDF, que se adjunta a mano). */
export const resumenWhatsApp = (s: Solicitud) => {
    const lineas = [
        `*Solicitud de reserva ${s.numero}*`,
        "",
        `*Nombre:* ${s.nombre}`,
        `*Fecha del evento:* ${formatFecha(s.fechaEvento)}${s.horaEvento ? ` a las ${s.horaEvento} hs` : ""}`,
        `*Teléfono:* ${s.telefono}`,
        s.email ? `*Email:* ${s.email}` : null,
        `*Departamento:* ${s.departamento}`,
        `*Dirección:* ${[s.direccion, s.direccion2].filter(Boolean).join(" - ")}`,
        s.comentarios ? `*Comentarios:* ${s.comentarios}` : null,
        "",
        "*Presupuesto:*",
        ...(s.items.length
            ? s.items.map(i => `• ${i.title} × ${i.quantity} = ${formatPesos(i.neto)}${i.porcentaje ? ` (-${i.porcentaje}%)` : ""}`)
            : ["(sin menús seleccionados)"]),
        s.descuento > 0 ? `*Descuento por cantidad:* -${formatPesos(s.descuento)}` : null,
        `*Total:* ${formatPesos(s.total)}`,
    ];
    return lineas.filter(l => l !== null).join("\n");
};
