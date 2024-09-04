import {useEffect, useState} from "react";

import useMarvelService from "../../services/MarvelService";

import './comicsList.scss';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";



const ComicsList = () => {
    const [comics, setComics] = useState([])
    const [offset, setOffset] = useState(0)
    const [isFirstComics, setIsFirstComics] = useState(true)
    const [isLast, setIsLast] = useState(false)

    const {loading, error, getAllComics} = useMarvelService()


    // {id: 101, title: "Xmen", price: '0,99$', image: "http://i.annihil.us/u/prod/marvel/i/mg/f/20/4bc63a47b8dcb.jpg"},
    // {id: 101, title: "Xmen", price: '0,99$', image: "http://i.annihil.us/u/prod/marvel/i/mg/f/20/4bc63a47b8dcb.jpg"},
    // {id: 101, title: "Xmen", price: '0,99$', image: "http://i.annihil.us/u/prod/marvel/i/mg/f/20/4bc63a47b8dcb.jpg"}

    useEffect(() => {
        setOffset(offset => offset+8)
        getAllComics()
            .then(setComics)
    }, []);

    const getNewComics = () => {
        setIsFirstComics(false)

        getAllComics(offset)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComics) => {
        if(newComics.length < 8){
            setIsLast(true)
        }


        setOffset(offset => offset+8)
        setComics(comics => [...comics, ...newComics])

    }

    const renderComicsItems = () => {
        const items = comics.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <a href="#">
                        <img src={item.image} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price>0 ? item.price+"$" : "NOT AVAILABLE"}</div>
                    </a>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderComicsItems()
    const spinner = (loading && isFirstComics) ? <Spinner/>:null
    const errorMessage = error ? <ErrorMessage/>:null

    return (


        <div className="comics__list">
            {spinner}
            {errorMessage}
            {items}
            <button className="button button__main button__long"
                    style={{
                        'display': isLast ? "none" : "block",
                        'disable' : loading,
                        'filter' : loading ? "grayscale(0.5)": ''
                    }}
                    onClick={getNewComics}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}


export default ComicsList;