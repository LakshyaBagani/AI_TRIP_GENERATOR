import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { useState } from "react";
import {
  AI_PROMPT,
  selectBudgetOption,
  selectTravelList,
} from "@/Constants/Options";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { chatSession } from "@/Service/AIModal";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/Service/FirebaseCongif";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputchange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUsetProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUsetProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      formData?.noOfDays > 5 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast.error("Please enter valid inputs", {
        description: "Make sure to fill in all required fields and limit your trip to 5 days or less."
      });
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totaldays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totaldays}", formData?.noOfDays);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      setLoading(false);
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      setLoading(false);
      toast.error("Failed to generate trip", {
        description: "Please try again later or contact support if the problem persists."
      });
      console.error("AI Trip generation error:", error);
    }
  };

  const SaveAiTrip = async (TripData) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();
      await setDoc(doc(db, "AITrips", docId), {
        userEmail: user?.email,
        userSelection: formData,
        tripData: JSON.parse(TripData),
        id: docId,
        tripName: `Trip to ${formData?.location}`,
        dates: `${formData?.noOfDays} day trip`,
        createdAt: new Date().toISOString(),
      });
      setLoading(false);
      toast.success("Trip created successfully!", {
        description: "Redirecting you to your new trip details..."
      });
      navigate("/view-trip/" + docId);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to save trip", {
        description: "Please try again later."
      });
      console.error("Save trip error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
   

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h1 className="font-bold text-3xl text-gray-900">
              Create Your Perfect Trip
            </h1>
            <p className="mt-3 text-gray-600 text-lg max-w-2xl mx-auto">
              Tell us your preferences and our AI will design a customized itinerary just for you.
              Your adventure is just a few steps away!
            </p>
          </div>

          <div className="mt-10 space-y-10">
            {/* Destination Section */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-start mb-4">
                <div className="bg-indigo-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-medium text-gray-900">
                    Where would you like to go?
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Enter the destination you wish to explore
                  </p>
                </div>
              </div>
              <Input
                placeholder={"Your Destination (e.g., Paris, Bali, New York)"}
                type="text"
                className="w-full p-3 mt-2 text-lg bg-white"
                onChange={(e) => {
                  setPlace(e.target.value);
                  handleInputchange("location", e.target.value);
                }}
              />
            </div>

            {/* Duration Section */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-start mb-4">
                <div className="bg-indigo-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-medium text-gray-900">
                    How long is your trip?
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    We currently support planning for up to 5 days
                  </p>
                </div>
              </div>
              <Input
                placeholder={"Number of Days (Max 5)"}
                type="number"
                min="1"
                max="5"
                className="w-full p-3 mt-2 text-lg bg-white"
                onChange={(e) => handleInputchange("noOfDays", e.target.value)}
              />
              {formData?.noOfDays > 5 && (
                <p className="text-red-500 text-sm mt-2">Please select 5 days or fewer</p>
              )}
            </div>

            {/* Budget Section */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-start mb-4">
                <div className="bg-indigo-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-medium text-gray-900">
                    What is your budget?
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    This helps us recommend suitable activities and dining options
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
                {selectBudgetOption.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputchange("budget", item.title)}
                    className={`p-5 bg-white border border-gray-200 cursor-pointer rounded-lg hover:shadow-lg transition-all duration-300 ${
                      formData?.budget === item.title ? "shadow-xl border-indigo-500 ring-2 ring-indigo-200" : ""
                    }`}
                  >
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h2 className="font-bold text-lg text-gray-900">{item.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Travelers Section */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-start mb-4">
                <div className="bg-indigo-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-medium text-gray-900">
                    Who will be traveling with you?
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Select your travel companions to customize your experience
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
                {selectTravelList.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputchange("traveler", item.people)}
                    className={`p-5 bg-white border border-gray-200 cursor-pointer rounded-lg hover:shadow-lg transition-all duration-300 ${
                      formData?.traveler === item.people ? "shadow-xl border-indigo-500 ring-2 ring-indigo-200" : ""
                    }`}
                  >
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h2 className="font-bold text-lg text-gray-900">{item.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Button 
              disabled={loading} 
              onClick={onGenerateTrip}
              className="px-8 py-5 text-lg bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl rounded-lg"
            >
              {loading ? (
                <div className="flex items-center">
                  <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin mr-2" />
                  <span>Creating your trip...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Generate Your Trip</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Login Dialog */}
      <Dialog open={openDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogDescription className="text-center py-4">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-indigo-100 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h2 className="font-bold text-xl text-gray-900 mt-2">Sign in to continue</h2>
              <p className="text-gray-600 mt-2 mb-6">We need to save your trip details to your account</p>
              <Button
                onClick={login}
                disabled={loading}
                className="w-full mt-2 py-5 flex justify-center items-center gap-3 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 transition-colors"
              >
                <FcGoogle className="h-6 w-6" /> 
                <span className="font-medium">Continue with Google</span>
              </Button>
              <p className="text-xs text-gray-500 mt-6">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;