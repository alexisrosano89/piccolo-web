import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";

const FoodCategoryV1 = () => {
    return (
        <>
            <div className="food-cat-area default-padding bg-gray" style={{ backgroundImage: 'url(/assets/img/shape/3.png)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">Nuestros Menús</h4>
                                <h2 className="title">Elegí qué servir en tu evento</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <Swiper className="food-cat-carousel text-light"
                                loop={true}
                                slidesPerView={1}
                                spaceBetween={30}
                                autoplay={true}
                                breakpoints={{
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 30,
                                    },
                                    992: {
                                        slidesPerView: 3,
                                        spaceBetween: 30,
                                    }
                                }}
                                modules={[Keyboard, Autoplay]}
                            >

                                <div className="swiper-wrapper">

                                    {/* Single Item */}
                                    <SwiperSlide className="swiper-slide">
                                        <div className="food-cat-item">
                                            <Link to="/cotizar" style={{ backgroundImage: 'url(/assets/img/category/1.jpg)' }}>
                                                <h4>Pizzas</h4>
                                                <span>5 opciones</span>
                                            </Link>
                                        </div>
                                    </SwiperSlide>

                                    {/* Single Item */}
                                    <SwiperSlide className="swiper-slide">
                                        <div className="food-cat-item">
                                            <Link to="/cotizar" style={{ backgroundImage: 'url(/assets/img/category/2.jpg)' }}>
                                                <h4>Chivitos</h4>
                                                <span>3 opciones</span>
                                            </Link>
                                        </div>
                                    </SwiperSlide>

                                    {/* Single Item */}
                                    <SwiperSlide className="swiper-slide">
                                        <div className="food-cat-item">
                                            <Link to="/cotizar" style={{ backgroundImage: 'url(/assets/img/category/3.jpg)' }}>
                                                <h4>Asado</h4>
                                                <span>2 opciones</span>
                                            </Link>
                                        </div>
                                    </SwiperSlide>

                                    {/* Single Item */}
                                    <SwiperSlide className="swiper-slide">
                                        <div className="food-cat-item">
                                            <Link to="/cotizar" style={{ backgroundImage: 'url(/assets/img/category/4.jpg)' }}>
                                                <h4>Complementos</h4>
                                                <span>8 opciones</span>
                                            </Link>
                                        </div>
                                    </SwiperSlide>

                                </div>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FoodCategoryV1;