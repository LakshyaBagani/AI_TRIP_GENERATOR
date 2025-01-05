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
  const [formData, setFormData] = useState([]);
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
    onerror: (error) => console.log(error),
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
      toast("Please enter valid inputs");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totaldays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totaldays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userEmail: user?.email,
      userSelection: formData,
      tripData: JSON.parse(TripData),
      id: docId,
    });
    setLoading(false);
    console.log(TripData);
    console.log(formData);

    navigate("/view-trip/" + docId);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:56 xl:px-10 px-5 mt-10">
      <h1 className="font-bold text-3xl">
        Tell us your travel preference ⛺🌴
      </h1>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information and our trip planner will generate a
        coustomised itiniary based on your preference
      </p>

      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="my-3 text-xl font-medium">
            Place you want to Visit ?
          </h2>
          <Input
            placeholder={"Your Destination"}
            type="text"
            onChange={(e) => {
              setPlace(e.target.value);
              handleInputchange("location", e.target.value);
            }}
          />
        </div>

        <div>
          <h2 className="my-3 text-xl font-medium">
            How may days you are planning your Trip ?
          </h2>
          <Input
            placeholder={"Number of Days ( Max 5 )"}
            type="number"
            onChange={(e) => handleInputchange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="my-3 text-xl font-medium">What is your Budget?</h2>
          <h2 className="my-3 text-xl font-medium">
            Your budget is allocated for activities and dining purposes
          </h2>

          <div className="grid grid-cols-3 gap-5 mt-5">
            {selectBudgetOption.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputchange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.budget == item.title && "shadow-xl border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>

          <h2 className="text-xl my-3 font-medium">
            With whom you want to plan your next Trip ?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {selectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputchange("traveler", item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.traveler == item.people && "shadow-xl border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin " />
          ) : (
            "Generate trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
              <p>Sign in to the app with Google authentication services</p>
              <Button
                onClick={login}
                disabled={loading}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" /> Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
