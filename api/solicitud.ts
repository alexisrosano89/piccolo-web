// Función serverless de Vercel: recibe la solicitud de reserva desde /reservar,
// sube el PDF a Vercel Blob (para mandar el link por WhatsApp) y lo envía por email con Resend.
//
// Variables de entorno (Vercel → Settings → Environment Variables):
//   BLOB_READ_WRITE_TOKEN  la crea Vercel sola al conectar un Blob store *público* al proyecto
//   RESEND_API_KEY         clave de https://resend.com
//   SOLICITUD_EMAIL_TO     email que recibe las solicitudes
//   SOLICITUD_EMAIL_FROM   remitente; por defecto "Piccolo <onboarding@resend.dev>"
//                          (sin dominio verificado, Resend solo entrega al email de tu cuenta)
// Cada parte es independiente: si falta la config de una, la otra igual funciona.

import { put } from "@vercel/blob";

// El proyecto no instala @types/node; alcanza con tipar lo que usamos.
declare const process: { env: Record<string, string | undefined> };

interface Payload {
    numero?: string;
    nombre?: string;
    telefono?: string;
    email?: string;
    resumen?: string;
    pdfBase64?: string;
}

const MAX_PDF_BYTES = 3 * 1024 * 1024;

const escapeHtml = (s: string) =>
    s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

const json = (status: number, body: unknown) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const subirPdf = async (numero: string, pdf: Uint8Array<ArrayBuffer>): Promise<string | null> => {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.warn("Blob no configurado: falta BLOB_READ_WRITE_TOKEN");
        return null;
    }
    try {
        const blob = await put(`solicitudes/solicitud-${numero}.pdf`, new Blob([pdf], { type: "application/pdf" }), {
            access: "public",
            addRandomSuffix: true, // URL imposible de adivinar
            contentType: "application/pdf",
        });
        return blob.url;
    } catch (err) {
        console.error("Error subiendo el PDF a Blob", err);
        return null;
    }
};

const enviarEmail = async (p: {
    numero: string; nombre: string; resumen: string; replyTo: string; pdfBase64: string; pdfUrl: string | null;
}): Promise<boolean> => {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.SOLICITUD_EMAIL_TO;
    const from = process.env.SOLICITUD_EMAIL_FROM || "Piccolo <onboarding@resend.dev>";
    if (!apiKey || !to) {
        console.warn("Email no configurado: falta RESEND_API_KEY o SOLICITUD_EMAIL_TO");
        return false;
    }

    const html =
        `<p>Nueva solicitud de reserva desde la web.</p>` +
        `<pre style="font-family:inherit;white-space:pre-wrap">${escapeHtml(p.resumen.replace(/\*/g, ""))}</pre>` +
        (p.pdfUrl ? `<p><a href="${escapeHtml(p.pdfUrl)}">Ver PDF online</a></p>` : "") +
        `<p>Adjunto: PDF de la solicitud.</p>`;

    try {
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                from,
                to: [to],
                subject: `Solicitud de reserva ${p.numero} - ${p.nombre}`,
                html,
                ...(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.replyTo) ? { reply_to: p.replyTo } : {}),
                attachments: [{ filename: `solicitud-${p.numero}.pdf`, content: p.pdfBase64 }],
            }),
        });
        if (!res.ok) {
            console.error("Resend error", res.status, await res.text());
            return false;
        }
        return true;
    } catch (err) {
        console.error("Error enviando el email", err);
        return false;
    }
};

export async function POST(request: Request): Promise<Response> {
    let data: Payload;
    try {
        data = await request.json();
    } catch {
        return json(400, { error: "JSON inválido" });
    }

    // El número se usa en el nombre del archivo: solo letras, números y guiones.
    const numero = String(data.numero ?? "").replace(/[^A-Za-z0-9-]/g, "").slice(0, 40);
    const nombre = String(data.nombre ?? "").slice(0, 120);
    const resumen = String(data.resumen ?? "").slice(0, 5000);
    const pdfBase64 = String(data.pdfBase64 ?? "");
    const replyTo = String(data.email ?? "").trim();

    if (!numero || !nombre || !pdfBase64) {
        return json(400, { error: "Faltan datos de la solicitud" });
    }
    if (pdfBase64.length * 0.75 > MAX_PDF_BYTES || !/^[A-Za-z0-9+/=]+$/.test(pdfBase64)) {
        return json(400, { error: "PDF inválido" });
    }

    const pdf = Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0));
    // Solo aceptamos PDFs (empiezan con "%PDF-").
    if (String.fromCharCode(...pdf.subarray(0, 5)) !== "%PDF-") {
        return json(400, { error: "PDF inválido" });
    }

    const pdfUrl = await subirPdf(numero, pdf);
    const emailEnviado = await enviarEmail({ numero, nombre, resumen, replyTo, pdfBase64, pdfUrl });

    if (!pdfUrl && !emailEnviado) {
        return json(502, { error: "No se pudo guardar ni enviar la solicitud", pdfUrl, emailEnviado });
    }
    return json(200, { ok: true, pdfUrl, emailEnviado });
}
