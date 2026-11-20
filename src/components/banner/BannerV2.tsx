import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useRef } from "react";
import logoBlanco from "/assets/img/logo-piccolo-blanco.png";

const BannerV2 = () => {

    const bannerRef = useRef<HTMLDivElement>(null);

    const scrollToContent = () => {
        const banner = bannerRef.current;
        if (!banner) return;
        const navHeight = document.querySelector<HTMLElement>("header nav")?.offsetHeight ?? 0;
        const target = banner.getBoundingClientRect().bottom + window.scrollY - navHeight;
        window.scrollTo({ top: target, behavior: "smooth" });
    };

    return (
        <>
            <div ref={bannerRef} className="banner-area banner-style-one navigation-circle overflow-hidden text-light">
                <Swiper
                    direction={"horizontal"}
                    loop={false} // un solo slide (se quitó el de delivery)
                    speed={1200}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    effect={"fade"}
                    fadeEffect={{
                        crossFade: true
                    }}
                    pagination={{
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true,
                    }}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    }}
                    className="banner-fade"
                    modules={[Keyboard, Autoplay, Pagination, Navigation, EffectFade]}
                >
                    <div className="swiper-wrapper">

                        {/* Single Item */}
                        <SwiperSlide className="bg-cover shadow dark" style={{ backgroundImage: 'url(/assets/img/banner/eventos.png)' }}>
                            <div className="banner-bg-blur" />
                            <div className="container">
                                <div className="content">
                                    <div className="row align-center">
                                        <div className="col-xl-7 col-lg-9">
                                            <h2 className="banner-logo-title">
                                                <img src={logoBlanco} alt="Piccolo Cocina Artesanal" className="banner-logo" />
                                            </h2>
                                            <p>
                                                Llevate los aplausos en tu evento con nuestra rica cocina y buena energía. Cambiamos tu estrés por relax. Ya no tenés que estar en todo para relajarte.
                                            </p>
                                            <div className="button mt-40">
                                                <Link className="btn btn-theme btn-md animation" to="/cotizar">Cotizar <i className="fas fa-calculator" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </div>
                </Swiper>

                {/* Indicador de scroll */}
                <button type="button" className="banner-scroll-down" onClick={scrollToContent} aria-label="Bajar para ver más">
                    <span className="banner-scroll-mouse"><span className="banner-scroll-wheel" /></span>
                    <i className="fas fa-chevron-down banner-scroll-arrow" />
                </button>
            </div>
        </>
    );
};

export default BannerV2;
