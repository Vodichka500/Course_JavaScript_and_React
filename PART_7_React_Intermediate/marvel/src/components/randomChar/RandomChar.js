import React, {useEffect, useState} from "react";
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './randomChar.scss';
import Spinner from "../spinner/Spinner";

const setContent = (process,Component, data) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>
            break;
        case 'loading':
            return  <Spinner/>
            break;
        case 'confirmed':
            return <Component data={data} />
            break;
        case 'error':
            return <ErrorMessage/>
            break;
        default:
            throw new Error("Unknown error");
    }
}

const RandomChar = () => {

    const [char, setChar] = useState({})
    const {loading, error, process, setProcess, getCharacter} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400-1011000) + 1011000)
        getCharacter(id)
            .then(onCharLoaded)
            .then(()=> setProcess('confirmed'))
    }

    useEffect(() => {
        updateChar()
    }, []);

    const onClickUpdateChar = () =>  {
        updateChar();
    }

    return (
        <div className="randomchar">
            {setContent(process, View, char)}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={onClickUpdateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;
    let imgStyle = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {'objectFit' : 'contain'}  : {'objectFit' : 'cover'}
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;