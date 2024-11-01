import { useParams} from "react-router-dom"
import React, {useEffect, useState} from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";

import './singlePage.scss';

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

const SinglePage = ({Component, contentType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading,error,getComic, getCharacter, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComic()
    }, [id]);

    const updateComic = () => {
        switch (contentType) {
            case "comic":
                getComic(id)
                    .then(onDataLoaded).then(()=>setProcess('confirmed'));
                break;
            case "character":
                getCharacter(id)
                    .then(onDataLoaded).then(()=>setProcess('confirmed'));
                break;
        }
    }


    const onDataLoaded = (data) => {
        setData(data)
    }


    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
}
export default SinglePage;