import { useEffect, useState } from "react";
import Weathericon from "./Weathericon";
import axios from "axios";
import { FaMapMarkerAlt, FaCalendarDay } from "react-icons/fa";
export default function WeatherForm() {
    const [text, setText] = useState("Ho Chi Minh City");
    const [data, setData] = useState(null);
    const [error, setError] = useState("")

    const getData = async () => {
        const APIkey = "e0ddc538b3415427caeb7901218a30dd";

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${APIkey}`;
        axios
            .get(url)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((error) => {
                if(error.response.status === "404") {
                    setError("invalid city name");
                }
            });
    };
    useEffect(() => {
        getData();
    }, []);
    const time = new Date().toLocaleTimeString();
    const [currentTime, setcurrentTime] = useState(time);
    const updateTime = () => {
        const time = new Date().toLocaleTimeString();
        setcurrentTime(time)
    }
    setInterval(updateTime,1000);
    const date = new Date().toDateString();
    
    return (
        <div>
            <form className="WeatherForm">
                <input className="form-rac1"
                    type="text"
                    placeholder="Enter Location"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter" && text) {
                            e.preventDefault();
                            getData();
                            setText("");
                        }
                    }}
                >
                    
                </input>
               
                <button className="button-icon" onClick={(e) => {
                    e.preventDefault();
                    getData();
                    setText("");
                }}><Weathericon /></button>
            </form>
           
            <div className="Up">
                <div className="row1">
                    <h1> {data && data.name}</h1>
                    <p><FaMapMarkerAlt /> {data && data.name}</p>
                    <p><FaCalendarDay /> {currentTime} | {date}</p>
                </div>
                <div className="row2">
                    <h1>{data && Math.round(data.main.temp - 273.15)}<sup>o</sup>C | {data && Math.round((data.main.temp - 273.15)*1.8+32)}<sup>o</sup>F  
                    </h1>
                    <img
                        src={data && `https://api.openweathermap.org/img/w/${data.weather[0].icon}`}
                    ></img>
                </div>
                <div className="row3">
                    {data && (
                        <>
                            <h1>{ data.weather[0].description}</h1>
                            <p>City: { data.name}</p>
                            <p>Temp: { data.main.temp}</p>
                            <p>Country: { data.sys.country}</p>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}
