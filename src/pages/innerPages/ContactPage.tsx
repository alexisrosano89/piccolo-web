import Seo from "../../components/seo/Seo";
import ContactPageContent from "../../components/contact/ContactPageContent";
import ContactV1 from "../../components/contact/ContactV1";
import LayoutV5 from "../../components/layouts/LayoutV5";

const ContactPage = () => {
    return (
        <>

            <Seo
                title="Contacto"
                description="Escribinos para cotizar tu evento o hacer un pedido de delivery. Respondemos por WhatsApp."
                path="/contacto"
            />
            <LayoutV5 title="Contacto" breadCrumb="Contacto">
                <ContactPageContent />
                <ContactV1 />
            </LayoutV5>
        </>
    );
};

export default ContactPage;