import { db } from "@/Service/FirebaseCongif";
import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import Usertripcarditem from "./Usertripcarditem";
import UserTripCardItem from "./Usertripcarditem";

function MyTrip() {
  const navigate = useNavigation();
  const [userTrip, setUserTrip] = useState();

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
    }

    const q =  query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDoc(q);
    setUserTrip([]);
    querySnapshot.forEach((doc) => {
      setUserTrip((preVal) => [...preVal, doc?.data()]);
    });
  };

  return (
    <div className="sm:px-10 md:ps-32 xl:px-72 lg:px-56 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>

      <div className="grid grid-cols-2 mt-10  md:grid-cols-3 gap-5">
        {userTrip?.length > 0
          ? userTrip.map((trip, index) => {
              <UserTripCardItem key={index} trip={trip} />;
            })
          : [1, 2, 3, 4, 5, 6].map((item, index) => {
              <div
                key={index}
                className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>;
            })}
      </div>
    </div>
  );
}

export default MyTrip;
