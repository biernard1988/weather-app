import Image from "next/image";
import React from "react";

export default function Weather({ data }) {
  return (
    <div className="relative flex flex-col justify-between max-w-xl w-full h-fit m-auto p-4 text-white z-10 gap-20">
      <div className="relative flex justify-between pt-12">
        <div className="flex flex-col items-center">
          <Image
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            width={100}
            height={100}
            alt="/"
          />
          <p className="text-2xl">{data.weather[0].main}</p>
        </div>
        <div className="flex flex-col items-center gap-2 bg-gray-700/30 rounded-xl">
          <p className="text-8xl">{data.main.temp.toFixed(0)}&deg;</p>
          <p>Feels like: {data.main.feels_like.toFixed(0)}&deg;</p>
        </div>
      </div>
      <div className="bg-gray-700/30 rounded-xl p-8 mt-10">
        <p className="text-2xl text-center pb-6">
          Weather in <b>{data.name}</b>
        </p>
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="flex gap-2">
            <p>Humidity:</p>
            <b>{data.main.humidity} %</b>
          </div>
          <div className="flex gap-2">
            <p>Winds:</p>
            <b>{data.wind.speed.toFixed(0)} Km/h</b>
          </div>
          <div className="flex gap-2">
            <p>Pressure:</p>
            <b>{data.main.pressure} hPa</b>
          </div>
        </div>
      </div>
    </div>
  );
}
