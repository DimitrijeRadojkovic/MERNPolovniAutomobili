import React from "react";
import { Link } from "react-router-dom";

const Register = () => {

    const [er, setEr] = React.useState("");

    async function Registracija(e){
        e.preventDefault();
        try{
            const res = await fetch("../../users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: document.getElementById("name").value,
                    surname: document.getElementById("surname").value,
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
        <div className="container-fluid d-flex justify-content-center align-items-center">
            <form id="form" className="col-sm-6 col-12 d-flex flex-column justify-content-evenly" onSubmit={Registracija}>
                <input type="text" id="name" placeholder="Ime"></input>
                <input type="text" id="surname" placeholder="Prezime"></input>
                <input type="email" id="email" placeholder="Email"></input>
                <input type="password" id="password" placeholder="Lozinka"></input>
                <input type="submit" value="Registruj se"></input>
            </form>
            <div>Vec imas nalog? <Link to="/prijava">Prijavi se</Link></div>
            <div>{er}</div>
        </div>
    )
}

export default Register;