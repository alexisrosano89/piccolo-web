/**
 * Datos para señar la fecha. Única fuente: los usan /reservar y el PDF de la solicitud.
 * Si cambian (titular, cuenta, monto), actualizalos solo acá.
 */

export const SENA_MONTO = 2000;

export interface MetodoSena {
    titulo: string;
    nota?: string;
    datos: { label: string; valor: string; copiable?: boolean }[];
}

export const METODOS_SENA: MetodoSena[] = [
    {
        titulo: "Giro por RedPagos o Abitab",
        nota: "El costo del giro corre por cuenta del cliente.",
        datos: [
            { label: "A nombre de", valor: "Agustín Pérez Leiza" },
            { label: "CI", valor: "4.419.307-9", copiable: true },
        ],
    },
    {
        titulo: "Depósito en cuenta corriente de banco Itaú",
        datos: [
            { label: "Número de cuenta", valor: "2906981", copiable: true },
            { label: "A nombre de", valor: "Agustín Pérez Leiza" },
        ],
    },
];

export const SENA_IMPORTANTE = [
    "Una vez realizado el pago es indispensable enviarnos la foto del comprobante por WhatsApp.",
    "Es necesario señar para reservar la fecha: queda reservada únicamente con el comprobante.",
];
