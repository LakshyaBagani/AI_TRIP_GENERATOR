export const selectBudgetOption = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of cost",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "No worry of budget",
    icon: "💸",
  },
];

export const selectTravelList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo travel in exploration",
    icon: "  ✈︎  ",
    people: "1 People",
  },
  {
    id: 2,
    title: "A couple",
    desc: "Two travels in tandem",
    icon: "🥂",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: "🏠",
    people: "4 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A group of joyful people",
    icon: "🛥️",
    people: "5 People",
  },
];

export const AI_PROMPT =
  "Generate a JSON travel plan for Location: {location}, Total Days: {totaldays}, Traveler: {traveler}, Budget: {budget}, including Hotel_Options (list starting with capital letters, fields: HotelName, HotelAddress, Price, Hotel_Images_url, geo_cordinates, rating, description) and itineary (array starting with lowercase, day-wise plans with fields: place_name [lowercase, from provided places list], place_details, place_image_url, geo_cordinates, ticket_pricing, time_travel, best_time_to_visit), ensuring all naming conventions, structures, and fields are strictly followed and no changes to the given field names or formatsGenerate a JSON travel plan for Location: {location}, Total Days: {totaldays}, Traveler: {traveler}, Budget: {budget}, including Hotel_Options (list starting with capital letters, fields: HotelName, HotelAddress, Price, Hotel_Images_url, geo_cordinates, rating, description) and itineary (array starting with lowercase, day-wise plans with multiple places to visit per day, each with fields: place_name [lowercase, from provided places list], place_details, place_image_url, geo_cordinates, ticket_pricing, time_travel, best_time_to_visit), ensuring all naming conventions, structures, and fields are strictly followed and no changes to the given field names or formats. tripData must me an array";
