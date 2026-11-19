interface DataType {
    title?: string;
    text?: string;
}

const ContactPageContent = ({ title, text }: DataType) => {
    return (
        <>
            <div className="maps-area overflow-hidden">
                <div className="google-maps">
                    <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-56.0025045%2C-34.8590593%2C-55.9825045%2C-34.8502593&layer=mapnik&marker=-34.8546593%2C-55.9885045" />
                </div>
                <div className="contact-style-one-items">
                    <div className="container">
                        <div className="contact-style-one-box">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="contact-style-one-info">
                                        <h2>{title ? title : "Encontranos"}</h2>
                                        <p>
                                            {text ? text : "Escribinos por WhatsApp para hacer tu pedido o consultar por tu evento. Te respondemos a la brevedad."}
                                        </p>
                                        <ul>
                                            <li>
                                                <div className="icon whatsapp-icon">
                                                    <i className="fab fa-whatsapp" />
                                                </div>
                                                <div className="content">
                                                    <h5 className="title">WhatsApp</h5>
                                                    <a href="https://wa.me/59894610637" target="_blank" rel="noreferrer">+598 094 610 637</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="icon">
                                                    <i className="fas fa-map-marker-alt" />
                                                </div>
                                                <div className="info">
                                                    <h5 className="title">Ubicación</h5>
                                                    <p>
                                                        Cielo Azul 5611 esquina Rambla, <br /> Shangrilá, La Costa
                                                    </p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="icon">
                                                    <i className="fas fa-clock" />
                                                </div>
                                                <div className="info">
                                                    <h5 className="title">Horario</h5>
                                                    <p>De jueves a domingo de 19:30 a 23:30</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="icon">
                                                    <i className="fas fa-shopping-bag" />
                                                </div>
                                                <div className="info">
                                                    <h5 className="title">Take away</h5>
                                                    <p>10% de descuento</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactPageContent;