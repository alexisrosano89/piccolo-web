import Seo from "../../components/seo/Seo";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import LayoutV5 from "../../components/layouts/LayoutV5";
import NotFoundContent from "../../components/NotFound/NotFoundContent";

const NotFoundPage = () => {
    return (
        <>

            <Seo title="Página no encontrada" description="La página que buscás no existe." noindex />
            <LayoutV5>
                <BreadCrumb title="Página no encontrada" breadCrumb="Error 404" />
                <NotFoundContent />
            </LayoutV5>
        </>
    );
};

export default NotFoundPage;