import Seo from "../../components/seo/Seo";
import CartPageContent from "../../components/cart/CartPageContent";
import LayoutV5 from "../../components/layouts/LayoutV5";

const CartPage = () => {
    return (
        <>

            <Seo title="Tu Presupuesto" description="Revisá los menús de tu presupuesto antes de reservar la fecha." path="/presupuesto" noindex />
            <LayoutV5 title="Tu Presupuesto" breadCrumb="Presupuesto">
                <CartPageContent />
            </LayoutV5>
        </>
    );
};

export default CartPage;