import React from "react";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 relative">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        <h1 className="font-extrabold text-5xl lg:text-6xl text-center">
          <span className="text-[#f56551]">
            Discover Your Next Adventure with AI:
          </span>{" "}
          Personalized Itineraries at Your Fingertips
        </h1>
        <p className="text-lg lg:text-xl text-gray-500 text-center max-w-3xl">
          Your personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget.
        </p>
        <Button 
          size="lg" 
          className="mt-2"
          onClick={() => window.location.href = '/create-trip'}
        >
          Get Started, It's Free
        </Button>
        <div className="mt-8 w-full max-w-5xl">
          <img
            src="/image.jpg"
            alt="Travel Adventure"
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;