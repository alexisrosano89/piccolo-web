import AboutV1 from "../../components/about/AboutV1";
import BrandV1 from "../../components/brand/BrandV1";
import FactV1 from "../../components/fact/FactV1";
import LayoutV5 from "../../components/layouts/LayoutV5";

const AboutUsPage = () => {
    return (
        <>
            <LayoutV5 breadCrumb="Nosotros" title="Nosotros">
                <AboutV1 />
                <BrandV1 />
                <FactV1 />
            </LayoutV5>
        </>
    );
};

export default AboutUsPage;