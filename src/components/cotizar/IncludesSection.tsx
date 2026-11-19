interface DataType {
    sectionClass?: string;
}

const included = [
    "Personal para servir nuestros menús.",
    "Preparación de 2 horas aprox.",
    "2 a 3 horas aprox. sirviendo menús.",
    "Alquiler de horno y parrillero (costo extra).",
    "Mínimo 15 invitados.",
    "Todos los materiales para la cocina.",
    "Viático de traslado sin costo dentro de Montevideo y Ciudad de la Costa.",
    "Factura.",
    "Dejar el lugar tal cual fue recibido.",
    "30 días validez presupuesto.",
    "Servilletas.",
];

const notIncluded = [
    "Mozos para bebidas o postres.",
    "Mesa de trabajo.",
    "Toldo para lluvia.",
    "Disponibilidad ilimitada.",
    "Limpieza de vajilla externa a nuestro servicio.",
];

const IncludesSection = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`default-padding ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-30">
                            <div className="includes-box includes-yes">
                                <h4><i className="fas fa-check-circle" /> Sí incluye</h4>
                                <ul>
                                    {included.map((item, index) => (
                                        <li key={index}><i className="fas fa-check" /> {item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-30">
                            <div className="includes-box includes-no">
                                <h4><i className="fas fa-times-circle" /> No incluye</h4>
                                <ul>
                                    {notIncluded.map((item, index) => (
                                        <li key={index}><i className="fas fa-times" /> {item}</li>
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

export default IncludesSection;
