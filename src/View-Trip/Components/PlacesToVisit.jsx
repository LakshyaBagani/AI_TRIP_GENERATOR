import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Places to Visit</h2>

      <div>
        {trip?.tripData?.map((tripItem, index) => {
          const nestedTripData = tripItem?.tripData; 
          return nestedTripData.itineary.map((itinerary, itineraryIndex) => (
            <div key={`${index}-${itineraryIndex}`} className="mt-5">
              <h2 className="font-medium text-lg mb-2">Day {itinerary?.day}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {itinerary?.places?.map((place, placeIndex) => (
                  <div key={`${index}-${itineraryIndex}-${placeIndex}`} className="my-3">
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
          ));
        })}
      </div>
    </div>
  );
}

export default PlacesToVisit;
