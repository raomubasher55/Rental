import React from "react";
import Hero from '@/assets/hero.png'

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      <div className="container mx-auto flex flex-col items-center justify-center px-6 py-16 md:flex-row md:py-20">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Rent Smarter, Grow Faster
          </h1>
          <p className="mt-4 text-lg leading-relaxed md:mt-6 md:text-xl">
            Manage your rental business seamlessly with our all-in-one SaaS
            platform. From listings to payments—everything in one place.
          </p>
          <div className="mt-6 flex flex-col items-center gap-4 md:mt-8 md:flex-row">
            <a
              href="#features"
              className="rounded-lg bg-white px-6 py-3 text-blue-600 font-medium shadow-md hover:bg-gray-100"
            >
              Get Started
            </a>
            <a
              href="#demo"
              className="rounded-lg border border-white px-6 py-3 font-medium hover:bg-white hover:text-blue-600"
            >
              Watch Demo
            </a>
          </div>
        </div>

        {/* Image/Illustration */}
        <div className="mt-12 flex justify-center md:mt-0 md:w-1/2">
          <img
            src={Hero? Hero :"https://via.placeholder.com/500"}
            alt="SaaS Rental Illustration"
            className="w-full max-w-md md:max-w-lg"
          />
        </div>
      </div>

      {/* Background Shapes */}
      <div className="absolute top-0 left-0 h-32 w-32 rounded-full bg-white opacity-10 blur-3xl md:h-64 md:w-64"></div>
      <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-white opacity-10 blur-3xl md:h-64 md:w-64"></div>
    </section>
  );
};

export default HeroSection;
