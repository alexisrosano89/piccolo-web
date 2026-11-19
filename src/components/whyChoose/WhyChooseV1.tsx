"use client"
import shape24 from "/assets/img/shape/24.png"
import icon12 from "/assets/img/icon/12.png"
import thumb4 from "/assets/img/thumb/piccolo-parrilla.webp"
import { Link } from "react-router-dom";
import CountUp from "react-countup";

const WhyChooseV1 = () => {
    return (
        <>
            <div className="choose-us-style-one-area default-padding-bottom bg-gray">
                <div className="container">
                    <div className="choose-us-style-one-items">
                        <div className="row align-center">
                            <div className="col-xl-6 choose-us-style-one-info">
                                <h2 className="title split-text">Vos disfrutá, nosotros cocinamos</h2>
                                <p className="split-text">
                                    Llegamos unas 2 horas antes para preparar todo, cocinamos en el lugar y servimos durante 2 a 3 horas. Traemos el personal y todos los materiales de cocina, y dejamos el espacio tal cual lo recibimos.
                                </p>
                                <ul className="list-style-one">
                                    <li>Cocina artesanal a la leña</li>
                                    <li>Personal para servir incluido</li>
                                    <li>Opciones para celíacos y vegetarianos</li>
                                </ul>
                                <Link className="btn btn-theme btn-md animation mt-30" to="/cotizar">Cotizá tu evento</Link>
                            </div>
                            <div className="col-xl-6 text-light choose-us-style-one-content">
                                <div className="choose-us-style-one-item bg-cover bg-theme" style={{ backgroundImage: 'url(/assets/img/shape/7.jpg)' }}>
                                    <div className="fun-fact-style-one text-center">
                                        <div className="icon">
                                            <img src={icon12} alt="Image Not Found" />
                                        </div>
                                        <div className="counter">
                                            <div className="timer"> <CountUp end={500} /> </div>
                                            <div className="operator">+</div>
                                        </div>
                                        <span className="medium">Eventos realizados</span>
                                    </div>
                                </div>
                                <div className="choose-us-style-one-item">
                                    <div className="thumb">
                                        <img src={thumb4} alt="Cocinero de Piccolo junto a la parrilla a leña" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="shape">
                            <img src={shape24} alt="Image Not Found" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WhyChooseV1;