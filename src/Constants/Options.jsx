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
  "Generate travel plan for Location : {location} for {totaldays} days  for {traveler} with a {budget} budget . Give me a Hotel_Options list with HotelName , HotelAddress , Price , Hotel_Images_url , geo_cordinates , rating , description and suggest itinerary with place_name , place_details , place_image_url , geo_cordinates , ticket_pricing , time_travel for each of the location for {totaldays} days with each day plan with best time to visit . Please this information in JSON format and dont change the options . Give itineary and tripData in array form not in map form and word itineary always start with small letter . ";
