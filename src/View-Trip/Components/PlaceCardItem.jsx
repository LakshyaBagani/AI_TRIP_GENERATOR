import React from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({place}) {
  return (

    <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.place_name )}`} target='_blank'>
    
    <div className='border rounded-xl p-3 mt-2 flex hover:scale-110 translate-all hover:shadow-md cursor-pointer '>
        <img src="/logo.svg" className='w-[130px] h-[130px] rounded-xl' />

        <div className=''>
            <h2 className='font-bold text-lg'>{place.place_name}</h2>
            <p className='text-sm text-gray-500 mt-0'>{place.place_details}</p>
            <h2 className="mt-2">🕙 {place?.time_travel || "N/A"}</h2>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem