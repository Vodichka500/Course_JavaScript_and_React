import {useState} from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharSearchForm from "../charSearchForm/CharSearchForm";

import decoration from '../../resources/img/vision.png';
import {Helmet} from 'react-helmet'


const MainPage = () => {
    const [id, setId] = useState(0)

    const updateId = (id) => {
        setId(id)
    }

    return(
        <>
            <Helmet>
                <title>Home</title>
                <meta name="description" content="Home page"/>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <CharList updateId = {updateId}/>
                <ErrorBoundary>
                    <div>
                        <CharInfo id={id}/>
                        <CharSearchForm/>
                    </div>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;