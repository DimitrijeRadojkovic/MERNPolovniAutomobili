import React from "react";

const YourProfile = () => {
    const [name, setName] = React.useState("");
    React.useEffect(async () => {
        const res = await fetch("../../users/showme");
        const json = await res.json();
        if(json.ok){
            setName(json.user.name + " " + json.user.surname);
        }
        
      }, []);
      return (
        <h1>{name}</h1>
      )
}

export default YourProfile;