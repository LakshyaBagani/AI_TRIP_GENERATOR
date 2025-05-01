import axios from 'axios';


export const GetPlaceDetails = async (data) => {
    try {
      const response = await axios.post(
        "https://places.googleapis.com/v1/places:searchText",
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.photos', 
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching place details:", error);
      throw error;
    }
  };

export const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY