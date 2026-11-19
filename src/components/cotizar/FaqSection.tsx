import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { GROUP_DISCOUNTS, MIN_PERSONAS_SENA } from "../../utils/presupuesto";

interface DataType {
    sectionClass?: string;
    /** Agrega la ficha FAQPage para Google. Solo en /preguntas-frecuentes, para no duplicarla. */
    withSchema?: boolean;
    /** Muestra el título "¿Tenés dudas? / Preguntas Frecuentes". En /preguntas-frecuentes no hace falta. */
    hasTitle?: boolean;
}

interface Pregunta {
    pregunta: string;
    /** Párrafos de la respuesta (texto plano: también se usa para la ficha de Google). */
    respuesta: string[];
    /** Viñetas opcionales debajo de los párrafos. */
    lista?: string[];
}

// WhatsApp de eventos (teléfono principal).
const WHATSAPP_EVENTOS = "https://wa.me/59898314477";

const escalones = [...GROUP_DISCOUNTS].reverse()
    .map(d => `Desde ${d.personas} personas: ${d.descuento}% de descuento.`);

const grupos: { titulo: string; preguntas: Pregunta[] }[] = [
    {
        titulo: "Reservas y pagos",
        preguntas: [
            {
                pregunta: "¿Cómo reservo la fecha de mi evento?",
                respuesta: [
                    "Armá tu presupuesto en la sección Cotizar, tocá \"Señar fecha\" y completá tus datos. Te descargás un PDF con el detalle y se abre un chat de WhatsApp con nosotros.",
                    "Para reservar se abona una seña de $2000 por Abitab / Red Pagos o transferencia al banco Itaú. La fecha queda reservada únicamente cuando nos enviás el comprobante por WhatsApp.",
                ],
            },
            {
                pregunta: "¿Cuál es la cantidad mínima de invitados?",
                respuesta: [
                    `El mínimo es de ${MIN_PERSONAS_SENA} personas por cada menú principal (pizzas, chivitos o asado). Podés pedir más de un menú, pero cada uno tiene que llegar a ${MIN_PERSONAS_SENA}: las cantidades no se combinan entre menús. Los complementos no tienen mínimo.`,
                ],
            },
            {
                pregunta: "¿Hay descuentos por cantidad de invitados?",
                respuesta: [
                    "Sí, en el menú principal. Cada menú se calcula según su propia cantidad y el descuento se aplica solo en tu presupuesto:",
                ],
                lista: escalones,
            },
            {
                pregunta: "¿Cuándo confirmo la cantidad final y pago el saldo?",
                respuesta: [
                    "La cantidad final de invitados se confirma 72 horas antes del evento. 48 horas antes te enviamos el presupuesto final.",
                    "El saldo se abona desde que recibís el presupuesto final hasta el cierre del evento, en efectivo o transferencia. No es posible abonarlo en días posteriores, y una vez enviado el presupuesto final no se puede bajar el número de invitados.",
                ],
            },
            {
                pregunta: "¿Qué pasa si cancelo el evento?",
                respuesta: [
                    "La seña no tiene devolución. Si cancelás cerca de la fecha, se abona un porcentaje del total:",
                ],
                lista: [
                    "De 48 a 24 horas antes: 50% del total.",
                    "De 24 a 12 horas antes: 70% del total.",
                    "De 12 a 0 horas antes: 100% del total.",
                ],
            },
            {
                pregunta: "¿Cuánto tiempo es válido el presupuesto? ¿Entregan factura?",
                respuesta: [
                    "El presupuesto tiene 30 días de validez. Sí, entregamos factura.",
                ],
            },
        ],
    },
    {
        titulo: "El servicio",
        preguntas: [
            {
                pregunta: "¿Qué incluye el servicio?",
                respuesta: [
                    "Llegamos unas 2 horas antes para preparar todo y servimos los menús durante 2 a 3 horas aproximadamente. Incluye:",
                ],
                lista: [
                    "Personal para servir nuestros menús.",
                    "Todos los materiales para la cocina.",
                    "Servilletas.",
                    "Dejar el lugar tal cual fue recibido.",
                    "Alquiler de horno y parrillero (con costo extra).",
                ],
            },
            {
                pregunta: "¿Qué no incluye?",
                respuesta: ["No incluye:"],
                lista: [
                    "Mozos para bebidas o postres.",
                    "Mesa de trabajo.",
                    "Toldo para lluvia.",
                    "Disponibilidad ilimitada.",
                    "Limpieza de vajilla externa a nuestro servicio.",
                ],
            },
            {
                pregunta: "¿A qué zonas van? ¿El traslado tiene costo?",
                respuesta: [
                    "Hacemos eventos en Montevideo, Canelones y Maldonado. El traslado es sin costo dentro de Montevideo y Ciudad de la Costa; para otras zonas, consultanos por WhatsApp.",
                ],
            },
            {
                pregunta: "¿Tienen opciones para celíacos y vegetarianos?",
                respuesta: [
                    "Sí. Contamos con pizzas para celíacos y chivitos vegetarianos, y los tacos pueden ser de champignon. Contanos en los comentarios de tu reserva cuántos invitados lo necesitan.",
                ],
            },
        ],
    },
    {
        titulo: "Delivery y take away",
        preguntas: [
            {
                pregunta: "¿Hacen delivery? ¿En qué horario?",
                respuesta: [
                    "Sí: tortillas de papas y boniatos, gramajo, pizzas y calzones con masa de fermentación lenta. Atendemos de jueves a domingo de 19:30 a 23:30. Hacé tu pedido por WhatsApp al 094 610 637.",
                ],
            },
            {
                pregunta: "¿Puedo retirar mi pedido en el local?",
                respuesta: [
                    "Sí, en Cielo Azul 5611 esquina Rambla, Shangrilá. Retirando en el local (take away) tenés 10% de descuento.",
                ],
            },
        ],
    },
];

/** Ficha "FAQPage" para Google, con las mismas preguntas y respuestas que se ven en pantalla. */
const useFaqSchema = (enabled: boolean) => {
    useEffect(() => {
        if (!enabled) return;
        const data = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: grupos.flatMap(g => g.preguntas).map(p => ({
                "@type": "Question",
                name: p.pregunta,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: [...p.respuesta, ...(p.lista ?? [])].join(" "),
                },
            })),
        };
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = "faq-schema";
        script.textContent = JSON.stringify(data);
        document.getElementById("faq-schema")?.remove();
        document.head.appendChild(script);
        return () => script.remove();
    }, [enabled]);
};

const FaqItem = ({ item, abierto, onToggle }: { item: Pregunta; abierto: boolean; onToggle: () => void }) => {
    const id = useId();
    return (
        <div className={`faq-item${abierto ? " open" : ""}`}>
            <button
                type="button"
                className="faq-question"
                aria-expanded={abierto}
                aria-controls={id}
                onClick={onToggle}
            >
                <span>{item.pregunta}</span>
                <i className="fas fa-plus" aria-hidden="true" />
            </button>
            <div className="faq-answer" id={id} role="region" aria-hidden={!abierto}>
                <div className="faq-answer-inner">
                    {item.respuesta.map((p, i) => <p key={i}>{p}</p>)}
                    {item.lista && (
                        <ul className="list-style-one">
                            {item.lista.map((li, i) => <li key={i}>{li}</li>)}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

const FaqSection = ({ sectionClass, withSchema = true, hasTitle = true }: DataType) => {
    // Clave "grupo-pregunta" de la pregunta abierta. Arranca abierta la primera.
    const [abierta, setAbierta] = useState<string | null>("0-0");
    useFaqSchema(withSchema);

    return (
        <div className={`faq-area default-padding ${sectionClass ? sectionClass : ""}`}>
            <div className="container">
                {hasTitle && (
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">¿Tenés dudas?</h4>
                                <h2 className="title">Preguntas Frecuentes</h2>
                            </div>
                        </div>
                    </div>
                )}
                <div className="row">
                    <div className="col-xl-10 offset-xl-1">
                        {grupos.map((grupo, g) => (
                            <div className="faq-group" key={grupo.titulo} data-aos="fade-up" data-aos-delay="100">
                                <h5 className="faq-group-title">{grupo.titulo}</h5>
                                {grupo.preguntas.map((item, p) => {
                                    const clave = `${g}-${p}`;
                                    return (
                                        <FaqItem
                                            key={clave}
                                            item={item}
                                            abierto={abierta === clave}
                                            onToggle={() => setAbierta(abierta === clave ? null : clave)}
                                        />
                                    );
                                })}
                            </div>
                        ))}

                        <div className="faq-cta">
                            <p>¿No encontrás lo que buscás?</p>
                            <Link to={WHATSAPP_EVENTOS} target="_blank" rel="noreferrer" className="btn btn-theme btn-md animation">
                                <i className="fab fa-whatsapp" /> Escribinos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqSection;
