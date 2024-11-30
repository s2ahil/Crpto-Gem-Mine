import React from "react";

const Page = () => {
  return (
    <div className=" app min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg mb-4">
          Welcome to our application! We strive to provide you with the most accurate and up-to-date
          cryptocurrency data to help you make informed decisions.
        </p>
        <p className="text-gray-600 text-lg mb-4">
          Whether you're an investor, enthusiast, or just curious about the world of digital
          currencies, our platform aims to offer valuable insights and tools tailored to your needs.
        </p>
        <p className="text-gray-600 text-lg">
          Stay tuned for more features and updates as we continue to enhance your experience. Thank
          you for being a part of our journey!
        </p>
      </div>
    </div>
  );
};

export default Page;
