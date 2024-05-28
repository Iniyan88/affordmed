import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="w-full  h-96  flex flex-col justify-center items-center">
      <header className="bg-white top-0 w-full shadow py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Landing Page</h1>
        </div>
      </header>

      <main className="flex flex-col items-center mt-10">
        <div className="bg-white shadow rounded-lg p-8 w-full  text-center">
          <h2 className="text-2xl text-slate-900 font-bold mb-6">
            Hello welcome to my worst landing Page
          </h2>
          <p className="text-gray-700 mb-6">
            Please login or sign up to continue.
          </p>
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
          <span className="mx-2">or</span>
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            Sign Up
          </Link>
        </div>
      </main>

      <footer className="bg-white w-full shadow py-4 fixed bottom-0">
        <p className="text-center text-gray-500">Footer</p>
      </footer>
    </div>
  );
};

export default LandingPage;
