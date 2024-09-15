import React, {useState, useEffect, useRef, useMemo} from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './charList.scss';

const setContent = (process,Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>
            break;
        case 'loading':
            return !    newItemLoading ? <Spinner/> : <Component/>
            break;
        case 'confirmed':
            return <Component/>
            break;
        case 'error':
            return <ErrorMessage/>
            break;
        default:
            throw new Error("Unknown error");
    }
}

const CharList = (props) => {

    const [characters, setCharacters] = useState([])
    const [ offset, setOffset] = useState(210)
    const [newItemLoading , setNewItemLoading] = useState(false)
    const [ lastItem, setLastItem] = useState(false)

    const {process,setProcess, getAllCharacters} = useMarvelService();

    useEffect(() => {
        getNewChar(offset, true)
    }, []);


    const getNewChar = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)

        getAllCharacters(offset)
            .then(onLoaded)
            .then(()=>setProcess('confirmed'))
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
                <li key={i}
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
    const elements = useMemo(() => setContent(process, ()=>(renderCharItems(characters)), newItemLoading), [process])

    return (
        <div className="char__list">
            {elements}
            <button
                className="button button__main button__long"
                style={{'display': lastItem ? 'none' : 'block' , 'disabled' : process==='loading', 'filter' : process==='loading' ? 'grayscale(0.5)' : 'none' }}
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