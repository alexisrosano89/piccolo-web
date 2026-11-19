import { Link } from "react-router-dom";

const NotFoundContent = () => {
    return (
        <>
            <div className="error-page-area default-padding text-center bg-cover">
                <div className="shape-left" style={{ background: 'url(/assets/img/shape/44-left.png)' }} />
                <div className="shape-right" style={{ background: 'url(/assets/img/shape/44-right.png)' }} />
                <div className="container">
                    <div className="error-box">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <h1>404</h1>
                                <h2>¡Ups! No encontramos esta página</h2>
                                <p>
                                    Puede que el enlace esté roto o que la página se haya movido. Volvé al inicio para seguir recorriendo nuestros menús.
                                </p>
                                <Link className="btn mt-20 btn-md btn-theme" to="/">Volver al inicio</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFoundContent;