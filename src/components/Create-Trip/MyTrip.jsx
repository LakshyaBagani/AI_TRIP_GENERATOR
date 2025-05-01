import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/Service/FirebaseCongif";
import { collection, query, where, getDocs } from "firebase/firestore";
import UserTripCardItem from "./Usertripcarditem";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "../ui/button";

function MyTrip() {
  const navigate = useNavigate();
  const [userTrip, setUserTrip] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    setLoading(true);
    const qer = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user.email)
    );

    try {
      const querySnapshot = await getDocs(qer);
      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });

      setUserTrip(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTrip = () => {
    navigate("/create-trip");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="font-bold text-3xl text-gray-900">
              My Trips
            </h1>
            <p className="mt-3 text-gray-600 text-lg max-w-2xl mx-auto">
              View all your saved itineraries and travel plans. Each trip is customized based on your preferences.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <AiOutlineLoading3Quarters className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
              <p className="text-gray-600 text-lg">Loading your trips...</p>
            </div>
          ) : userTrip.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {userTrip.map((trip, index) => (
                <UserTripCardItem key={index} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
              <div className="inline-block p-3 bg-gray-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No trips found</h3>
              <p className="text-gray-600 mb-6">You haven't created any trips yet. Start planning your next adventure!</p>
              <Button 
                onClick={handleCreateTrip}
                className="px-6 py-4 text-base bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg rounded-lg"
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create New Trip</span>
                </div>
              </Button>
            </div>
          )}

          {userTrip.length > 0 && (
            <div className="mt-10 flex justify-center">
              <Button 
                onClick={handleCreateTrip}
                className="px-6 py-4 text-base bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg rounded-lg"
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create New Trip</span>
                </div>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyTrip;