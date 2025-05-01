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
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Headers() {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

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
        window.location.reload();
      });
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 shadow-md border-b border-indigo-100 flex justify-between items-center px-6 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <img src="/logo.svg" className="h-12 w-auto" alt="Fun Tour AI Logo" />
        <h1 className="font-extrabold text-3xl md:text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Fun Tour AI</h1>
      </div>
      
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <a href="/create-trip">
              <Button 
                variant="outline" 
                className="rounded-full border-blue-400 hover:bg-blue-50 transition-all duration-300 text-blue-600 font-medium"
              >
                Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button 
                variant="outline" 
                className="rounded-full border-indigo-400 hover:bg-indigo-50 transition-all duration-300 text-indigo-600 font-medium"
              >
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-indigo-300 hover:border-indigo-500 transition-all duration-300 shadow-sm cursor-pointer">
                  <img
                    src={user?.picture}
                    alt="User Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                {user?.name && (
                  <div className="mb-2 pb-2 border-b border-gray-200">
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                )}
                <button
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-red-50 text-red-600 font-medium transition-colors flex items-center gap-2"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button 
            onClick={() => setOpenDialog(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            Sign In
          </Button>
        )}
      </div>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md rounded-xl p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
            <img src="/logo.svg" className="h-12 w-auto mx-auto" alt="Fun Tour AI Logo" />
          </div>
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center text-gray-800">Welcome to Fun Tour AI</DialogTitle>
              <DialogDescription className="text-center">
                <p className="mt-2 text-gray-600">Sign in to access personalized travel recommendations and save your trip plans.</p>
                <Button
                  onClick={login}
                  className="w-full mt-6 flex gap-3 items-center justify-center py-5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 transition-colors shadow-sm"
                >
                  <FcGoogle className="h-6 w-6" /> 
                  <span className="font-medium">Sign in with Google</span>
                </Button>
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="bg-gray-50 p-4 text-center text-sm text-gray-500">
            By signing in, you agree to our Terms of Service & Privacy Policy
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Headers;