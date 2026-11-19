import { toastAgregado } from "../cart/toastAgregado";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import QtyStepper from "../select/QtyStepper";
import { cantidadMinima } from "../../utils/presupuesto";
import { addToCart } from "../../store/slices/cartSlice";
import { getMenuDetailsForTags } from "../../assets/jsonData/menu/MenuDetailData";
import RelatedComplements from "./RelatedComplements";

interface DataType {
    id?: number;
    thumb?: string;
    title?: string;
    text?: string;
    tags?: string[];
    price?: number;
    category?: string[];
    description?: string[];
}

const MENU_CART_ID_OFFSET = 9000;

const categoryLabels: Record<string, string> = {
    pizzas: "Pizzas",
    chivitos: "Chivitos",
    asado: "Asado",
    complementos: "Complementos",
};

const serviceNotes = [
    "Precio por persona, con un mínimo de 15 invitados.",
    "Incluye personal para servir y todos los materiales de cocina.",
    "Llegamos unas 2 horas antes para preparar y servimos durante 2 a 3 horas.",
    "Alquiler de horno y parrillero con costo extra.",
    "Traslado sin costo dentro de Montevideo y Ciudad de la Costa.",
    "Reservás la fecha con una seña de $2000.",
];

const FoodSingleContent = ({ food }: { food: DataType }) => {
    const { id, thumb, title, text, tags, price, category, description } = food;
    const isComplement = category?.includes("complementos");

    const dispatch = useDispatch();
    // Menús principales arrancan (y no bajan) de 15 personas; complementos, de 1.
    const minimo = cantidadMinima({ id: MENU_CART_ID_OFFSET + (id ?? 0) });
    const [quantity, setQuantity] = useState(minimo);

    // Al pasar de un menú a otro (misma página, otra URL) volvemos al mínimo del nuevo menú.
    useEffect(() => {
        setQuantity(minimo);
    }, [id, minimo]);

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: MENU_CART_ID_OFFSET + id!,
                title: title!,
                price: price!,
                thumb: `menu/${thumb}`,
                quantity,
            })
        );
        toastAgregado(MENU_CART_ID_OFFSET + id!);
    };

    const detailBlocks = getMenuDetailsForTags(tags);

    return (
        <>
            <div className="validtheme-shop-single-area default-padding">
                <div className="container">
                    <div className="product-details">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="product-thumb">
                                    <div className="item-box">
                                        <div className="product-item">
                                            <img src={`/assets/img/menu/${thumb}`} alt={title} width={600} height={600} style={{ borderRadius: "50%" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="single-product-contents">
                                    <div className="summary-top-box">
                                        <div className="product-tags">
                                            {tags && tags.map((tag, index) =>
                                                <Link key={index} to="#">
                                                    {tag}
                                                    {index < tags.length - 1 && ','}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                    <h2 className="product-title">{title}</h2>
                                    <div className="price">
                                        <span>${price?.toFixed(0)}</span> <small>precio por persona</small>
                                    </div>
                                    <p>{text}</p>
                                    <div className="product-purchase-list">
                                        <QtyStepper value={quantity} onChange={setQuantity} min={minimo} />
                                        <Link to="#" className="btn secondary btn-theme btn-sm animation" onClick={handleAddToCart}>
                                            <i className="fas fa-shopping-cart" />
                                            Agregar al presupuesto
                                        </Link>
                                    </div>
                                    <div className="product-estimate-delivary">
                                        <i className="fas fa-utensils" />
                                        <strong>Evento a coordinar</strong>
                                        <span>Confirmá disponibilidad y fecha por WhatsApp.</span>
                                    </div>
                                    <div className="product-meta">
                                        <span className="posted-in">
                                            <strong>Categoría:</strong>
                                            {category?.map((cat, index) => (
                                                <Link key={index} to="/cotizar">
                                                    {categoryLabels[cat] || cat}
                                                    {index < category.length - 1 && ','}
                                                </Link>
                                            ))}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="single-product-bottom-info">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button className="nav-link active" id="description-tab-control" data-bs-toggle="tab" data-bs-target="#description-tab" type="button" role="tab" aria-controls="description-tab" aria-selected="true">
                                        Descripción
                                    </button>
                                    {detailBlocks.length > 0 &&
                                        <button className="nav-link" id="information-tab-control" data-bs-toggle="tab" data-bs-target="#information-tab" type="button" role="tab" aria-controls="information-tab" aria-selected="false">
                                            Qué Incluye
                                        </button>
                                    }
                                </div>

                                <div className="tab-content tab-content-info" id="myTabContent">
                                    <div className="tab-pane fade show active" id="description-tab" role="tabpanel" aria-labelledby="description-tab-control">
                                        {description && description.length > 0
                                            ? description.map((paragraph, index) => <p key={index}>{paragraph}</p>)
                                            : <p>{text}</p>
                                        }
                                        {!isComplement &&
                                            <>
                                                <h4 className="mt-30">Para tener en cuenta</h4>
                                                <ul className="list-style-one">
                                                    {serviceNotes.map((note, index) => <li key={index}>{note}</li>)}
                                                </ul>
                                            </>
                                        }
                                        {isComplement &&
                                            <p><strong>Se suma a cualquiera de nuestros menús para eventos.</strong></p>
                                        }
                                    </div>

                                    {detailBlocks.length > 0 &&
                                        <div className="tab-pane fade" id="information-tab" role="tabpanel" aria-labelledby="information-tab-control">
                                            <div className="row">
                                                {detailBlocks.map((block, index) => (
                                                    <div className="col-lg-6 mb-30" key={index}>
                                                        <div className="menu-description-item">
                                                            <h4>{block.title}</h4>
                                                            <p>{block.text}</p>
                                                            {block.note && <p className="menu-description-note">*{block.note}</p>}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <RelatedComplements />
                </div>
            </div>
        </>
    );
};

export default FoodSingleContent;
