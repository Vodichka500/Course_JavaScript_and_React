import {Helmet} from 'react-helmet'
import {Link} from "react-router-dom";
import("../singlePage.scss");


export default function SingleComicLayout({data}){
    const {name, description, thumbnail} =data;


    return (
        <div className="single-comic">
            <Helmet>
                <title>{name}</title>
                <meta name="description" content={description}/>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to="/" className="single-comic__back">Back to all</Link>
        </div>
    )
}