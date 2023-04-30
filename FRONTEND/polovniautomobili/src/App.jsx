import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./pages/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import YourProfile from "./pages/YourProfile";
import AddOglas from "./pages/AddOglas";
import "../src/css/style.css"

export default function App(){
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Nav style={{fontFamily: "mojfont"}} />}>

                <Route path="profil" element={<YourProfile style={{fontFamily: "mojfont"}} />}></Route>
            </Route>
            <Route path="/prijava" element={<Login style={{fontFamily: "mojfont"}} />}>
            </Route>
            <Route path="/registracija" element={<Register style={{fontFamily: "mojfont"}} />}></Route>
            <Route path="/dodajoglas" element={<AddOglas style={{fontFamily: "mojfont"}} />}></Route>
        </Routes>
    </BrowserRouter>
    )
}