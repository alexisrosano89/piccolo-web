// Por ahora las tres tarjetas usan la foto de la tabla; cambiar cuando haya fotos propias de cada una.
import fotoTablaClasica from "/assets/img/menu/tabla-clasica.jpg";
import shape9 from "/assets/img/shape/9.png";
import { Link } from "react-router-dom";

interface DataType {
    sectionClass?: string;
}

const clasicaItems = "Guacamole, alioli de remolacha, queso cuartirolo, queso colonia, queso roquefort, bondiola, mortadela, longaniza, aceitunas verdes y frutos secos.";

const gourmetItems = "Tostaditas, guacamole, alioli de remolacha, queso camembert, queso roquefort, queso colonia, bondiola, mortadela, longaniza, brochettes capresse, aceitunas negras y frutos secos.";

const WHATSAPP_LINK = "https://wa.me/59894610637";

const TablasSection = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`menu-type-area overflow-hidden default-padding bottom-less bg-dark ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">Para Picar</h4>
                                <h2 className="title">Nuestras Tablas</h2>
                                <p>Se sugiere 1 tabla cada 6 invitados. Incluye pan casero y grisines.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        {/* Clásica */}
                        <div className="col-xl-4 col-md-6 menu-type-single mb-30">
                            <div className="menu-type-item active" data-aos="fade-up" data-aos-delay="100">
                                <div className="thumb">
                                    <img src={fotoTablaClasica} alt="Tabla Clásica" />
                                    <img src={shape9} alt="Image Not Found" />
                                </div>
                                <div className="info">
                                    <h3>Clásica</h3>
                                    <p className="menu-type-description">{clasicaItems}</p>
                                </div>
                            </div>
                        </div>

                        {/* Gourmet */}
                        <div className="col-xl-4 col-md-6 menu-type-single mb-30">
                            <div className="menu-type-item" data-aos="fade-up" data-aos-delay="200">
                                <div className="thumb">
                                    <img src={fotoTablaClasica} alt="Tabla Gourmet" />
                                    <img src={shape9} alt="Image Not Found" />
                                </div>
                                <div className="info">
                                    <h3>Gourmet</h3>
                                    <p className="menu-type-description">{gourmetItems}</p>
                                </div>
                            </div>
                        </div>

                        {/* Mesa de bienvenida */}
                        <div className="col-xl-4 col-md-6 menu-type-single mb-30">
                            <div className="menu-type-item" data-aos="fade-up" data-aos-delay="400">
                                <div className="thumb">
                                    <img src={fotoTablaClasica} alt="Mesa de Bienvenida" />
                                    <img src={shape9} alt="Image Not Found" />
                                </div>
                                <div className="info">
                                    <h3>Mesa de Bienvenida</h3>
                                    <p className="menu-type-description">
                                        1 tabla clásica + 1 tabla gourmet presentada en una mesa amplia, para 15 personas. Personalizable. Consulte precio.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Un solo botón de consulta para las tres tablas */}
                    <div className="tablas-cta text-center" data-aos="fade-up" data-aos-delay="200">
                        <Link to={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn circle btn-md btn-theme effect">
                            <i className="fab fa-whatsapp" /> Consultar
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TablasSection;
