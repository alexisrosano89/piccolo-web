import { Link } from "react-router-dom";
import FoodMenuData from "../../assets/jsonData/menu/FoodMenuData.json";
import { slugify } from "../../assets/jsonData/menu/slugify";

interface DataType {
    navbarPlacement?: string;
    // eslint-disable-next-line no-unused-vars
    toggleSubMenu?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    onNavigate?: () => void;
}

const menuCategories = [
    { key: "pizzas", label: "Pizzas" },
    { key: "chivitos", label: "Chivitos" },
    { key: "asado", label: "Asado" },
    { key: "complementos", label: "Complementos" },
].map(category => ({
    ...category,
    items: FoodMenuData.filter(food => food.category.includes(category.key)),
}));

// En escritorio los submenús se abren al pasar el mouse y el link navega normalmente.
// En celular (menú lateral) el primer toque despliega el submenú.
const isMobileMenu = () => window.matchMedia("(max-width: 1023px)").matches;

const MainMenu: React.FC<DataType> = ({ navbarPlacement, toggleSubMenu, onNavigate }) => {

    const handleToggle = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (isMobileMenu() && toggleSubMenu) {
            toggleSubMenu(event);
        }
    };

    return (
        <>
            <ul className={`nav navbar-nav ${navbarPlacement}`}>
                <li>
                    <Link to="/" className="active">Inicio</Link>
                </li>
                <li>
                    <Link to="/cotizar">Cotizar</Link>
                </li>
                <li className="dropdown cotizar-menu">
                    <Link to="/cotizar" className="dropdown-toggle" onClick={handleToggle}>Menús</Link>
                    <ul className="dropdown-menu">
                        <li className="menu-see-all">
                            <a href="/assets/menu/presupuesto-piccolo.pdf" download="Presupuesto Piccolo - Noviembre 2026.pdf" target="_blank" rel="noreferrer" onClick={onNavigate}>
                                <i className="fas fa-download" /> Descargar Menú
                            </a>
                        </li>
                        {menuCategories.map(category => (
                            <li className={category.items.length > 1 ? "dropdown" : ""} key={category.key}>
                                {category.items.length > 1 ? (
                                    <>
                                        <Link to={`/cotizar?categoria=${category.key}`} className="dropdown-toggle" onClick={handleToggle}>
                                            {category.label}
                                        </Link>
                                        <ul className="dropdown-menu">
                                            {category.items.map(food => (
                                                <li key={food.id}>
                                                    <Link to={`/cotizar/${slugify(food.title)}`} onClick={onNavigate}>{food.title}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <Link
                                        to={category.items[0] ? `/cotizar/${slugify(category.items[0].title)}` : `/cotizar?categoria=${category.key}`}
                                        onClick={onNavigate}
                                    >
                                        {category.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </li>
                <li>
                    <Link to="/eventos">Eventos</Link>
                </li>
                <li>
                    <Link to="/nosotros">Nosotros</Link>
                </li>
                <li>
                    <Link to="/preguntas-frecuentes" title="Preguntas frecuentes">FAQ</Link>
                </li>
            </ul>
        </>
    );
};

export default MainMenu;
