interface DataType {
    sectionClass?: string;
}

const pasosSaldo = [
    { cuando: "72 hs antes", que: "Confirmás la cantidad final de invitados." },
    { cuando: "48 hs antes", que: "Te enviamos el presupuesto final." },
    { cuando: "Hasta el cierre", que: "Abonás el saldo, desde que recibís el presupuesto hasta que termina el evento." },
];

const cancelacion = [
    { plazo: "48 a 24 horas antes", porcentaje: "50%" },
    { plazo: "24 a 12 horas antes", porcentaje: "70%" },
    { plazo: "0 a 12 horas antes", porcentaje: "100%" },
];

const PaymentPolicy = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`payment-area default-padding ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">Formas de pago</h4>
                                <h2 className="title">¿Cómo se Abona el Servicio?</h2>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Paso 1: Seña */}
                        <div className="col-lg-6 mb-30">
                            <div className="payment-step" data-aos="fade-up" data-aos-delay="100">
                                <div className="payment-step-head">
                                    <span className="payment-step-number">01</span>
                                    <div>
                                        <h4>Seña</h4>
                                        <p>para reservar la fecha de tu evento</p>
                                    </div>
                                    <span className="payment-step-amount">$2000</span>
                                </div>

                                <h6 className="payment-step-label">Podés abonarla por</h6>
                                <div className="payment-methods">
                                    <span><i className="fas fa-store" /> Abitab / Red Pagos</span>
                                    <span><i className="fas fa-university" /> Transferencia Itaú</span>
                                </div>

                                <ul className="list-style-one">
                                    <li>La fecha queda reservada únicamente con el comprobante enviado por WhatsApp.</li>
                                    <li>En caso de cancelar la fecha, la seña no tiene devolución.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Paso 2: Saldo final */}
                        <div className="col-lg-6 mb-30">
                            <div className="payment-step" data-aos="fade-up" data-aos-delay="200">
                                <div className="payment-step-head">
                                    <span className="payment-step-number">02</span>
                                    <div>
                                        <h4>Saldo Final</h4>
                                        <p>en efectivo o transferencia</p>
                                    </div>
                                </div>

                                <ul className="payment-timeline">
                                    {pasosSaldo.map(paso => (
                                        <li key={paso.cuando}>
                                            <strong>{paso.cuando}</strong>
                                            <span>{paso.que}</span>
                                        </li>
                                    ))}
                                </ul>

                                <ul className="list-style-one">
                                    <li>No es posible abonar el saldo final en días posteriores al evento.</li>
                                    <li>Una vez enviado el presupuesto final, no es posible bajar el número de invitados.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Política de cancelación */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="cancellation-policy" data-aos="fade-up" data-aos-delay="100">
                                <div className="cancellation-policy-intro">
                                    <i className="fas fa-calendar-times" />
                                    <div>
                                        <h4>Política de Cancelación</h4>
                                        <p>Si cancelás cerca de la fecha, se abona un porcentaje del total.</p>
                                    </div>
                                </div>
                                <ul>
                                    {cancelacion.map(item => (
                                        <li key={item.plazo}>
                                            <span>{item.plazo}</span>
                                            <strong>{item.porcentaje}</strong>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPolicy;
