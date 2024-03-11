"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Wallpaper from "./components/Wallpaper";
import Weather from "./components/Weather";
import Loading from "./loading";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [clearButton, setClearButton] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`;

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.log("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    setClearButton(city.length > 0);
  }, [city]);

  const memoizedFetchWeather = useCallback(fetchWeather, [weather]);

  if (!weather) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-[1]">
          {/* BACKGROUND OVERLAY */}
        </div>
        <Wallpaper />
        <div className="relative flex justify-center items-center max-w-sm md:max-w-lg container mx-auto z-10 mt-5">
          <form
            onSubmit={fetchWeather}
            className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-400 text-white rounded-2xl"
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
        {weather.main && (
          <Weather data={weather} onLocationChange={memoizedFetchWeather} />
        )}
      </>
    );
  }
}
