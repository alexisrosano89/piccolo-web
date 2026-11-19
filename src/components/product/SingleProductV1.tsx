interface DataType {
    id?: number;
    thumb?: string;
    tags: string[];
    name?: string;
    price?: number;
    text?: string;
    delay?: string;
}

const SingleProductV1 = ({ product }: { product: DataType }) => {
    const { thumb, tags, name, price, text, delay } = product

    return (
        <>
            <div className="special-menu-style-one" data-aos="fade-up" data-aos-delay={delay}>
                <div className="thumb">
                    <img src={`/assets/img/menu/${thumb}`} alt={name} width={600} height={600} />
                    {price !== undefined && <h4>${price}</h4>}
                </div>
                <div className="info">
                    <h4>{name}</h4>
                    <ul>
                        <li>
                            {tags.map((data, index) =>
                                <span key={index}>
                                    {data}
                                    {index < tags.length - 1 && ', '}
                                </span>
                            )}
                        </li>
                    </ul>
                    <p>{text}</p>
                </div>
            </div>
        </>
    );
};

export default SingleProductV1;