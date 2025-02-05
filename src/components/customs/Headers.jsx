import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";


function Headers() {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

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
        window.location.reload();
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5 ">
      <img src="/logo.svg" />
      <h1 className="font-extrabold text-[40px] ">Fun Tour AI</h1>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              {" "}
              <Button variant="outline" className="rounded-full">
                Create Trip
              </Button>{" "}
            </a>
            <a href="/my-trips">
              {" "}
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>{" "}
            </a>
            <Popover>
              <PopoverTrigger>
                {" "}
                <img
                  src={user?.picture}
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
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

export default Headers;
