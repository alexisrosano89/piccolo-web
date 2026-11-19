import Seo from "../../components/seo/Seo";
import LayoutV5 from "../../components/layouts/LayoutV5";
import GalleryV2 from "../../components/gallery/GalleryV2";

const EventosPage = () => {
    return (
        <>
            <Seo
                title="Eventos"
                description="Así viven nuestros eventos: cocina a la leña en el lugar, personal para servir y buena energía. Mirá fotos y videos de Piccolo Cocina Artesanal."
                path="/eventos"
            />
            <LayoutV5 title="Eventos" breadCrumb="Eventos">
                <GalleryV2 />
            </LayoutV5>
        </>
    );
};

export default EventosPage;
