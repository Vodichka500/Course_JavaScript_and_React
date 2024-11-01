
// Пример использования createReducer


import {createReducer} from "@reduxjs/toolkit";
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesDeleting,
    heroAdd
} from "../actions/index"

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading'
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle'
            state.heroes = action.payload
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error'
        })
        .addCase(heroesDeleting, (state,action) => {
            state.heroes = state.heroes.filter((item) => (item.id !== action.payload))
        })
        .addCase(heroAdd, (state,action) => {
            state.heroes.push(action.payload)
        })
    }
)

//  ONLY IN NATIVE JavaScript:

// const heroes = createReducer(initialState, {
//         [heroesFetching]: state => {state.heroesLoadingStatus = 'loading'},
//         [heroesFetched]: (state, action) => {
//             state.heroesLoadingStatus = 'idle';
//             state.heroes = action.payload;
//         },
//         [heroesFetchingError]: state => {
//             state.heroesLoadingStatus = 'error';
//         },
//         [heroCreated]: (state, action) => {
//             state.heroes.push(action.payload);
//         },
//         [heroDeleted]: (state, action) => {
//             state.heroes = state.heroes.filter(item => item.id !== action.payload);
//         }
//     },
//     [],
//     state => state
// )

export default heroes;