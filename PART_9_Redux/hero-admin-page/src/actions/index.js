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

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDeleting = (hero) => {
    return{
        type: 'HEROES_DELETING',
        payload: hero
    }
}

export const heroAdd = (hero) => {
    return{
        type: 'HERO_ADD',
        payload: hero
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}
export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}
export const filtersError = () => {
    return {
        type: 'FILTERS_ERROR'
    }
}

export const filter = (element) => {
    return{
        type: "FILTER",
        payload: element
    }
}