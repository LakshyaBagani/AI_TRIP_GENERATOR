import { GetPlaceDetails, PHOTO_REF_URL } from "@/Service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  const [photoURL, setPhotoUrl] = useState("");

  const GetPlacePhoto = async () => {
    if (!trip?.userSelection?.location) return;

    try {
      const data = { textQuery: trip.userSelection.location };
      const response = await GetPlaceDetails(data);

      if (response?.places?.length > 0 && response.places[0]?.photos?.length > 3) {
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", response.places[0].photos[3].name);
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  useEffect(() => {
    if (trip) GetPlacePhoto();
  }, [trip]);

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="hover:scale-105 transition-all">
        <img
          src={photoURL || "https://via.placeholder.com/300"} 
          alt={trip?.userSelection?.location}
          className="w-full h-[200px] object-contains rounded-xl aspect-[4/3]" 
        />
        <div className="mt-2">
          <h2 className="font-bold text-lg">{trip?.userSelection?.location}</h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days trip with 💰 {trip?.userSelection?.budget}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
