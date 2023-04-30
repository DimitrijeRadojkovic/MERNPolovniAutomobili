import React from "react";

const AddOglas = () => {

    const [sortedMake, setSortedMake] = React.useState([]);
    const [sortedModel, setSortedModel] = React.useState([]);
    

    function Preview(){
        const [fileData, setFileData] = React.useState([]);
        const fileChangeHandler = (e) => {
            setFileData([...fileData, ...e.target.files]);
    };

    const removeImage = (index) => {
        setFileData((preFile) => preFile.filter((item, i) => i !== index));
        const dt = new DataTransfer();
  const input = document.getElementById('input');
  const { files } = input;
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (index !== i)
      dt.items.add(file) // here you exclude the file. thus removing it.
  }
  
  input.files = dt.files
    };

    
       
            
        
    
    return (
        <>
        <ul>
        {
            
                fileData.map((x, i) =>
                               <>
                                   <img src={URL.createObjectURL(x)} alt="" width="100" height="100"></img>
                                   <div onClick={() => removeImage(i)} key={i}>Ukloni sliku</div>
                               </>
                               )
        }
        </ul>
        
                               <input type="file" id="input" name="images" multiple onChange={fileChangeHandler}></input>
                               </>
    )
    }

    

    React.useEffect(() => {
        async function fetchData(){
        const res = await fetch("../../users/showme");
        const json = await res.json();
        if(!json.ok){
            window.location.href = "/prijava";
        }
        }
        fetchData();
      }, []);

      React.useEffect(() => {
            async function fetchData(){
                const res = await fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=&sort=modifiedon&facet=make&facet=model&facet=cylinders&facet=drive&facet=eng_dscr&facet=fueltype&facet=fueltype1&facet=mpgdata&facet=phevblended&facet=trany&facet=vclass&facet=year");
                const json = await res.json();
                console.log(json);
                setSortedMake(json.facet_groups[0].facets.sort((a, b) => {
                let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();
            
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            }));
            }
            fetchData();
     }, []);

     const Make = document.getElementById("marka");

    async function getModels() {
            const res = await fetch(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=&rows=2000&sort=modifiedon&facet=model&refine.make=${Make.value}`);
            const json = await res.json();
            console.log(json);
            const niz = json.records.map(x => x.fields.model);
            setSortedModel(niz.sort());
            
        }

   async function submit(e){
        e.preventDefault();
        const marka = document.getElementById("marka");
        const model = document.getElementById("model");
        const files = document.getElementById("input");
        const formData = new FormData();

        formData.append("marka", marka.value);
        formData.append("model", model.value);

        for(let i =0; i < files.files.length; i++) {
            formData.append("images", files.files[i]);
        }

        const res = await fetch("../../oglasi/addoglas", {
            method: "POST",
            body: formData
        });
        const json = await res.json();
        alert(json.ok);
    }
        
       

      return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
            <form id="form" className="col-sm-8 col-10 border shadow d-flex flex-column justify-content-evenly align-items-center vh-100" encType="multipart/form-data" onSubmit={submit}>
                <div className="d-flex flex-column justify-content-evenly w-50">
                    <label htmlFor="marka" style={{fontWeight: "bold"}}>Marka</label>
                <select id="marka" placeholder="Marka" onChange={getModels}>
                    <option></option>
                    {sortedMake.map((x, index) => <option value={x.name} key={index}>{x.name}</option>)}
                    <option value="Ostalo">Ostalo</option>
                </select>
                </div>
                
                <div className="d-flex flex-column justify-content-evenly w-50">
                    <label htmlFor="model" style={{fontWeight: "bold"}}>Model</label>
                    <select id="model" placeholder="Model">
                        <option></option>
                        {sortedModel.map((x, index) => <option value={x} key={index}>{x}</option>)}
                        <option value="Ostalo">Ostalo</option>
                    </select>
                </div>

                <div className="d-flex flex-column justify-content-evenly w-50">
                    
                        <Preview />
                    
                    
                </div>
                <input type="submit" value="Dodaj oglas"></input>
            </form>
        </div>
      )
}

export default AddOglas;