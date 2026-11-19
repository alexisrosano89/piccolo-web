import FoodMenuData from "../../assets/jsonData/menu/FoodMenuData.json";
import SingleIsotopeContent from "./SingleIsotopeContent";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "react-paginate";
import { MIN_PERSONAS_SENA } from "../../utils/presupuesto";

interface MenuIsotopeProps {
    hasTitle?: boolean;
    sectionClass?: string;
}

const ITEMS_PER_PAGE = 8;
const VALID_FILTERS = ['pizzas', 'chivitos', 'asado', 'complementos'];

const MenuIsotope: React.FC<MenuIsotopeProps> = ({ hasTitle, sectionClass }) => {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('categoria');
    const initialFilter = categoryParam && VALID_FILTERS.includes(categoryParam) ? categoryParam : '*';

    const [activeFilter, setActiveFilter] = useState<string>(initialFilter);
    const [currentPage, setCurrentPage] = useState(1);

    // Si se elige otra categoría desde el menú estando ya en /cotizar, actualizamos el filtro.
    useEffect(() => {
        setActiveFilter(initialFilter);
        setCurrentPage(1);
    }, [initialFilter]);

    const filteredData = activeFilter === '*'
        ? FoodMenuData
        : FoodMenuData.filter(food => food.category.includes(activeFilter));

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleFilterChange = (filterValue: string) => {
        setActiveFilter(filterValue);
        setCurrentPage(1);
    };

    const handlePageClick = (data: { selected: number }) => {
        setCurrentPage(data.selected + 1);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 200);
    };

    return (
        <>
            <div className={`food-menu-area inc-isotop default-padding ${sectionClass}`}>
                {hasTitle &&
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <div className="site-heading text-center">
                                    <h4 className="sub-title">Nuestro Menú</h4>
                                    <h2 className="title">Elegí tus Platos</h2>
                                    <p>
                                        Agregá los platos que quieras al presupuesto y vas a poder ver el costo final de tu pedido. Cada menú principal tiene un mínimo de {MIN_PERSONAS_SENA} personas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="container">
                    <div className="food-menu-area">
                        <div className="row">
                            <div className="col-md-12 food-menu-content text-center">
                                <div className="mix-item-menu">
                                    <button className={activeFilter === '*' ? 'active' : ''} onClick={() => handleFilterChange('*')}>Todos</button>
                                    <button className={activeFilter === 'pizzas' ? 'active' : ''} onClick={() => handleFilterChange('pizzas')}>Pizzas</button>
                                    <button className={activeFilter === 'chivitos' ? 'active' : ''} onClick={() => handleFilterChange('chivitos')}>Chivitos</button>
                                    <button className={activeFilter === 'asado' ? 'active' : ''} onClick={() => handleFilterChange('asado')}>Asado</button>
                                    <button className={activeFilter === 'complementos' ? 'active' : ''} onClick={() => handleFilterChange('complementos')}>Complementos</button>
                                </div>

                                <div className="masonary">
                                    <div id="portfolio-grid" className="food-menu-lists colums-3">
                                        {pageData.map(food => (
                                            <div className="food-menu-style-one pf-item" key={food.id}>
                                                <SingleIsotopeContent food={food} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {totalPages > 1 &&
                                    <nav className="woocommerce-pagination mt-60">
                                        <Pagination
                                            previousLabel={<i className="fas fa-angle-double-left"></i>}
                                            nextLabel={<i className="fas fa-angle-double-right"></i>}
                                            breakLabel={'...'}
                                            pageCount={totalPages}
                                            forcePage={currentPage - 1}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={handlePageClick}
                                            containerClassName={'pagination text-center'}
                                            activeClassName={'active'}
                                            pageClassName={'page-item'}
                                            pageLinkClassName={'page-link'}
                                            previousLinkClassName={'page-link'}
                                            nextLinkClassName={'page-link'}
                                        />
                                    </nav>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MenuIsotope;
