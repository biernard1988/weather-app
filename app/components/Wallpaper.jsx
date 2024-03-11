import axios from "axios";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

export default function Wallpaper() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchWallpaper = async () => {
      try {
        const response = await axios.get("https://picsum.photos/v2/list");
        const randomIndex = Math.floor(Math.random() * response.data.length); // Get a random index
        setImageUrl(response.data[randomIndex].download_url);
      } catch (error) {
        console.log("Error fetching wallpaper:", error);
      }
    };

    fetchWallpaper();
  }, []);

  const renderWallpaper = useCallback(() => {
    return (
      <div className="wallpaper">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Random Wallpaper"
            layout="fill" // Fills the container
            objectFit="cover" // Scales to cover the container
            priority // Prioritizes loading the image
          />
        )}
      </div>
    );
  }, [imageUrl]);
  return renderWallpaper();
}
