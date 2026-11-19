import BreadCrumb from "../breadCrumb/BreadCrumb";
import FooterV1 from "../footer/FooterV1";
import HeaderV3 from "../header/HeaderV3";
import WhatsAppButton from "../switcher/WhatsAppButton";

interface LayoutProps {
    children?: React.ReactNode;
    breadCrumb?: string;
    title?: string;
}

const LayoutV5 = ({ children, breadCrumb, title }: LayoutProps) => {
    return (
        <>
            <HeaderV3 />
            {breadCrumb && <BreadCrumb breadCrumb={breadCrumb} title={title} />}
            {children}
            <FooterV1 />
            <WhatsAppButton />
        </>
    );
};

export default LayoutV5;