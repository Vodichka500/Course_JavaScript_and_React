import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import {Helmet} from "react-helmet";

const ComicsPage = () => {


    return(
        <>
            <Helmet>
                <title>Comics</title>
                <meta name="description" content="Comics page"/>
            </Helmet>
            <ErrorBoundary>
                <AppBanner/>
                <ComicsList/>
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;