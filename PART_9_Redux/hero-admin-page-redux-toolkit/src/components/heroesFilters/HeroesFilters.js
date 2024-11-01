import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useHttp} from "../../hooks/http.hook"
import Spinner from "../spinner/Spinner";

import {fetchFilters} from "../../actions/index";
import { filter, filtersFetching} from  "../../slice/filtersSlice"


const HeroesFilters = () => {
    const {request} = useHttp()
    const {filters, filtersLoadingStatus} = useSelector(state => state.filters)
    const dispatch = useDispatch();

    const onClick = (event, type) => {
        const parent = event.target.parentElement;
        for(let button of parent.children){
            button.classList.remove("active")
        }
        event.target.classList.add("active")
        dispatch(filter(type))
    }

    useEffect(() => {
        dispatch(filtersFetching())
        dispatch(fetchFilters(request));
    }, []);

    if(filtersLoadingStatus === "loading"){
        return (
            <Spinner/>
        )
    } else if (filtersLoadingStatus === "error") {
        return (
            <h5 className="text-center mt-5">Ошибка загрузки</h5>
        )
    }

    const buttons = filters.map((filter) => {
        return (
            <button
                onClick={event =>  onClick(event,filter.type)}
                key={filter.type}
                className={`btn ${filter.filterClassName}`}>

                {filter.filterName}

            </button>
        )
    })



    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
//
// <button className="btn btn-danger">Огонь</button>
// <button className="btn btn-primary">Вода</button>
// <button className="btn btn-success">Ветер</button>
// <button className="btn btn-secondary">Земля</button>