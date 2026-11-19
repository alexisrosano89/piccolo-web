export interface MenuDetailBlock {
    key: string;
    title: string;
    text: string;
    note?: string;
}

export const menuDetailBlocks: MenuDetailBlock[] = [
    {
        key: "pizza",
        title: "Pizzas y Calzones",
        text: "Mozzarella / 4 quesos / Cebolla asada y miel / Longaniza y Tabasco / Pesto de albahaca y nuez / Tomates cherry, albahaca y queso de cabra / Roquefort y bondiola / Panceta salteada y salsa barbacoa / Mortadela, queso parmesano y rúcula.",
        note: "Contamos con pizzas para celíacos.",
    },
    {
        key: "chivito",
        title: "Chivitos",
        text: "Pan catalán, carne de lomo, mix verdes, tomates secos, cebolla, mozzarella, mortadela, panceta, huevo frito, alioli de remolacha.",
        note: "Contamos con chivitos vegetarianos.",
    },
    {
        key: "asado",
        title: "Asado",
        text: "Picada de asado: chorizos, bondiola de cerdo, colita de cuadril, pan casero, salsa criolla, salsa chimichurri, y mayonesa. Asado completo: molleja, chorizos, provolone, morrón, papas y boniatos, colita de cuadril, entraña, matambrito de cerdo, pulpón de vacío, pan casero, salsa criolla, salsa chimichurri, y mayonesa.",
    },
    {
        key: "papas",
        title: "Papas y Boniatos",
        text: "Papas y boniatos caseros en cuña.",
    },
    {
        key: "taco",
        title: "Tacos y Quesadillas",
        text: "Tacos de carne / pollo / cerdo / champignon (a elección). Quesadillas Piccolo (queso, tomate, chorizos y cebolla).",
        note: "Sin picante, ofrecemos salsa Tabasco aparte.",
    },
    {
        key: "gramajo",
        title: "Gramajo",
        text: "Papas y boniatos, cebolla, panceta, jamón, mozzarella, perejil y huevo.",
    },
];

export const getMenuDetailsForTags = (tags: string[] = []): MenuDetailBlock[] => {
    const haystack = tags.join(" ").toLowerCase();
    return menuDetailBlocks.filter(block => haystack.includes(block.key));
};
