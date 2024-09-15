import {BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import {MainPage, ComicsPage, SinglePage} from "../pages"
import ErrorPage from "../pages/errorPage";
import SingleComicLayout from "../pages/singleComicLayout/SingleComicLayout";
import SingleCharacterLayout from  "../pages/singleCharacterLayout/SingleCharacterLayout"

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>} />
                        <Route path="/comics/" element={<ComicsPage/>} />
                        <Route path="comics/:id" element={<SinglePage Component={SingleComicLayout} contentType="comic"/>} />
                        <Route path="*" element={<ErrorPage/>} />
                        <Route path="characters/:id" element={<SinglePage Component={SingleCharacterLayout} contentType="character"/>} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;