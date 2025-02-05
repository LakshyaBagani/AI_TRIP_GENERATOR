import React from "react";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 text-center">
          <h1 className="font-extrabold text-4xl lg:text-5xl">
            <span className="text-[#f56551] block mb-2">
              Discover Your Next Adventure with AI:
            </span>
            Personalized Itineraries at Your Fingertips
          </h1>
          <p className="text-lg lg:text-xl text-gray-500 max-w-3xl">
            Your personal trip planner and travel curator, creating custom
            itineraries tailored to your interests and budget.
          </p>
          <Button 
            size="lg" 
            className="mt-4"
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
      <footer className="w-full bg-white py-6 border-t">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} AI Travel Planner. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Hero;