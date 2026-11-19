import about1 from "/assets/img/about/piccolo-amasando.webp"
import SplitText from "../animation/SplitText.jsx"

const AboutV1 = () => {
    return (
        <>
            <div className="about-style-one-area default-padding">
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-6">
                            <div className="thumb-style-one">
                                <img src={about1} alt="Cocinero de Piccolo amasando frente al mural con el logo" data-aos="fade-up" data-aos-delay="100" />
                                <div className="contact-card-one contact-card-whatsapp" data-aos="fade-left" data-aos-delay="200">
                                    <a href="https://wa.me/59898314477" target="_blank" rel="noreferrer" aria-label="Escribinos por WhatsApp para eventos">
                                        <div className="icon">
                                            <i className="fab fa-whatsapp" />
                                        </div>
                                        <div className="info">
                                            <span>EVENTOS</span>
                                            <h4>098 314 477</h4>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 offset-lg-1">
                            <div className="about-style-one-info">
                                <h4 className="sub-heading">Nuestra Historia</h4>
                                <h2 className="title">
                                    <SplitText
                                        delay={10}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                        Cocina artesanal, fuego de leña y buena energía
                                    </SplitText>

                                </h2>
                                <div className="content mt-50">
                                    <p>
                                        <SplitText
                                            delay={5}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                            rootMargin="-50px"
                                        >
                                            Piccolo nació en el 2013, con el deseo de acercar recetas clásicas a los parrilleros de las familias uruguayas. Una cocina sabrosa y casera, sumada a un trato amable y profesional, son los pilares de nuestra empresa.
                                        </SplitText>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default AboutV1;