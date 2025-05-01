import React from "react";
import HotelCardComponent from "./HotelCardComponent";

function Hotels({ trip }) {
  return (
    <div className="bg-gray-50 px-6 py-8 rounded-xl">
      <h2 className="font-bold text-2xl mb-6 text-gray-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        Hotel Recommendations
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {trip?.tripData?.map((tripItem, tripIndex) => {
          const nestedTrip = tripItem?.tripData; 
          return nestedTrip?.Hotel_Options?.map((hotel, hotelIndex) => (
            <HotelCardComponent
              hotel={hotel}
              key={`${tripIndex}-${hotelIndex}`}
            />
          ));
        })}
      </div>
      
      {(!trip?.tripData || trip.tripData.length === 0) && (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="text-lg font-medium text-gray-600">No hotel recommendations available</h3>
          <p className="text-gray-500 mt-2">Try adjusting your trip preferences to see hotel options</p>
        </div>
      )}
    </div>
  );
}

export default Hotels;