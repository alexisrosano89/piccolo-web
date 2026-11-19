interface DataType {
    sectionClass?: string;
}

const PaymentPolicy = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`default-padding ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="site-heading text-center">
                                <h2 className="title">¿Cómo se Abona el Servicio?</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 mb-30">
                            <div className="payment-policy-box">
                                <h4>1. Seña</h4>
                                <p className="payment-amount">$2000</p>
                                <p>para reservar la fecha de tu evento.</p>
                                <p><strong>2 vías:</strong><br />- Abitab / Red Pagos<br />- Transferencia a banco Itaú</p>
                                <p>Fecha reservada únicamente con comprobante enviado por WhatsApp.</p>
                                <p>En caso de cancelar fecha, la seña no tiene devolución.</p>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-30">
                            <div className="payment-policy-box">
                                <h4>2. Saldo Final</h4>
                                <p><strong>La cantidad final de invitados debe confirmarse 72 horas antes del evento.</strong></p>
                                <p>48 horas antes del evento se envía presupuesto final.</p>
                                <p>Una vez enviado puede abonarse el servicio, desde ese momento, hasta el cierre del evento. No es posible abonar el saldo final días posteriores.</p>
                                <p><strong>Pagos con efectivo o transferencia.</strong></p>
                                <p>Una vez enviado el presupuesto final, no es posible bajar el número de invitados.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="cancellation-policy-box">
                                <h5>Política de Cancelación</h5>
                                <ul>
                                    <li>48 a 24 horas antes del evento: abona 50% del total.</li>
                                    <li>24 a 12 horas antes del evento: abona 70% del total.</li>
                                    <li>0 a 12 horas antes del evento: abona 100% del total.</li>
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
