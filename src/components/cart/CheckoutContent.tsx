/* eslint-disable no-unused-vars */

import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import { toast } from "react-toastify";
import { RootState } from "../../store/store";
import CustomSelect from "../select/CustomSelect";
import SenaInfo from "./SenaInfo";
import { calcularLinea, calcularTotales, estadoSena, mensajeMinimoSena } from "../../utils/presupuesto";
import { Link, Navigate } from "react-router-dom";
// "/max": reglas completas por país (la versión liviana acepta números incompletos).
import PhoneInput, { isValidPhoneNumber, formatPhoneNumberIntl } from "react-phone-number-input/max";
import flags from "react-phone-number-input/flags";
import phoneLabelsEs from "react-phone-number-input/locale/es.json";
import "react-phone-number-input/style.css";
import {
    Solicitud,
    formatPesos,
    generarSolicitudPdf,
    nuevoNumeroSolicitud,
    resumenWhatsApp,
} from "../../utils/solicitudPdf";

registerLocale("es", es);

// Número de WhatsApp que recibe las solicitudes de reserva (sin "+").
const WHATSAPP_SOLICITUDES = "59894321129";

interface FormEventHandler {
    (event: React.FormEvent<HTMLFormElement>): void;
}

const departamentos = [
    { value: '1', label: 'Montevideo' },
    { value: '2', label: 'Canelones' },
    { value: '3', label: 'Maldonado' },
    { value: '4', label: 'Otro departamento' },
]
const DEPARTAMENTO_INICIAL = 1; // índice que muestra el selector al cargar

// Horarios de inicio del evento: de 11:00 a 20:00 cada 30 minutos.
const HORA_DESDE = 11;
const HORA_HASTA = 20;
const HORARIOS = Array.from({ length: (HORA_HASTA - HORA_DESDE) * 2 + 1 }, (_, i) => {
    const minutos = HORA_DESDE * 60 + i * 30;
    return `${String(Math.floor(minutos / 60)).padStart(2, "0")}:${minutos % 60 === 0 ? "00" : "30"}`;
});

const CheckoutContent = () => {

    const [eventDate, setEventDate] = useState<Date | null>(null);
    const [departamento, setDepartamento] = useState(departamentos[DEPARTAMENTO_INICIAL].label);
    const [enviando, setEnviando] = useState(false);
    const [pdfListo, setPdfListo] = useState<File | null>(null);
    // Teléfono en formato internacional (E.164, p. ej. "+59894123456") o undefined si está vacío.
    const [telefono, setTelefono] = useState<string | undefined>();
    const [telefonoTocado, setTelefonoTocado] = useState(false);
    const telefonoInvalido = telefonoTocado && !(telefono && isValidPhoneNumber(telefono));
    const datePickerRef = useRef<ReactDatePicker | null>(null);

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const { subtotal, descuento, total } = calcularTotales(cartItems);
    const sena = estadoSena(cartItems);

    const handleForm: FormEventHandler = (event) => {
        event.preventDefault()
        if (enviando) return;
        const form = event.currentTarget;

        if (!sena.habilitada) {
            toast.error(mensajeMinimoSena(sena.faltan));
            return;
        }

        if (!eventDate) {
            toast.error("Elegí la fecha del evento");
            datePickerRef.current?.setFocus();
            return;
        }

        if (!telefono || !isValidPhoneNumber(telefono)) {
            setTelefonoTocado(true);
            toast.error("Revisá el teléfono / WhatsApp: el número no es válido.");
            document.getElementById("phone")?.focus();
            return;
        }

        const datos = new FormData(form);
        const campo = (name: string) => String(datos.get(name) ?? "").trim();
        const emitida = new Date();

        const solicitud: Solicitud = {
            numero: nuevoNumeroSolicitud(emitida),
            emitida,
            nombre: campo("full-name"),
            fechaEvento: eventDate,
            horaEvento: campo("event-time"),
            departamento,
            direccion: campo("st-address"),
            direccion2: campo("st-address2"),
            telefono: formatPhoneNumberIntl(telefono) || telefono,
            email: campo("email"),
            comentarios: campo("comments"),
            items: cartItems.map(item => {
                const { porcentaje, neto } = calcularLinea(item);
                return { title: item.title, price: item.price, quantity: item.quantity, porcentaje, neto };
            }),
            subtotal,
            descuento,
            total,
        };

        // La pestaña de WhatsApp se abre ya, dentro del clic, para que el navegador no la bloquee
        // como pop-up. Cuando tengamos el link del PDF la mandamos al chat.
        const pestanaWhatsApp = window.open("", "_blank");

        setEnviando(true);
        setPdfListo(null);
        (async () => {
            let pdfUrl: string | null = null;
            try {
                const doc = await generarSolicitudPdf(solicitud);
                const nombreArchivo = `solicitud-${solicitud.numero}.pdf`;
                doc.save(nombreArchivo);
                setPdfListo(new File([doc.output("blob")], nombreArchivo, { type: "application/pdf" }));

                try {
                    const pdfBase64 = doc.output("datauristring").split(",")[1];
                    const res = await fetch("/api/solicitud", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            numero: solicitud.numero,
                            nombre: solicitud.nombre,
                            telefono: solicitud.telefono,
                            email: solicitud.email,
                            resumen: resumenWhatsApp(solicitud),
                            pdfBase64,
                        }),
                    });
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const body = await res.json();
                    pdfUrl = typeof body.pdfUrl === "string" ? body.pdfUrl : null;
                } catch (err) {
                    console.error("No se pudo subir/enviar la solicitud", err);
                }

                const texto = resumenWhatsApp(solicitud) + "\n\n" + (pdfUrl
                    ? `*PDF de la solicitud:* ${pdfUrl}`
                    : "(Te adjunto el PDF de la solicitud)");
                const waUrl = `https://wa.me/${WHATSAPP_SOLICITUDES}?text=${encodeURIComponent(texto)}`;
                if (pestanaWhatsApp) pestanaWhatsApp.location.href = waUrl;
                else window.location.href = waUrl; // pop-up bloqueado: vamos en la misma pestaña

                if (pdfUrl) toast.success("¡Solicitud lista! Enviá el mensaje de WhatsApp para confirmarla.");
                else toast.warn("Se descargó el PDF. Adjuntalo en el chat de WhatsApp al enviar el mensaje.");
                form.reset();
                setEventDate(null);
                setTelefono(undefined);
                setTelefonoTocado(false);
            } catch (err) {
                console.error("No se pudo generar la solicitud", err);
                pestanaWhatsApp?.close();
                toast.error("No pudimos generar la solicitud. Probá de nuevo o escribinos por WhatsApp.");
            } finally {
                setEnviando(false);
            }
        })();
    }

    // Opción "Compartir" (celulares): abre el menú del sistema con el PDF adjunto.
    const puedeCompartir = (file: File) =>
        typeof navigator !== "undefined" && !!navigator.canShare?.({ files: [file] });

    const compartirPdf = async () => {
        if (!pdfListo) return;
        try {
            await navigator.share({ files: [pdfListo], title: "Solicitud de reserva - Piccolo" });
        } catch (err) {
            if ((err as DOMException)?.name !== "AbortError") {
                toast.error("No se pudo compartir el PDF desde este dispositivo.");
            }
        }
    }

    // Sin el mínimo de personas no se puede señar: volvemos al presupuesto, donde se explica qué falta.
    // (Si ya se está enviando, no redirigimos para no cortar el envío.)
    if (!sena.habilitada && !enviando) {
        return <Navigate to="/presupuesto" replace />;
    }

    return (
        <div className="checkout-area default-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <form className="checkout-form" onSubmit={handleForm}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <h3>Datos de contacto</h3>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label htmlFor="full-name">Nombre y apellido *</label>
                                                <input className="form-control" id="full-name" name="full-name" type="text" autoComplete="name" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group checkout-date">
                                                <label htmlFor="event-date">Fecha del evento *</label>
                                                <ReactDatePicker
                                                    id="event-date"
                                                    name="event-date"
                                                    className="form-control"
                                                    selected={eventDate}
                                                    onChange={(date: Date | null) => setEventDate(date)}
                                                    minDate={new Date()}
                                                    locale="es"
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="dd/mm/aaaa"
                                                    autoComplete="off"
                                                    required
                                                    ref={datePickerRef}
                                                />
                                                <span
                                                    className="checkout-date-icon"
                                                    onClick={() => datePickerRef.current?.setFocus()}
                                                    aria-hidden="true"
                                                >
                                                    <i className="fas fa-calendar-alt" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group checkout-date">
                                                <label htmlFor="event-time">Hora del evento *</label>
                                                <select
                                                    id="event-time"
                                                    name="event-time"
                                                    className="form-control checkout-time"
                                                    required
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled>Elegí la hora</option>
                                                    {HORARIOS.map(h => <option key={h} value={h}>{h} hs</option>)}
                                                </select>
                                                <span className="checkout-date-icon" aria-hidden="true">
                                                    <i className="fas fa-clock" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label htmlFor="select">Departamento *</label>
                                                <CustomSelect
                                                    options={departamentos}
                                                    selectValue={DEPARTAMENTO_INICIAL}
                                                    onChange={(option) => setDepartamento(option.label)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label htmlFor="name">Dirección del evento *</label>
                                                <input className="form-control" id="st-address" name="st-address" type="text" placeholder="Calle y número" autoComplete="off" required />
                                                <input className="form-control" id="st-address2" name="st-address2" type="text" placeholder="Apto, barrio o referencias (opcional)" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label htmlFor="phone">Teléfono / WhatsApp *</label>
                                                <PhoneInput
                                                    id="phone"
                                                    className={`phone-field${telefonoInvalido ? " is-invalid" : ""}`}
                                                    numberInputProps={{ className: "form-control", name: "phone", required: true, "aria-invalid": telefonoInvalido }}
                                                    defaultCountry="UY"
                                                    countryOptionsOrder={["UY", "AR", "BR", "PY", "CL", "|", "..."]}
                                                    countryCallingCodeEditable={false}
                                                    flags={flags}
                                                    labels={phoneLabelsEs}
                                                    placeholder="094 123 456"
                                                    autoComplete="tel"
                                                    value={telefono}
                                                    onChange={setTelefono}
                                                    onBlur={() => setTelefonoTocado(true)}
                                                />
                                                {telefonoInvalido && (
                                                    <small className="field-error">Ingresá un número de teléfono válido para el país elegido.</small>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label htmlFor="email">Email (opcional)</label>
                                                <input className="form-control" id="email" name="email" type="email" autoComplete="email" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label htmlFor="comments">Comentarios (opcional)</label>
                                                <textarea className="form-control checkout-comments" id="comments" name="comments" rows={3} placeholder="Opciones para celíacos o vegetarianos, pedidos especiales..." autoComplete="off" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <h3>Tu presupuesto</h3>
                                    {descuento > 0 && (
                                        <div className="discount-banner" role="status">
                                            <i className="fas fa-tags" aria-hidden="true" />
                                            <strong>¡Tenés un descuento por cantidad!</strong>
                                        </div>
                                    )}
                                    <div className="shop-cart-totals checkout-summary">
                                        <div className="table-responsive table-bordered">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Menú</th>
                                                        <th scope="col">Subtotal</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* Líneas al precio de lista; el descuento va en una sola fila aparte. */}
                                                    {cartItems.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{item.title} × {item.quantity}</td>
                                                            <td>{formatPesos(item.price * item.quantity)}</td>
                                                        </tr>
                                                    ))}
                                                    {descuento > 0 && (
                                                        <>
                                                            <tr className="checkout-summary-sub">
                                                                <th scope="row">Subtotal</th>
                                                                <td>{formatPesos(subtotal)}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Descuento por cantidad</th>
                                                                <td className="checkout-line-discount">−{formatPesos(descuento)}</td>
                                                            </tr>
                                                        </>
                                                    )}
                                                    <tr className="checkout-summary-note">
                                                        <th scope="row">Traslado</th>
                                                        <td>Sin costo en Montevideo y Ciudad de la Costa</td>
                                                    </tr>
                                                    <tr className="checkout-summary-total">
                                                        <th scope="row">Total</th>
                                                        <th>{formatPesos(total)}</th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <p className="checkout-summary-edit">
                                            <Link to="/presupuesto"><i className="fas fa-pen" /> Modificar presupuesto</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <SenaInfo />
                                    <button type="submit" name="submit" id="submit" disabled={enviando}>
                                        {enviando ? "Enviando..." : "Enviar solicitud"}
                                    </button>
                                    {pdfListo && puedeCompartir(pdfListo) && (
                                        <button type="button" className="checkout-share-btn" onClick={compartirPdf}>
                                            <i className="fas fa-share-alt" /> Compartir PDF
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutContent;
