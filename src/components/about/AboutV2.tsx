import about2 from "/assets/img/about/piccolo-cocinando.webp"
import { Link } from "react-router-dom";

const AboutV2 = () => {
    return (
        <>
            <div className="about-style-two-area default-padding">
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-6">
                            <div className="thumb-style-two" data-aos="fade-up" data-aos-delay="100">
                                <img src={about2} alt="Cocinero de Piccolo preparando pizzas" />
                            </div>
                        </div>
                        <div className="col-lg-5 offset-lg-1">
                            <div className="about-style-two-info">
                                <h4 className="sub-heading">Bienvenidos a</h4>
                                <h2 className="title">Piccolo Cocina Artesanal</h2>
                                <p>
                                    Somos una cocina artesanal a la leña de Shangrilá, Ciudad de la Costa. Llevamos nuestro horno y parrillero a tu evento y nos encargamos de todo: preparamos, cocinamos y servimos pizzas de masa de fermentación lenta, chivitos, asado y mucho más, para que vos solo te ocupes de disfrutar con tus invitados.
                                </p>
                                <Link className="btn btn-theme btn-md animation" to="/cotizar">Ver menús</Link>
                                <ul className="launch-time">
                                    <li data-aos="fade-up">
                                        <h4>Eventos</h4>
                                        <ul>
                                            <li>Fecha y horario a coordinar</li>
                                            <li>Mínimo 15 invitados</li>
                                        </ul>
                                    </li>
                                    <li data-aos="fade-up">
                                        <h4>Zonas</h4>
                                        <ul>
                                            <li>Montevideo, Canelones y Maldonado</li>
                                            <li>Traslado sin costo en Montevideo y Ciudad de la Costa</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutV2;