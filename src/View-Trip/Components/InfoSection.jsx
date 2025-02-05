import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/Service/GlobalAPI";

function InfoSection({ trip }) {

    const [photoURL,setPhotoUrl] = useState()
    
    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location,
        };
            const response = await GetPlaceDetails(data)
            const PhotoURl = PHOTO_REF_URL.replace('{NAME}' , response.places[0].photos[3].name )
            setPhotoUrl(PhotoURl);
            
    };

    useEffect(() => {
        trip&&GetPlacePhoto()
    }, [trip]);


    return (
        <div>
            <img 
                src={photoURL}
                className="h-[600px] w-full object-contains rounded-xl" 
                alt={trip?.userSelection?.location}
            />

            <div className="flex justify-between items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">
                        {trip?.userSelection?.location}
                    </h2>
                    <div className="flex gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            📅 {trip?.userSelection?.noOfDays} Days
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            💰 {trip?.userSelection?.Budget} Budget
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            🥂 No of Traveler: {trip?.userSelection?.traveler}
                        </h2>
                    </div>
                </div>

                <Button>
                    <IoIosSend />
                </Button>
            </div>
        </div>
    );

}

export default InfoSection;