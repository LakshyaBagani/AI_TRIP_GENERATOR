import { GetPlaceDetails, PHOTO_REF_URL } from "@/Service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardComponent({ hotel }) {
  const [photoURL, setPhotoUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const GetPlacePhoto = async () => {
    try {
      setIsLoading(true);
      const data = {
        textQuery: hotel?.HotelName,
      };
      const response = await GetPlaceDetails(data);
      const PhotoURl = PHOTO_REF_URL.replace(
        "{NAME}",
        response.places[0].photos[1].name
      );
      setPhotoUrl(PhotoURl);
    } catch (error) {
      console.error("Error fetching hotel photo:", error);
    } finally {
      setIsLoading(false);
    }
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
      className="block"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer h-full">
        {isLoading ? (
          <div className="w-full h-40 bg-gray-200 animate-pulse flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        ) : (
          <div className="relative">
            <img
              src={photoURL}
              alt={hotel?.HotelName || "Hotel Image"}
              className="w-full h-40 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300x200?text=Hotel+Image+Not+Available";
              }}
            />
            {hotel?.rating && (
              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                <span className="text-yellow-500 mr-1">⭐</span>
                {hotel.rating}
              </div>
            )}
          </div>
        )}
        <div className="p-4 flex flex-col gap-2">
          <h2 className="font-medium text-gray-800 line-clamp-1">
            {hotel?.HotelName || "Hotel Name Unavailable"}
          </h2>
          <p className="text-xs text-gray-500 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-2">{hotel?.HotelAddress || "Address Unavailable"}</span>
          </p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-indigo-600">
              {hotel?.Price ? (
                <span>{hotel.Price}</span>
              ) : (
                <span className="text-gray-500">Price N/A</span>
              )}
            </p>
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">View Details</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardComponent;