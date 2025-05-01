import { GetPlaceDetails, PHOTO_REF_URL } from "@/Service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  const [photoURL, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const GetPlacePhoto = async () => {
    if (!trip?.userSelection?.location) return;

    setLoading(true);
    try {
      const data = { textQuery: trip.userSelection.location };
      const response = await GetPlaceDetails(data);

      if (response?.places?.length > 0 && response.places[0]?.photos?.length > 3) {
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", response.places[0].photos[1].name);
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (trip) GetPlacePhoto();
  }, [trip]);

  // Format the date if available
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <Link to={`/view-trip/${trip?.id}`} className="block">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-1">
        <div className="relative">
          {loading ? (
            <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
          ) : (
            <img
              src={photoURL || "/images/placeholder-travel.jpg"}
              alt={trip?.userSelection?.location}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="inline-block bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              {trip?.userSelection?.noOfDays} {trip?.userSelection?.noOfDays === "1" ? "Day" : "Days"}
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h2 className="font-bold text-xl text-gray-900 line-clamp-1">
            {trip?.tripName || `Trip to ${trip?.userSelection?.location}`}
          </h2>
          
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{trip?.userSelection?.location}</span>
          </div>
          
          <div className="mt-1 flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{trip?.userSelection?.budget} Budget</span>
          </div>
          
          <div className="mt-1 flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>{trip?.userSelection?.traveler}</span>
          </div>
          
          {trip?.createdAt && (
            <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
              Created on {formatDate(trip.createdAt)}
            </div>
          )}
        </div>
        
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-3 text-center">
          <span className="text-sm font-medium text-indigo-600">Click to view details</span>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;