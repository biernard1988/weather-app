"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Wallpaper from "./components/Wallpaper";
import Weather from "./components/Weather";
import Loading from "./loading";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [clearButton, setClearButton] = useState(false);

  useEffect(() => {
    setClearButton(city.length > 0);
  }, [city]);

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) return; // Prevent fetching weather if city is empty

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.log("Error fetching weather:", error);
    }
  };

  if (!weather) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="fixed inset-0 bg-black/50 z-[1]">
          {/* BACKGROUND OVERLAY */}
        </div>
        <Wallpaper />
        <div className="relative flex justify-center items-center max-w-sm md:max-w-lg container mx-auto z-10 mt-5">
          <form
            onSubmit={fetchWeather} // Use fetchWeather directly as onSubmit handler
            className="flex justify-between items-center w-full mx-5 md:mx-0 p-3 bg-transparent border border-gray-400 text-white rounded-2xl"
          >
            <div>
              <input
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                className="bg-transparent outline-none rounded-lg p-1"
                type="text"
                placeholder="Search city"
              />
            </div>
            <button className="text-white" type="submit">
              <BsSearch size={20} />
            </button>
          </form>
        </div>
        {weather.main && <Weather data={weather} />}
      </>
    );
  }
}
