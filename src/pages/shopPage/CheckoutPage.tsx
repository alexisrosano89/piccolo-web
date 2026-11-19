import Seo from "../../components/seo/Seo";
import CheckoutContent from "../../components/cart/CheckoutContent";
import LayoutV5 from "../../components/layouts/LayoutV5";

const CheckoutPage = () => {
    return (
        <>

            <Seo title="Reservar Fecha" description="Completá tus datos para reservar la fecha de tu evento." path="/reservar" noindex />
            <LayoutV5 title="Reservá tu Fecha" breadCrumb="Seña">
                <CheckoutContent />
            </LayoutV5>
        </>
    );
};

export default CheckoutPage;