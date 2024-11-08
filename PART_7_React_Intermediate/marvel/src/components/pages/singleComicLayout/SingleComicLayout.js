import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";

import("../singlePage.scss");
export default function SingleComicLayout({data}){
    const {title, description,price, image , pageCount, language} = data


    return (
        <div className="single-comic">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description}/>
            </Helmet>
            <img src={image} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}