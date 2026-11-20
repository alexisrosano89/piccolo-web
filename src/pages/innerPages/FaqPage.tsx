import Seo from "../../components/seo/Seo";
import LayoutV5 from "../../components/layouts/LayoutV5";
import FaqSection from "../../components/cotizar/FaqSection";

const FaqPage = () => {
    return (
        <>
            <Seo
                title="Preguntas Frecuentes"
                description="Cómo reservar la fecha, mínimo de invitados, descuentos por cantidad, formas de pago, cancelación, qué incluye el servicio y zonas donde trabajamos."
                path="/preguntas-frecuentes"
            />
            <LayoutV5 title="Preguntas Frecuentes" breadCrumb="Preguntas frecuentes">
                <FaqSection hasTitle={false} />
            </LayoutV5>
        </>
    );
};

export default FaqPage;
