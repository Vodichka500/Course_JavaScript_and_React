import AppHeader from "../appHeader/AppHeader";
import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return(
        <div>
            <ErrorMessage/>
            <Link to="/" style={{'display': 'block','text-align':'center'}}>Return to home page</Link>
        </div>
    )
}

export default ErrorPage