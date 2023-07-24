import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from "./component/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Update from "./component/Update";
import View from "./component/View";
import "./component/css/index.css"
import CreateStudentForm from "./component/CreateStudentForm";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/*<App/>*/}
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home/>}></Route>
                <Route path={"/create"} element={<CreateStudentForm/>}></Route>
                <Route path={"/update/:id"} element={<Update/>}></Route>
                <Route path={"/view/:id"} element={<View/>}></Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);



