import "./charSearchForm.css"
import React, {useState} from "react";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup"
import useMarvelService from "../../services/MarvelService";
import {Link} from "react-router-dom";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";


const setContent = (process,Component, data) => {
    switch (process) {
        case 'waiting':
            return null
            break;
        case 'loading':
            return <div>Loading...</div>
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



export default function CharSearchForm(){
    const {loading,error, getCharacterByName, process, setProcess} = useMarvelService()
    const [char , setChar ] = useState({})
    const onFormSubmit = (values) => {
        getCharacterByName(values.searchedCharName)
            .then(onCharLoaded)
            .then(()=> setProcess("confirmed"))
    }
    const onCharLoaded = (char) => {
        setChar(char)
    }
    const loadingItem = loading ? <div>Loading...</div> : null
    const errorItem =  error ? <Result  char={{}}/> : null
    const content = (!loading && !error && char.id) ? <Result char={char}/> : null

    return(
    <>
        <div className="box">
            <Formik
                initialValues={{searchedCharName: ''}}
                validationSchema={Yup.object( { searchedCharName: Yup.string().min(3, "Minimum 3 characters").required("Name is required")})}
                onSubmit={values => onFormSubmit(values)}>
                {
                    ({errors, touched}) => (
                        <Form>
                            <label htmlFor="searchedCharName" className="searchCharLabel">Or find a character by name:</label>
                            <div className="inputAndButtons">
                                <Field id="searchedCharName" name="searchedCharName" className="searchCharInput"  placeholder="Enter a name"/>

                                <button disabled={loading} type="submit" className="button button__main button__search__form">
                                    <div className="inner">Find</div>
                                </button>

                            </div>
                            {errors.searchedCharName && touched.searchedCharName ? <div style={{"color":"red"}}>{errors.searchedCharName}</div> : null}
                        </Form>
                    )
                }
            </Formik>
            {setContent(process, Result, char)}
        </div>
    </>
    )
}

const Result = ({data}) => {
    const message = data.id===-1 ? "The character was not found. Check the name and try again" : `There is! Visit ${data.name} page?`
    const messageClass = data.id===-1 ? " error" : " sukces"
    const buttonClass = data.id===-1 ? " hidden" : null

    return (
        <div className="inputAndButtons">
            <p className={`result + ${messageClass}`}>{message}</p>
            <Link to={`/characters/${data.id}`} className={`button button__secondary button__search__form${buttonClass}`}>
                <div className="inner">To page</div>
            </Link>
        </div>
    )
}