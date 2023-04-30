import React from "react";
import { Outlet, Link } from "react-router-dom";

const Profile = () => {
    const [name, setName] = React.useState("Profil");
    const [display, setDisplay] = React.useState("dropdown-item");
    const [display_logout, setDisplay_logout] = React.useState("d-none");

    React.useEffect(async () => {
      const res = await fetch("../../users/showme");
      const json = await res.json();
      if(json.ok){
        setName(json.user.name + " " + json.user.surname);
        setDisplay(display + " " + "d-none");
        setDisplay_logout("dropdown-item");
      }
    }, []);

    /*React.useEffect(() => {
        fetch("../../users/showme")
        .then((res) => res.json())
        .then((data) => {
            if(data.ok){
                setName(data.user.name + " " + data.user.surname);
                setDisplay(display + " " + "d-none");
                setDisplay_logout("dropdown-item");
            }
        });
    }, []);*/

    async function Odjava(){
      try{
        const res = await fetch("../../users/logout");
        const json = await res.json();
        if(json.ok){
          setDisplay("dropdown-item");
          setDisplay_logout("d-none");
          window.location.href = "/";
        }
      }
      catch(error){
        console.log(error.message);
      }
    }

    return (
        <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="/"
          id="navbarDropdownMenuLink"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {name}
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <li>
            <Link className={display} to="/prijava">Prijavi se</Link>
          </li>
          <li>
            <Link className={display_logout} to="/profil">Moj Profil</Link>
          </li>
          <li>
            <button className={display_logout} id="dugme" onClick={Odjava}>Odjavi se</button>
          </li>
        </ul>
      </li>
    )
}

export default Profile;