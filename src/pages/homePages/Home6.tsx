import Seo from "../../components/seo/Seo";
import AboutV2 from "../../components/about/AboutV2";
import BannerV2 from "../../components/banner/BannerV2";
import FoodCategoryV1 from "../../components/categories/FoodCategoryV1";
import FooterV1 from "../../components/footer/FooterV1";
import HeaderV3 from "../../components/header/HeaderV3";
import WhatsAppButton from "../../components/switcher/WhatsAppButton";
import TestimonialV3 from "../../components/testimonial/TestimonialV3";
import VideoV1 from "../../components/videos/VideoV1";
import WhyChooseV1 from "../../components/whyChoose/WhyChooseV1";

const Home6Page = () => {
    return (
        <>
            <Seo
                description="Catering artesanal para eventos en Montevideo, Canelones y Maldonado: pizzas a la leña, chivitos, asado y más, con personal incluido. Pedí tu presupuesto online."
                path="/"
            />
            <HeaderV3 />
            <BannerV2 />
            <AboutV2 />
            <FoodCategoryV1 />
            <WhyChooseV1 />
            <VideoV1 />
            <TestimonialV3 sectionClass="bg-gray bg-cover" />
            <FooterV1 />
            <WhatsAppButton />
        </>
    );
};

export default Home6Page;