import axios from "axios";
import React, { useEffect,useState } from "react";
// import Details from "./Details";
import "./Weather.css";

const Weather = () => {
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});


    const getWeatherDetails =(cityName)=>{
        const api_URL= `http://api.weatherstack.com/current?access_key=4d3b91f752e80b70c1d91f569a7af694&query=${cityName}`
        axios.get(api_URL).then((res)=>{
            console.log("response",res.data);
            setData(res.data);
        }).catch((err)=>console.log("error" , err))

    }
 
    const handleSubmit=()=>{
        getWeatherDetails(inputCity);
        setInputCity("");
    }
    useEffect(()=>{
        getWeatherDetails("mumbai");
    },[])
  return (
    <>
      <div className="card">
        <div className="search">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            value={inputCity}
            onChange={(e)=>setInputCity(e.target.value)}
         
          />
          <button  
            onClick={handleSubmit}
            >
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
        {
           Object.keys(data).length > 0 &&
            <div className="weather loading">
      <h2 className="city">Weather in {data?.location?.name} </h2>
      <h1 className="temp">{data?.current.temperature}°C</h1>
      <div className="flex">
        <img src={data?.current?.weather_icons} alt="icon" className="icon" />
        <div className="description">{data?.current?.weather_descriptions}</div>
      </div>
      <div className="humidity">Humidity : {data?.current?.humidity} %</div>
      <div className="wind">Wind speed: {data?.current?.wind_speed} km/h in Direction {data?.current?.wind_dir}</div>
    </div>
     }
     </div>
    </>
  );
};

export default Weather;
