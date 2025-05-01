import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  // Function to get total number of places across all days
  const getTotalPlacesCount = () => {
    let count = 0;
    trip?.tripData?.forEach(tripItem => {
      tripItem?.tripData?.itineary?.forEach(day => {
        count += day?.places?.length || 0;
      });
    });
    return count;
  };

  return (
    <div className="bg-white rounded-2xl border border-indigo-50 shadow-md p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="font-bold text-2xl text-gray-800">Places to Visit</h2>
        </div>
        
        <div className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-medium">
          {getTotalPlacesCount()} Places
        </div>
      </div>

      {trip?.tripData?.length ? (
        trip.tripData.map((tripItem, index) => {
          const nestedTripData = tripItem?.tripData;
          return nestedTripData.itineary.map((itinerary, itineraryIndex) => (
            <div 
              key={`${index}-${itineraryIndex}`} 
              className="mb-10 last:mb-0"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  {itinerary?.day}
                </div>
                <h2 className="font-semibold text-xl text-gray-800">
                  Day {itinerary?.day} Attractions
                </h2>
              </div>
              
              <div className="ml-4 pl-6 border-l-2 border-dashed border-indigo-200">
                <div className="grid md:grid-cols-2 gap-5">
                  {itinerary?.places?.map((place, placeIndex) => (
                    <div 
                      key={`${index}-${itineraryIndex}-${placeIndex}`} 
                      className="relative"
                    >
                      {/* Small dot connecting to timeline */}
                      <div className="absolute -left-[41px] top-14 h-4 w-4 rounded-full bg-blue-100 border-2 border-blue-500"></div>
                      
                      {/* Place card */}
                      <PlaceCardItem place={place} />
                    </div>
                  ))}
                </div>
                
                {/* End of day marker */}
                {itineraryIndex < nestedTripData.itineary.length - 1 && (
                  <div className="flex justify-center my-8">
                    <div className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      End of Day {itinerary?.day}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ));
        })
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700">No places to visit yet</h3>
          <p className="text-gray-500 mt-2">Your itinerary is still being prepared or no places have been added yet.</p>
        </div>
      )}
      
      {trip?.tripData?.length > 0 && (
        <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Travel Tip</h4>
              <p className="text-sm text-gray-600 mt-1">
                Click on any place card to view its location on Google Maps. This will help you plan your routes more efficiently and understand the distance between attractions.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlacesToVisit;