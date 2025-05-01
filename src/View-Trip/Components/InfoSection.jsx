import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/Service/GlobalAPI";

function InfoSection({ trip }) {
  const [photoURL, setPhotoUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const GetPlacePhoto = async () => {
    try {
      setIsLoading(true);
      const data = {
        textQuery: trip?.userSelection?.location,
      };
      const response = await GetPlaceDetails(data);
      const PhotoURl = PHOTO_REF_URL.replace(
        "{NAME}",
        response.places[0].photos[3].name
      );
      setPhotoUrl(PhotoURl);
    } catch (error) {
      console.error("Failed to fetch place photo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-indigo-50">
      <div className="relative">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent z-10"></div>

        {/* Image loading state */}
        {isLoading ? (
          <div className="h-[500px] w-full bg-gray-200 animate-pulse flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        ) : (
          <img
            src={photoURL}
            className="h-[500px] w-full object-cover transition-transform duration-700 hover:scale-105"
            alt={trip?.userSelection?.location}
          />
        )}

        
        <div className="absolute bottom-6 left-6 z-20">
          <h1 className="text-white font-bold text-3xl md:text-4xl shadow-text mb-2">
            {trip?.userSelection?.location}
          </h1>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 p-2 px-4 bg-blue-50 text-blue-600 rounded-full font-medium border border-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{trip?.userSelection?.noOfDays} Days</span>
            </div>
            
            <div className="flex items-center gap-2 p-2 px-4 bg-indigo-50 text-indigo-600 rounded-full font-medium border border-indigo-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{trip?.userSelection?.Budget} Budget</span>
            </div>
            
            <div className="flex items-center gap-2 p-2 px-4 bg-blue-50 text-blue-600 rounded-full font-medium border border-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{trip?.userSelection?.traveler} Travelers</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              className="bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-full px-5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </Button>
            
            <Button 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-5 shadow-md"
            >
              <IoIosSend className="mr-2 h-5 w-5" />
              Send Itinerary
            </Button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <h3 className="font-medium text-gray-800 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Trip Information
          </h3>
          <p className="text-gray-600">
            This itinerary has been personalized based on your preferences for {trip?.userSelection?.location}. 
            Explore activities, accommodations, and dining options tailored to your {trip?.userSelection?.Budget} budget 
            for {trip?.userSelection?.noOfDays} days with {trip?.userSelection?.traveler} travelers.
          </p>
        </div>
      </div>
      
      
    </div>
  );
}

export default InfoSection;