import { useEffect, useState } from "react";
import Weathericon from "./Weathericon";
import axios from "axios";
import { FaMapMarkerAlt, FaCalendarDay } from "react-icons/fa";
export default function WeatherForm() {
    const [text, setText] = useState("");
    const [data, setData] = useState(null);

    const getData = async () => {
        const APIkey = "e0ddc538b3415427caeb7901218a30dd";
        const cityname = "seoul";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}`;
        axios
            .get(url)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((error) => {
                console.log(error.data);
            })
    };
    useEffect(() => {
        getData();
    }, []);

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
                            getData();
                            setText("");
                        }
                    }}
                >
                </input>
                <button className="button-icon"><Weathericon /></button>
            </form>
            <div className="Up">
                <div className="row1">
                    <h1>Your Location</h1>
                    <p><FaMapMarkerAlt /> Location</p>
                    <p><FaCalendarDay /> DayTime | Monday</p>
                </div>
                <div className="row2">
                    <h1>{data && (data.wind.deg)}<sup>o</sup>C | {data && Math.round((data.wind.deg) - 32 / 1.8)}<sup>o</sup>F
                    </h1>
                    <img
                        src={data && `https://api.openweathermap.org/img/w/${data.weather[0].icon}`}
                    ></img>
                </div>
                <div className="row3">
                    <h1>{data && data.weather[0].description}</h1>
                    <p>City: {data && data.name}</p>
                    <p>Temp: {data && data.main.temp}</p>
                    <p>Country: {data && data.sys.country}</p>
                </div>

            </div>
        </div>
    )
}