import { Link } from "react-router-dom";

interface DataType {
    breadCrumb?: string;
    title?: string;
}

const BreadCrumb = ({ breadCrumb, title }: DataType) => {
    return (
        <>
            <div className="breadcrumb-area bg-cover text-center text-light" style={{ backgroundImage: 'url(/assets/img/banner/cabecera-pizza.webp)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h1>{title ? title : "Página no encontrada"}</h1>
                            <ul className="breadcrumb">
                                <li><Link to="/"><i className="fas fa-home" /> Inicio</Link></li>
                                <li>{breadCrumb ? breadCrumb : "Error 404"}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BreadCrumb;