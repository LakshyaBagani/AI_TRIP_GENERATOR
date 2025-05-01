import { GetPlaceDetails, PHOTO_REF_URL } from '@/Service/GlobalAPI';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
  const [photoURL, setPhotoUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const GetPlacePhoto = async () => {
    try {
      setIsLoading(true);
      const data = {
        textQuery: place.place_name,
      };

      const response = await GetPlaceDetails(data);
      const PhotoURL = PHOTO_REF_URL.replace('{NAME}', response.places[0].photos[1].name);
      setPhotoUrl(PhotoURL);
    } catch (error) {
      console.log("Failed to fetch place photo:", error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (place) {
      GetPlacePhoto();
    }
  }, [place]);

  return (
    <Link 
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.place_name)}`} 
      target="_blank"
      className="block"
    >
      <div className="bg-white border border-indigo-50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-4px] group">
        <div className="flex flex-col sm:flex-row">
          {/* Image section with loading state */}
          <div className="relative w-full sm:w-[180px] h-[160px] overflow-hidden">
            {isLoading ? (
              <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            ) : (
              <>
                <img 
                  src={photoURL} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  alt={place.place_name} 
                />
                <div className="absolute top-3 left-3">
                  <div className="flex items-center bg-blue-600/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Maps
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Content section */}
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-lg text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {place.place_name}
              </h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                {place.place_details}
              </p>
            </div>
            
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center text-sm text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {place?.time_travel || "N/A"}
              </div>
              
              <div className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View on Maps
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;