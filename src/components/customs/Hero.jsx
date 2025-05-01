import React from "react";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 text-center">
          <div className="space-y-4">
            <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block mb-2">
                Discover Your Next Adventure with AI:
              </span>
              <span className="text-gray-800">
                Personalized Itineraries at Your Fingertips
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your personal trip planner and travel curator, creating custom
              itineraries tailored to your interests and budget.
            </p>
          </div>
          
          <Button 
            size="lg" 
            className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-8 py-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-lg"
            onClick={() => window.location.href = '/create-trip'}
          >
            Get Started, It's Free
          </Button>
          
          <div className="relative mt-12 w-full max-w-5xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-30"></div>
            <div className="relative">
              <img
                src="/image.jpg"
                alt="Travel Adventure"
                className="w-full h-[450px] object-cover rounded-xl shadow-xl"
              />
            </div>
            
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white py-4 px-6 rounded-full shadow-lg flex items-center gap-3">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <span className="font-medium text-gray-800">Trusted by 10,000+ travelers worldwide</span>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-indigo-50">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">AI-Powered Recommendations</h3>
              <p className="text-gray-600">Get personalized recommendations based on your preferences and travel history.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-indigo-50">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Save Time Planning</h3>
              <p className="text-gray-600">Create complete itineraries in minutes instead of spending hours researching.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-indigo-50">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Budget-Friendly Options</h3>
              <p className="text-gray-600">Find experiences that match your budget with transparent pricing.</p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="w-full bg-white py-8 border-t border-indigo-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <img src="/logo.svg" className="h-8 w-auto" alt="Fun Tour AI Logo" />
              <span className="font-bold text-gray-800">Fun Tour AI</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a>
            </div>
            <p className="text-gray-600 mt-4 md:mt-0">
              © {new Date().getFullYear()} Fun Tour AI. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Hero;