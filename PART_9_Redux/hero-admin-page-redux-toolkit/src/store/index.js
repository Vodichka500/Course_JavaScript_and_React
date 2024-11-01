import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {thunk}  from 'redux-thunk'
import heroes from "../slice/heroesSlice";
import filters from "../slice/filtersSlice"
import {configureStore} from "@reduxjs/toolkit";

const stringMiddelware = ({dispatch, getState}) => (next) => (action) => {
    if(typeof(action) === 'string'){
        return next({
            type: action
        })
    }
    return next(action)
}

// const store = createStore(combineReducers({heroes,filters}),
//      compose(applyMiddleware(thunk , stringMiddelware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
const store = configureStore({
    reducer: {heroes, filters},
    devTools: process.env.NODE_ENV !== 'production',
    // middleware: () => [thunk , stringMiddelware],
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddelware)
})

const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);
    const oldDispatch = store.dispatch;
    store.dispatch = (action) => {
        if(typeof(action) === 'string'){
            return oldDispatch({
                type: action
            })
        }
        return oldDispatch
    }
    return store
}

// Создать стор с enhancer
// const store =  createStore(combineReducers({heroes,filters},
//     compose(enhancer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())))


// Создать стор
// const store = createStore(combineReducers({heroes,filters},
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;