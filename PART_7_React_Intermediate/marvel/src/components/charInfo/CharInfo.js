import {useEffect, useState} from "react";
import PropTypes from "prop-types";


import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import './charInfo.scss';

const setContent = (process, char) => {
    switch (process) {
        case 'waiting':
            return <Skeleton/>
            break;
        case 'loading':
            return <Spinner/>
            break;
        case 'confirmed':
            return <View character={char}/>
            break;
        case 'error':
            return <ErrorMessage/>
            break;
        default:
            throw new Error("Unknown error");
    }
}

const CharInfo = (props) =>  {
    const [char, setChar] = useState(null)
    const {process, setProcess,getCharacter} = useMarvelService()

    useEffect(() => {
        getCharacterInfo();
    }, []);


    const getCharacterInfo = () => {
        const {id} = props;
        if(!id){
            return;
        }
        getCharacter(id)
            .then(onCharacterLoaded)
            .then(() => setProcess("confirmed"))
    }

    const onCharacterLoaded = (character) => {
        setChar(character)
    }

    useEffect(() => {
        getCharacterInfo()
    }, [props.id]);


    return (
        <div className="char__info">
            {setContent(process, char)}
        </div>
    )

}


const View = ({character}) => {
    const {name, description, wiki, homepage, thumbnail, comics} = character
    let styleElem = {'objectFit': 'cover'}
    if( thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ){
        styleElem = {'objectFit': 'fill'}
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} style={styleElem} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length < 1 ? "There is no comics" : null}
                {
                    comics.map((item , i) => {
                         if (i > 9) return
                         return(
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    id: PropTypes.number
}

export default CharInfo;