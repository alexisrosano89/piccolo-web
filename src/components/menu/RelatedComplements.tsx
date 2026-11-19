import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Autoplay } from 'swiper/modules';
import SingleComplementCard from "./SingleComplementCard";
import FoodMenuData from "../../assets/jsonData/menu/FoodMenuData.json";

const complementos = FoodMenuData.filter(food => food.category.includes("complementos"));

const RelatedComplements = () => {
    return (
        <>
            <div className="related-products carousel-shadow">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Complementos</h3>
                        <Swiper
                            loop={true}
                            slidesPerView={1}
                            spaceBetween={30}
                            autoplay={true}
                            breakpoints={{
                                768: {
                                    slidesPerView: 2,
                                },
                                992: {
                                    slidesPerView: 3,
                                },
                                1400: {
                                    slidesPerView: 4,
                                },
                            }}
                            className="vt-products text-center related-product-carousel"
                            modules={[Keyboard, Autoplay]}
                        >
                            <div className="swiper-wrapper">
                                {complementos.map(food =>
                                    <SwiperSlide key={food.id}>
                                        <SingleComplementCard food={food} />
                                    </SwiperSlide>
                                )}
                            </div>
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RelatedComplements;
