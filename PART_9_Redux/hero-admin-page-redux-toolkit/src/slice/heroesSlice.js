import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit"
import {useHttp} from "../hooks/http.hook"
import {createSelector} from "reselect";


// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle'
// }

const heroesAdapter = createEntityAdapter()
const initialState = heroesAdapter.getInitialState({heroesLoadingStatus: 'idle'})

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {
        const request = useHttp().request
        return request("http://localhost:3001/heroes")
    }
)

const heroesSlice = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        heroesDeleting: (state,action) => {
            // state.heroes = state.heroes.filter((item) => (item.id !== action.payload))
            heroesAdapter.removeOne(state, action.payload)
        },
        heroAdd: (state,action) => {
            // state.heroes.push(action.payload)
            heroesAdapter.addOne(state, action.payload)
        }

    },
    extraReducers: builder => {
        builder
            .addCase(fetchHeroes.pending, (state) => {
                state.heroesLoadingStatus = 'loading'
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                // state.heroes = action.payload
                heroesAdapter.setAll(state, action.payload)
                state.heroesLoadingStatus = 'idle'
            })
            .addCase(fetchHeroes.rejected, (state) => {
                state.heroesLoadingStatus = 'error'
            })
    }
})

export const {selectAll} = heroesAdapter.getSelectors(state => state.heroes)
export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    selectAll,
    (filter, heroes) => {
        if(filter === "all"){
            return heroes
        } else {
            return (heroes.filter(item => item.element === filter))
        }
    }
)


const {reducer, actions} = heroesSlice;
export default reducer;


export const {
    heroesFetching,
    heroesDeleting,
    heroAdd} = actions