import React, {useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './charList.scss';


const CharList = (props) => {

    const [characters, setCharacters] = useState([])
    const [ offset, setOffset] = useState(210)
    const [newItemLoading , setNewItemLoading] = useState(false)
    const [ lastItem, setLastItem] = useState(false)

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        getNewChar(offset, true)
    }, []);


    const getNewChar = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)

        getAllCharacters(offset)
            .then(onLoaded)
    }

    const onLoaded = (newCharacters) => {
        let isLastItem = false;
        if(newCharacters.length < 9){
            isLastItem = true;
        }

        setCharacters(characters => [...characters, ...newCharacters])
        setOffset(offset+9)
        setNewItemLoading(false)
        setLastItem(isLastItem)
    }

    let charRefs = []
    const addRef = (item) => {
        charRefs.push(item)
    }

    const onSelected = (i) => {
        charRefs.forEach(item => item.classList.remove('char__item_selected'))
        charRefs[i].classList.add('char__item_selected');
    }

    const renderCharItems = (charachters) => {

        const charachtersItems = charachters.map((item, i) => {
            let styleElem = {'objectFit': 'cover'}
            if( item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ){
                styleElem = {'objectFit': 'fill'}
            }
            return (
                <li key={item.id}
                    ref={addRef}
                    className="char__item"
                    onClick={() => {
                        onSelected(i);
                        props.updateId(item.id);
                    }}>
                    <img src={item.thumbnail} style={styleElem} alt={item.name}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {charachtersItems}
            </ul>
        )
    }

    const items = renderCharItems(characters)

    const loadingItem = loading && !newItemLoading ?  <Spinner/> : null;
    const errorItem = error ? <ErrorMessage/> : null;

    return (
        <div className="char__list">
            {loadingItem}
            {errorItem}
            {items}
            <button
                className="button button__main button__long"
                style={{'display': lastItem ? 'none' : 'block' , 'disabled' : loading, 'filter' : loading ? 'grayscale(0.5)' : 'none' }}
                onClick={() => getNewChar(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

CharList.propTypes = {
    updateId: PropTypes.func.isRequired
}
export default CharList;