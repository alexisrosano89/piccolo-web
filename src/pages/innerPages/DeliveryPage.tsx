import LayoutV5 from "../../components/layouts/LayoutV5";
import ContactPageContent from "../../components/contact/ContactPageContent";
import ProductV1 from "../../components/product/ProductV1";

const DeliveryPage = () => {
    return (
        <>
            <LayoutV5 title="Delivery" breadCrumb="Delivery">
                <ContactPageContent
                    title="Tortillas, Gramajo, Pizzas, Calzones, Papas y Boniatos."
                    text="Hacé tu pedido por WhatsApp y recibilo en tu casa, o retiralo por el local con 10% de descuento. Cocinamos todo en el momento, con masa de fermentación lenta y fuego de leña."
                />
                <ProductV1>
                    <div className="text-center mt-30">
                        <a className="btn btn-theme btn-md animation" href="/assets/menu/menu-piccolo.pdf" download target="_blank" rel="noreferrer">
                            <i className="fas fa-download" /> Descargar Menú
                        </a>
                    </div>
                </ProductV1>
            </LayoutV5>
        </>
    );
};

export default DeliveryPage;
