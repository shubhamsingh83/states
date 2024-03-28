import { useEffect,useState } from 'react';
import './App.css';

function App() {
  const [countries,setCountries] = useState([]);
  const[states,setStates] = useState([]);
  const[cities,setCities] = useState([]);
  const[selectedCountry,setSelectedCountry] = useState("");
  const[selectedState,setSelectedState] = useState("");
  const[selectedCity,setSelectedCity] = useState(""); 

  const getCountries = async ()=>{
    try{
          const res = await fetch("https://crio-location-selector.onrender.com/countries");
          const data =  await res.json();
          setCountries(data);
    } catch(err){
      console.error("Error fetching countries:", err);
    }
  }

  const getStates = async ()=>{
    try{
          const res = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
          const data =  await res.json();
          setStates(data);
    } catch(err){
      console.error("Error fetching states:", err);
    }
  }
 
  const getCities = async ()=>{
    try{
          const res = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
          const data =  await res.json();
          setCities(data);
    } catch(err){
      console.error("Error fetching cities:", err);
    }
  }

  useEffect(()=>{
    getCountries();
  },[]);

  useEffect(()=>{
     getStates();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedCountry]);

  useEffect(()=>{
    getCities();
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[selectedCountry,selectedState]);


  return (
    <div className="city-selector">
     <h1>Select Location</h1>
     <div className="dropdowns">
      <select 
      value={selectedCountry}
      onChange={(e)=>setSelectedCountry(e.target.value)}
      className="dropdown"
      >
       <option disabled value="">
         Select Country
       </option>
       {countries.map((country)=>{
          return(
            <option key={country} value={country}>
              {country}
            </option>
          );
       })}
      </select>

      <select 
      value={selectedState}
      onChange={(e)=>setSelectedState(e.target.value)}
      className="dropdown"
      disabled={!selectedCountry}
      >
       <option disabled value="">
         Select state
       </option>
       {states.map((state)=>{
          return(
            <option key={state} value={state}>
              {state}
            </option>
          );
       })}
      </select>

      <select 
      value={selectedCity}
      onChange={(e)=>setSelectedCity(e.target.value)}
      className="dropdown"
      disabled={!selectedCountry && !selectedState}
      >
       <option disabled value="">
         Select City
       </option>
       {cities.map((city)=>{
          return(
            <option key={city} value={city}>
              {city}
            </option>
          );
       })}
      </select>
     </div>
     {selectedCity && (
        <h2 className="result">
          You selected <span className="highlight">{selectedCity},</span>
          <span className="fade">
            {" "}
            {selectedState},{selectedCountry}
          </span>
        </h2>
      )}
    </div>
  );
}

export default App;
