import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {thunk}  from 'redux-thunk'
import heroes from "../reducers/heroes";
import filters from "../reducers/filters"

const stringMiddelware = ({dispatch, getState}) => (next) => (action) => {
    if(typeof(action) === 'string'){
        return next({
            type: action
        })
    }
    return next(action)
}

const store = createStore(combineReducers({heroes,filters}),
     compose(applyMiddleware(thunk , stringMiddelware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

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