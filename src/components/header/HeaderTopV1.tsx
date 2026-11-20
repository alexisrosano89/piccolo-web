import icon10 from "/assets/img/icon/10.png";
import icon11 from "/assets/img/icon/11.png";
import { Link } from "react-router-dom";

interface DataType {
    sectionClass?: string;
}

const HeaderTopV1 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`top-bar-area top-bar-style-one bg-theme text-light ${sectionClass}`}>
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-7">
                            <ul className="item-flex">
                                <li>
                                    <a href="tel:+59898314477">
                                        <img src={icon10} alt="Icon" /> EVENTOS: 098 314 477
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:info@piccolo.com.uy">
                                        <img src={icon11} alt="Icon" /> INFO@PICCOLO.COM.UY
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-5 text-end">
                            <div className="item-flex">
                                <div className="social">
                                    <ul>
                                        <li className="facebook">
                                            <Link to="https://facebook.com/piccolococinartesanal" target="_blank"><i className="fab fa-facebook-f"></i></Link>
                                        </li>
                                        <li className="instagram">
                                            <Link to="https://instagram.com/piccolococina" target="_blank"><i className="fab fa-instagram"></i></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderTopV1;