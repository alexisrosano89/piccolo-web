import LayoutV5 from "../../components/layouts/LayoutV5";
import FoodSingleContent from "../../components/menu/FoodSingleContent";
import FoodMenuData from "../../assets/jsonData/menu/FoodMenuData.json";
import { slugify } from "../../assets/jsonData/menu/slugify";
import { useParams } from "react-router-dom";

const FoodSinglePage = () => {

    const { slug } = useParams();
    const data = FoodMenuData.find(food => slugify(food.title) === slug);

    return (
        <>
            <LayoutV5 title={data?.title || "Plato no encontrado"} breadCrumb="Cotizar">
                {data && <FoodSingleContent food={data} />}
                {!data && <div className="default-padding text-center">No encontramos este plato.</div>}
            </LayoutV5>
        </>
    );
};

export default FoodSinglePage;
