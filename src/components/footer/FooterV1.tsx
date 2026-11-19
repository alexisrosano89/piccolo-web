import { Link } from "react-router-dom";
import logoLight from "/assets/img/logo-piccolo-blanco.png"
import FooterNewsletter from "./FooterNewsletter";

const FooterV1 = () => {
    return (
        <>
            <footer className="bg-dark footer-style-one text-light">
                <div className="container">
                    <div className="row">

                        {/* Single Item */}
                        <div className="col-lg-3 col-md-6 footer-item mt-50">
                            <div className="f-item about">
                                <img src={logoLight} alt="Piccolo Cocina Artesanal" />
                                <p>
                                    Cocina artesanal a la leña para tus eventos: pizzas, chivitos, asado y mucho más.
                                </p>
                                <ul className="opening-list">
                                    <li>
                                        Jueves a Domingo <span className="text-end">19:30 - 23:30</span>
                                    </li>
                                    <li>
                                        Take Away <span className="text-end">10% descuento</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Single Item */}
                        <div className="col-lg-2 col-md-6 mt-50 footer-item pl-50 pl-md-15 pl-xs-15">
                            <div className="f-item link">
                                <h4 className="widget-title">Explorá</h4>
                                <ul>
                                    <li>
                                        <Link to="/">Inicio</Link>
                                    </li>
                                    <li>
                                        <Link to="/cotizar">Cotizar</Link>
                                    </li>
                                    <li>
                                        <Link to="/eventos">Eventos</Link>
                                    </li>
                                    <li>
                                        <Link to="/delivery">Delivery</Link>
                                    </li>
                                    <li>
                                        <Link to="/nosotros">Nosotros</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Single Item */}
                        <div className="col-lg-3 col-md-6 footer-item  mt-50">
                            <div className="f-item contact">
                                <h4 className="widget-title">Contacto</h4>
                                <ul className="contact-widget">
                                    <li>
                                        <div className="icon">
                                            <i className="fas fa-map-marker-alt" />
                                        </div>
                                        <div className="content">
                                            Cielo Azul 5611 esquina Rambla, Shangrilá, La Costa
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="fab fa-whatsapp" />
                                        </div>
                                        <div className="content">
                                            Eventos: <a href="tel:+59898314477">098 314 477</a> <br /> Delivery: <a href="tel:+59894610637">094 610 637</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="fas fa-envelope" />
                                        </div>
                                        <div className="content">
                                            <a href="mailto:info@piccolo.com.uy">info@piccolo.com.uy</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Single Item */}
                        <div className="col-lg-4 col-md-6 footer-item mt-50">
                            <div className="f-item newsletter">
                                <h4 className="widget-title">Enterate de Nuestras Novedades</h4>
                                <p>
                                    Sumate a nuestra lista para enterarte de promos y novedades de Piccolo.
                                </p>
                                <FooterNewsletter />
                                <div className="footer-socila-items mt-30">
                                    <h4>Seguinos: </h4>
                                    <ul className="footer-social">
                                        <li>
                                            <Link to="https://facebook.com/piccolococinartesanal" target="_blank">
                                                <i className="fab fa-facebook-f" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="https://instagram.com/piccolococina" target="_blank">
                                                <i className="fab fa-instagram" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <div className="row align-center">
                            <div className="col-lg-6">
                                <p>
                                    &copy; Copyright {(new Date().getFullYear())} Piccolo Cocina Artesanal. Todos los derechos reservados.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterV1;
