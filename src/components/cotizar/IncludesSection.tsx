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
            <div className={`includes-area default-padding ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">El servicio</h4>
                                <h2 className="title">¿Qué Incluye?</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-7 mb-30">
                            <div className="includes-card includes-card-yes" data-aos="fade-up" data-aos-delay="100">
                                <div className="includes-card-head">
                                    <i className="fas fa-check" />
                                    <h4>Sí incluye</h4>
                                </div>
                                <ul className="list-style-one includes-list">
                                    {included.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-5 mb-30">
                            <div className="includes-card includes-card-no" data-aos="fade-up" data-aos-delay="200">
                                <div className="includes-card-head">
                                    <i className="fas fa-times" />
                                    <h4>No incluye</h4>
                                </div>
                                <ul className="includes-list">
                                    {notIncluded.map((item, index) => (
                                        <li key={index}>{item}</li>
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
