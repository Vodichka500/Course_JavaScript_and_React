import {createAction} from "@reduxjs/toolkit";
import {heroesFetched, heroesFetchingError} from  "../slice/heroesSlice"
import {filtersFetched, filtersError} from "../slice/filtersSlice"

export const fetchHeroes = (request) => (dispatch) => {
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}
export const fetchFilters = (request) => (dispatch) => {
    request("http://localhost:3001/filters", "GET")
        .then(req => dispatch(filtersFetched(req)))
        .catch(() => dispatch(filtersError()))
}

// export const heroesFetching = createAction("HEROES_FETCHING")
// export const heroesFetched = createAction("HEROES_FETCHED")
// export const heroesFetchingError = createAction("HEROES_FETCHING_ERROR")
// export const heroesDeleting = createAction("HEROES_DELETING")
// export const heroAdd = createAction("HERO_ADD")
// export const filtersFetching = createAction("FILTERS_FETCHING")
// export const filtersFetched = createAction("FILTERS_FETCHED")
// export const filtersError = createAction("FILTERS_ERROR")
// export const filter = createAction("FILTER")