import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Layouts/Header";
import MobilePhoneCategorySideBar from "../../Layouts/Pages/MobilePhoneCategorySideBar";
import CategorySideBar from "../../Layouts/CategorySideBar";
import Footer from "../../Layouts/Footer";
import appleLogo from "../../assets/appleLogo.png"; 
import samsungLogo from "../../assets/samsungLogo.png"; 
import xiaomiLogo from "../../assets/xiaomiLogo.png"; 
import oraimoLogo from "../../assets/oraimoLogo.png"; 
import appleWatch from "../../assets/appleWatch.webp"; 
import samsungWatch from "../../assets/samsungWatch.webp"; 
import xiaomiWatch from "../../assets/xiaomiWatch.webp"; 
import oraimoWatch from "../../assets/oraimoWatch.webp"; 


const watchBrands = [
  { name: "Apple", logo: appleLogo, link: "#" },
  { name: "Samsung", logo: samsungLogo, link: "#" },
  { name: "Oraimo", logo: oraimoLogo, link: "#" },
  { name: "Xiaomi", logo: xiaomiLogo, link: "#" },
];

const watchForSale = [
  {
    id: "appleWatch",
    image: appleWatch,
    price: "2.5 ETH",
    brand: "Apple Watch Ultra 2",
    description: "Apple’s most rugged and feature-packed smartwatch with a titanium case, 100m water resistance, and advanced health tracking.",
    store: "Apple Store",
    collection: "Premium Smartwatches",
    link: "/appleWatchUltra2",
  },
  {
    id: "samsungWatch",
    image: samsungWatch,
    price: "1.2 ETH",
    brand: "Samsung Galaxy Watch 6 Classic",
    description: "A stylish and powerful smartwatch with a rotating bezel, AMOLED display, and advanced fitness tracking features.",
    store: "Samsung Hub",
    collection: "Flagship Smartwatches",
    link: "/samsungWatch6Classic",
  },
  {
    id: "oraimoWatch",
    image: oraimoWatch,
    price: "2.0 ETH",
    brand: "Oraimo Watch 3 Pro",
    description: "An affordable yet feature-rich smartwatch with heart rate monitoring, long battery life, and IP68 water resistance.",
    store: "Oraimo Store",
    collection: "Budget Smartwatches",
    link: "/oraimoWatch3Pro",
  },
  {
    id: "xiaomiWatch",
    image: xiaomiWatch,
    price: "3.0 ETH",
    brand: "Xiaomi Watch S1 Pro",
    description: "A premium smartwatch with a sapphire glass display, stainless steel frame, and extensive health tracking capabilities.",
    store: "Xiaomi Official",
    collection: "High-End Smartwatches",
    link: "/xiaomiWatchS1Pro",
  }
];



const smartWatch = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="flex min-h-screen px-3 py-4 mt-16">
        {/* Sidebar */}
        <div className="w-1/4 min-h-screen border-r border-gray-300">
          <MobilePhoneCategorySideBar />
          <br />
          <CategorySideBar />
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-4">
          <h1 className="text-2xl font-bold mb-4">Smart Watches:</h1>

          {/* Car Logos Grid */}
          <div className="grid grid-cols-4 md:grid-cols-3 gap-6">
            {watchBrands.map((watch, index) => (
              <Link
                to={watch.link}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={watch.logo}
                    alt={watch.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="mt-2 text-gray-700 font-medium hover:text-blue-600 transition duration-300">
                  {watch.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Cars for Sale Grid */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Available Smart Watches:</h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {watchForSale.map((watch, index) => (
              <div
                key={index}
                className="bg-gray-100  rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`${watch.link}`)}
              >
                {/* Car Image */}
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={watch.image}
                    alt={watch.brand}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Car Details */}
                <div className="bg-white p-3 ">
                  <p className="text-lg font-bold text-blue-600">{watch.price}</p>
                  <p className="text-gray-800 font-semibold">{watch.brand}</p>
                  <p className="text-gray-600 text-sm">{watch.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Store: <span className="font-semibold">{watch.store}</span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Collection:{" "}
                    <span className="font-semibold">{watch.collection}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default smartWatch;
