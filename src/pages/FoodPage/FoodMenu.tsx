import Seo from "../../components/seo/Seo";
import LayoutV5 from "../../components/layouts/LayoutV5";
import MenuIsotope from "../../components/menu/MenuIsotope";
import TablasSection from "../../components/cotizar/TablasSection";
import PaymentPolicy from "../../components/cotizar/PaymentPolicy";
import IncludesSection from "../../components/cotizar/IncludesSection";
import FaqSection from "../../components/cotizar/FaqSection";

const FoodMenuPage = () => {
    return (
        <>

            <Seo
                title="Cotizá tu Evento: Menús y Precios"
                description="Armá el presupuesto de tu evento: pizzas a la leña, calzones, chivitos, asado completo, tablas y complementos, con precio por persona. Mínimo 15 invitados."
                path="/cotizar"
            />
            <LayoutV5 title="Cotizá tu Evento" breadCrumb="Cotizar">
                <MenuIsotope sectionClass="bg-gray" hasTitle={true} />
                <TablasSection sectionClass="bg-gray" />
                <PaymentPolicy sectionClass="bg-gray" />
                <IncludesSection />
                <FaqSection sectionClass="bg-gray" withSchema={false} />
            </LayoutV5>
        </>
    );
};

export default FoodMenuPage;