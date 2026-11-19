import CheckoutContent from "../../components/cart/CheckoutContent";
import LayoutV5 from "../../components/layouts/LayoutV5";

const CheckoutPage = () => {
    return (
        <>
            <LayoutV5 title="Reservá tu Fecha" breadCrumb="Seña">
                <CheckoutContent />
            </LayoutV5>
        </>
    );
};

export default CheckoutPage;