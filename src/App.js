import logo from './logo.svg';
import {useState, useEffect} from "react";
import './App.css';

function App() {
  const[city,setCity] = useState("Hyderabad");
  const[weatherData,setWeatherData] = useState(null);

  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const months = [
    "Jan","Feb","Mar","Apr","May","June",
    "July","Aug","Sep","Oct","Nov","Dec"
  ]
  const month = months[date.getMonth()];
  const formattedDate=`${day} ${month} ${year}`
  const API_KEY ="66ff10a72d9df957e8e49df5eb796b04";

  const fetchWeatherData = async ()=>{
    try{
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  const data = await response.json();
  console.log(data);
  setWeatherData(data);
    }catch(error){
      console.log(error);
    }

  }

  useEffect(()=>{
    fetchWeatherData();
  },[]);

  const handleInputChange = (e)=>{
    setCity(e.target.value);

  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    fetchWeatherData();

  }

  const iconUrl = (type)=>{

    switch(type){
      case"Clouds":
      return "./rain_with_cloud.png";
      case"Mist":
      return"./tornado.png";
      case"Clear":
      return"./sun.png";
      default:
        return"./thunder.png";
    }

  }

  

  return (
    <div className="App">
      <div className="container">
        {weatherData &&( <>
        <h2 className="container_date">{formattedDate}</h2>
        <div className="weatherData">
          <h2 className="container_city">{weatherData.name}</h2>
          <img className="container_img" src={iconUrl(weatherData.weather[0].main)} width="180px" alt="tunder" />
          <h2 className="container_degree">{weatherData.main.temp}</h2>
          <h2 className="country_per">{weatherData.weather[0].main}</h2>
          <form className="form" onSubmit={handleSubmit}>
            <input className="input" type="text" onChange={handleInputChange} placeholder="Please enter city" />
            <button className="button">Get</button>
          </form>
        </div>
        </>
        )
        }
      </div>
    </div>
  );
}

export default App;
