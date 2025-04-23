import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Layouts/Header";
import MobilePhoneCategorySideBar from "../../Layouts/Pages/MobilePhoneCategorySideBar";
import CategorySideBar from "../../Layouts/CategorySideBar";
import Footer from "../../Layouts/Footer";
import powerBanksLogo from "../../assets/powerBanksLogo.png"; 
import casesLogo from "../../assets/casesLogo.png"; 
import standsLogo from "../../assets/standsLogo.png"; 
import headsetsLogo from "../../assets/headsetsLogo.png"; 
import powerBanks from "../../assets/powerBanks.webp"; 
import cases from "../../assets/cases.webp"; 
import stands from "../../assets/stands.webp"; 
import headsets from "../../assets/headsets.webp"; 


const phoneAndTabAccesoriesBrands = [
  { name: "Power-Banks", logo: powerBanksLogo, link: "#" },
  { name: "Cases", logo: casesLogo, link: "#" },
  { name: "Stands", logo: standsLogo, link: "#" },
  { name: "Headsets", logo: headsetsLogo, link: "#" },
];

const phoneAndTabAccessoriesForSale = [
  {
    id: "powerBanks",
    image: powerBanks,
    price: "2.5 ETH",
    brand: "Anker PowerCore 26800mAh",
    description: "A high-capacity power bank with dual USB ports, fast charging, and a durable build for long-lasting battery backup.",
    store: "Anker Official",
    collection: "Portable Chargers",
    link: "/ankerPowerCore26800",
  },
  {
    id: "cases",
    image: cases,
    price: "1.2 ETH",
    brand: "Spigen Ultra Hybrid Case",
    description: "A shockproof and transparent phone case with military-grade protection, ensuring durability and style.",
    store: "Spigen Store",
    collection: "Protective Cases",
    link: "/spigenUltraHybrid",
  },
  {
    id: "stands",
    image: stands,
    price: "2.0 ETH",
    brand: "Lamicall Adjustable Phone & Tablet Stand",
    description: "A sleek and sturdy aluminum stand with adjustable angles, perfect for hands-free use and video calls.",
    store: "Lamicall Store",
    collection: "Device Stands",
    link: "/lamicallStand",
  },
  {
    id: "headsets",
    image: headsets,
    price: "3.0 ETH",
    brand: "Sony WH-1000XM5",
    description: "Industry-leading noise-canceling wireless headphones with crystal-clear sound, long battery life, and superior comfort.",
    store: "Sony Official",
    collection: "Premium Audio",
    link: "/sonyWH1000XM5",
  }
];




const phoneAndTabAccesories = () => {
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
          <h1 className="text-2xl font-bold mb-4">Phone & Tablet Accesories:</h1>

          {/* Accesories Logos Grid */}
          <div className="grid grid-cols-4 md:grid-cols-3 gap-6">
            {phoneAndTabAccesoriesBrands.map((accessories, index) => (
              <Link
                to={accessories.link}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={accessories.logo}
                    alt={accessories.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="mt-2 text-gray-700 font-medium hover:text-blue-600 transition duration-300">
                  {accessories.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Accesories for Sale Grid */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Available Phone & Tablet Accesories:</h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {phoneAndTabAccessoriesForSale.map((accessories, index) => (
              <div
                key={index}
                className="bg-gray-100  rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`${accessories.link}`)}
              >
                {/* Car Image */}
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={accessories.image}
                    alt={accessories.brand}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Car Details */}
                <div className="bg-white p-3 ">
                  <p className="text-lg font-bold text-blue-600">{accessories.price}</p>
                  <p className="text-gray-800 font-semibold">{accessories.brand}</p>
                  <p className="text-gray-600 text-sm">{accessories.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Store: <span className="font-semibold">{accessories.store}</span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Collection:{" "}
                    <span className="font-semibold">{accessories.collection}</span>
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

export default phoneAndTabAccesories;
