import LayoutV5 from "../../components/layouts/LayoutV5";
import MenuIsotope from "../../components/menu/MenuIsotope";
import TablasSection from "../../components/cotizar/TablasSection";
import PaymentPolicy from "../../components/cotizar/PaymentPolicy";
import IncludesSection from "../../components/cotizar/IncludesSection";

const FoodMenuPage = () => {
    return (
        <>
            <LayoutV5 title="Cotizá tu Evento" breadCrumb="Cotizar">
                <MenuIsotope sectionClass="bg-gray" hasTitle={true} />
                <TablasSection sectionClass="bg-gray" />
                <PaymentPolicy sectionClass="bg-gray" />
                <IncludesSection />
            </LayoutV5>
        </>
    );
};

export default FoodMenuPage;