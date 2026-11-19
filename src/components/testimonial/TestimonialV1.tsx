import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Autoplay, Pagination, Navigation } from 'swiper/modules';
import food1 from "/assets/img/food/1.jpg"
import food6 from "/assets/img/food/6.jpg"

interface DataType {
    sectionClass?: string
}

const TestimonialV1 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`testimonial-style-one-area default-padding text-center ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <Swiper
                                direction={"horizontal"}
                                loop={true}
                                autoplay={false}
                                pagination={{
                                    el: '.swiper-pagination',
                                    type: 'bullets',
                                    clickable: true,
                                }}
                                navigation={{
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev"
                                }}
                                className="testimonial-style-one-carousel"
                                modules={[Keyboard, Autoplay, Pagination, Navigation]}
                            >
                                <div className="swiper-wrapper">

                                    {/* Single item */}
                                    <SwiperSlide className="swiper-slide">
                                        <div className="testimonial-style-one">
                                            <div className="item">
                                                <div className="content">
                                                    <div className="provider">
                                                        <h4>Masa de fermentación lenta</h4>
                                                    </div>
                                                    <p>
                                                        Dejamos reposar la masa de nuestras pizzas y calzones durante horas antes de hornearla a la leña. Así logramos una masa liviana, aireada y con bordes crocantes, que se nota desde el primer bocado.
                                                    </p>
                                                    <div className="tm-proivder-thumb">
                                                        <img src={food1} alt="Image Not Found" />
                                                                                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                    {/* Single item */}
                                    <SwiperSlide className="swiper-slide">
                                        <div className="testimonial-style-one">
                                            <div className="item">
                                                <div className="content">
                                                    <div className="provider">
                                                        <h4>Para todos tus invitados</h4>
                                                    </div>
                                                    <p>
                                                        Contamos con pizzas para celíacos y chivitos vegetarianos, para que nadie se quede afuera. Avisanos al cotizar y lo sumamos a tu presupuesto.
                                                    </p>
                                                    <div className="tm-proivder-thumb">
                                                        <img src={food6} alt="Image Not Found" />
                                                                                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                </div>
                            </Swiper>

                            {/* Navigation */}
                            <div className="testimonial-pagination">
                                <div className="swiper-pagination" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TestimonialV1;