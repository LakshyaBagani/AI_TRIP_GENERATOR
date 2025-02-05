import { GetPlaceDetails, PHOTO_REF_URL } from '@/Service/GlobalAPI';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function PlaceCardItem({place}) {

  const [photoURL,setPhotoUrl] = useState()
        
        const GetPlacePhoto = async () => {
            const data = {
                textQuery: place.place_name,
            };
    
                const response = await GetPlaceDetails(data)
                const PhotoURl = PHOTO_REF_URL.replace('{NAME}' , response.places[0].photos[3].name )
                setPhotoUrl(PhotoURl);
                
        };
    
        useEffect(() => {
          place&&GetPlacePhoto()
        }, [place]);

  return (

    <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.place_name )}`} target='_blank'>
    
    <div className='border rounded-xl p-3 mt-2 flex hover:scale-110 translate-all hover:shadow-md cursor-pointer '>
        <img src={photoURL} className='w-[130px] h-[130px] rounded-xl object-cover' />

        <div className='my-2'>
            <h2 className='my-2 font-bold text-lg'>{place.place_name}</h2>
            <p className='my-2 text-sm text-gray-500 mt-0'>{place.place_details}</p>
            <h2 className="my-2 mt-2">🕙 {place?.time_travel || "N/A"}</h2>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem