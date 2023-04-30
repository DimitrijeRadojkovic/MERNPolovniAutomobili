import { Link, Outlet } from "react-router-dom";
import React from "react";

const Login = () => {
    const [er, setEr] = React.useState();

    async function Prijava(e){
        e.preventDefault();
        try{
            const res = await fetch("../../users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({           
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value
                })
            });
            const json = await res.json();
            if(!json.ok){
                throw new Error(json.message);
            }
            else{
                window.location.href = "/";
            }
            
        }
        catch(error){
            setEr(error.message);
        }
    }
    return (
        <>
        <div className="container-fluid d-flex justify-content-center align-items-center">
            <form id="form" className="col-sm-6 col-12 d-flex flex-column justify-content-evenly" onSubmit={Prijava}>
                <input type="email" id="email" placeholder="Email"></input>
                <input type="password" id="password" placeholder="Lozinka"></input>
                <input type="submit" value="Prijavi se"></input>
            </form>
            <div>Nemas nalog? <Link to="/registracija">Registruj se</Link></div>
            <div>{er}</div>
        </div>
        <Outlet />
        </>
    )
}

export default Login;