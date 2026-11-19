import icon6 from "/assets/img/icon/6.png"
import icon7 from "/assets/img/icon/7.png"
import icon8 from "/assets/img/icon/8.png"
import icon9 from "/assets/img/icon/9.png"

interface DataType {
    sectionClass?: string
}

const FeatureV1 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`feature-style-one-area default-padding-top overflow-hidden ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">

                        {/* Single Item */}
                        <div className="col-lg-3 col-md-6 feature-one-single">
                            <div className="feature-style-one-item" data-aos="fade-up" data-aos-delay="200">
                                <img src={icon6} alt="" />
                                <h4>Cocina a la Leña</h4>
                                <p>
                                    Pizzas, calzones y asado preparados a la leña, en el momento y en el lugar de tu evento.
                                </p>
                            </div>
                        </div>

                        {/* Single Item */}
                        <div className="col-lg-3 col-md-6 feature-one-single">
                            <div className="feature-style-one-item" data-aos="fade-down" data-aos-delay="200">
                                <img src={icon7} alt="" />
                                <h4>Personal Incluido</h4>
                                <p>
                                    Nuestro equipo prepara y sirve los menús durante 2 a 3 horas para que vos disfrutes.
                                </p>
                            </div>
                        </div>

                        {/* Single Item */}
                        <div className="col-lg-3 col-md-6 feature-one-single">
                            <div className="feature-style-one-item" data-aos="fade-up" data-aos-delay="200">
                                <img src={icon8} alt="" />
                                <h4>Traslado sin Costo</h4>
                                <p>
                                    Sin viático dentro de Montevideo y Ciudad de la Costa. Traemos todos los materiales de cocina.
                                </p>
                            </div>
                        </div>

                        {/* Single Item */}
                        <div className="col-lg-3 col-md-6 feature-one-single">
                            <div className="feature-style-one-item" data-aos="fade-down" data-aos-delay="200">
                                <img src={icon9} alt="" />
                                <h4>Opciones para Todos</h4>
                                <p>
                                    Pizzas para celíacos y chivitos vegetarianos. Contanos qué necesitás y lo armamos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeatureV1;