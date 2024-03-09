"use client";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Wallpaper from "./components/Wallpaper";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}`;

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(url).then((response) => {
      console.log(response.data);
      setWeather(response.data);
    });
    setCity("");
    setLoading(false);
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]">
        {/* BACKGROUND OVERLAY */}
      </div>

      <Wallpaper />

      <div className="relative flex justify-between items-center max-w-[500px] container mx-auto z-10 mt-5">
        <form
          onSubmit={fetchWeather}
          className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-500 text-white rounded-2xl"
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
          <button className="text-white" onClick={fetchWeather}>
            <BsSearch size={20} />
          </button>
        </form>
      </div>
    </>
  );
}
