import AboutV2 from "../../components/about/AboutV2";
import CursorEffect from "../../components/animation/CursorEffect";
import BannerV6 from "../../components/banner/BannerV6";
import BlogV1 from "../../components/blog/BlogV1";
import FoodCategoryV1 from "../../components/categories/FoodCategoryV1";
import BodyDark from "../../components/classes/BodyDark";
import FooterV1 from "../../components/footer/FooterV1";
import HeaderV3 from "../../components/header/HeaderV3";
import MenuV2 from "../../components/menu/MenuV2";
import WhatsAppButton from "../../components/switcher/WhatsAppButton";
import TestimonialV1 from "../../components/testimonial/TestimonialV1";
import VideoV1 from "../../components/videos/VideoV1";
import WhyChooseV1 from "../../components/whyChoose/WhyChooseV1";


const Home3DarkPage = () => {
    return (
        <>
            <HeaderV3 />
            <BannerV6 />
            <MenuV2 sectionClass="bg-dark" isDark={true} />
            <AboutV2 />
            <FoodCategoryV1 />
            <WhyChooseV1 />
            <VideoV1 />
            <TestimonialV1 sectionClass="bg-gray bg-cover bg-shape-4" />
            <BlogV1 />
            <FooterV1 />
            <CursorEffect />
            <BodyDark />
            <WhatsAppButton />
        </>
    );
};

export default Home3DarkPage;