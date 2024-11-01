import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {createStore} from "redux";
import reducer from "./reducer.js"
import App from './components/App.js'


const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// As of React 18
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
)
