import React from "react";
import { Link } from "react-router-dom";
import HotelCardComponent from "./HotelCardComponent";

function Hotels({ trip }) {

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.map((tripItem, index) =>
          tripItem?.Hotel_Options?.map((hotel, hotelIndex) => (
            
           <HotelCardComponent hotel={hotel} />
          ))
        )}
      </div>
    </div>
  );
}

export default Hotels;