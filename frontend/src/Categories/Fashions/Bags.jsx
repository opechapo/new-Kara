import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./../../Layouts/Header";
import HomeAndGardenSideBar from "./../../Layouts/Pages/HomeAndGardenSideBar";
import CategorySideBar from "./../../Layouts/CategorySideBar";
import Footer from "./../../Layouts/Footer";
import luggagesLogo from "./../../assets/luggagesLogo.png";
import handbagsLogo from "./../../assets/handbagsLogo.png";
import backpacksLogo from "./../../assets/backpacksLogo.png";
import shoulderBagsLogo from "./../../assets/shoulderBagsLogo.png";
import luggage from "./../../assets/luggage.webp";
import handbag from "./../../assets/handbag.webp";
import backpack from "./../../assets/backpack.webp";
import shoulderBag from "./../../assets/shoulderBag.webp";
import FashionCategorySideBar from "../../Layouts/Pages/FashionCategorySideBar";



const Bagstypes = [
  { name: "Luggages", logo: luggagesLogo, link: "#" },
  { name: "Handbags", logo: handbagsLogo, link: "#" },
  { name: "Backpacks", logo: backpacksLogo, link: "#" },
  { name: "ShoulderBagsLogo", logo: shoulderBagsLogo, link: "#" },
];

const BagsForSale = [
  {
    id: "luggage",
    image: luggage,
    price: "2.5 ETH",
    brand: "Premium Travel Luggage",
    description: "Durable and spacious rolling suitcase with TSA lock and expandable storage.",
    store: "Globetrotter Gear",
    collection: "Travel Essentials",
    link: "/premiumTravelLuggage",
  },
  {
    id: "backpack",
    image: backpack,
    price: "3.2 ETH",
    brand: "Ergonomic Laptop Backpack",
    description: "Water-resistant backpack with multiple compartments for work and travel.",
    store: "Urban Carry",
    collection: "Everyday & Travel Backpacks",
  },
  {
    id: "handbag",
    image: handbag,
    price: "2.8 ETH",
    brand: "Luxury Leather Handbag",
    description: "Elegant designer handbag crafted from premium leather with a stylish finish.",
    store: "Elite Fashion",
    collection: "Luxury Handbags",
  },
  {
    id: "shoulderBag",
    image: shoulderBag,
    price: "2.0 ETH",
    brand: "Classic Shoulder Bag",
    description: "Compact and stylish shoulder bag with adjustable straps for everyday use.",
    store: "Chic Accessories",
    collection: "Casual & Formal Bags",
  },
];



const Bags = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="flex min-h-screen px-6 py-4 mt-16">
        {/* Sidebar */}
        <div className="w-1/4 min-h-screen border-r border-gray-300">
          <FashionCategorySideBar />
          <br />
          <CategorySideBar />
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-4">
          <h1 className="text-2xl font-bold mb-4">Bags:</h1>

          {/* Bag Logos Grid */}
          <div className="grid grid-cols-4 md:grid-cols-3 gap-6">
            {Bagstypes.map((Bag, index) => (
              <Link
                to={Bag.link}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={Bag.logo}
                    alt={Bag.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="mt-2 text-gray-700 font-medium hover:text-blue-600 transition duration-300">
                  {Bag.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Bags for Sale Grid */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            Available Bags:
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {BagsForSale.map((Bag, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`${Bag.link}`)}
              >
                {/* Bag Image */}
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={Bag.image}
                    alt={Bag.brand}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Bag Details */}
                <div className="bg-white p-3 ">
                  <p className="text-lg font-bold text-blue-600">{Bag.price}</p>
                  <p className="text-gray-800 font-semibold">{Bag.brand}</p>
                  <p className="text-gray-600 text-sm">{Bag.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Store: <span className="font-semibold">{Bag.store}</span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Collection:{" "}
                    <span className="font-semibold">{Bag.collection}</span>
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

export default Bags;
