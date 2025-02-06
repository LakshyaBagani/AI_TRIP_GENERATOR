import { GetPlaceDetails, PHOTO_REF_URL } from "@/Service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardComponent({ hotel }) {
  const [photoURL, setPhotoUrl] = useState();

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.HotelName,
    };
    const response = await GetPlaceDetails(data);
    const PhotoURl = PHOTO_REF_URL.replace(
      "{NAME}",
      response.places[0].photos[1].name
    );
    setPhotoUrl(PhotoURl);
  };

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        hotel?.HotelName
      )},${encodeURIComponent(hotel?.HotelAddress)}`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoURL}
          alt={hotel?.HotelName || "Hotel Image"}
          className="w-full h-40 object-cover rounded-md"
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">
            {hotel?.HotelName || "Hotel Name Unavailable"}
          </h2>
          <h2 className="text-xs text-gray-500">
            📍 {hotel?.HotelAddress || "Address Unavailable"}
          </h2>
          <h2 className="text-sm">
            💰 {hotel?.Price || "Price Not Available"}
          </h2>
          <h2 className="text-sm">⭐ {hotel?.rating || "No Rating"}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardComponent;
