import axios from 'axios';

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    'X-Goog-FieldMask': 'places.displayName,places.photos,places.id'
};

export const GetPlaceDetails = async (data) => {
        const response = await axios.post(BASE_URL, JSON.stringify(data), { headers });
        return response.data;
};

export const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY