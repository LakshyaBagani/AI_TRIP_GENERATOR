import { GetPlaceDetails, PHOTO_REF_URL } from '@/Service/GlobalAPI';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
  const [photoURL, setPhotoUrl] = useState();

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.place_name,
    };

    const response = await GetPlaceDetails(data);
    const PhotoURL = PHOTO_REF_URL.replace('{NAME}', response.places[0].photos[3].name);
    setPhotoUrl(PhotoURL);
  };

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.place_name)}`} target="_blank">
      <div className="border rounded-xl p-3 mt-2 flex items-start gap-4 hover:scale-105 transition-transform hover:shadow-md cursor-pointer">
        <img src={photoURL} className="w-[140px] h-[130px] rounded-xl object-cover" alt={place.place_name} />
        <div className="flex flex-col justify-between ml-2">
          <h2 className="font-bold text-lg">{place.place_name}</h2>
          <p className="text-sm text-gray-500">{place.place_details}</p>
          <h2 className="mt-2">🕙 {place?.time_travel || "N/A"}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
