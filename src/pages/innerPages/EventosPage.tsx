import LayoutV5 from "../../components/layouts/LayoutV5";
import GalleryV2 from "../../components/gallery/GalleryV2";
import BrandV1 from "../../components/brand/BrandV1";
import FeatureV1 from "../../components/feature/FeatureV1";

const EventosPage = () => {
    return (
        <>
            <LayoutV5 title="Eventos" breadCrumb="Eventos">
                <GalleryV2 />
                <BrandV1 />
                <FeatureV1 sectionClass="default-padding-bottom" />
            </LayoutV5>
        </>
    );
};

export default EventosPage;
