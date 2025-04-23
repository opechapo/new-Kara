import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Layouts/Header";
import HomeAndGardenSideBar from "./../../Layouts/Pages/HomeAndGardenSideBar";
import CategorySideBar from "./../../Layouts/CategorySideBar";
import Footer from "./../../Layouts/Footer";
import lightingLogo from "./../../assets/lightingLogo.png";
import chandeliersLogo from "./../../assets/chandeliersLogo.png";
import curtainsLogo from "./../../assets/curtainsLogo.png";
import mirrorsLogo from "./../../assets/mirrorsLogo.png";
import lighting from "./../../assets/lighting.webp";
import chandelier from "./../../assets/chandelier.webp";
import curtain from "./../../assets/curtain.webp";
import mirror from "./../../assets/mirror.webp";



const HomeAccesoriestypes = [
  { name: "Lightings", logo: lightingLogo, link: "#" },
  { name: "Chandeliers", logo: chandeliersLogo, link: "/cars/mercedes" },
  { name: "Curtains", logo: curtainsLogo, link: "/cars/volks" },
  { name: "Mirrors", logo: mirrorsLogo, link: "/cars/ford" },
];

const HomeAccesoriesForSale = [
  {
    id: "chandelier",
    image: chandelier,
    price: "2.5 ETH",
    brand: "Crystal Chandelier",
    description: "Luxury crystal chandelier with a dazzling design, perfect for elegant interiors.",
    store: "Luxe Lighting",
    collection: "Home Lighting",
    link: "/crystalChandelier",
  },
  {
    id: "curtains",
    image: curtain,
    price: "3.2 ETH",
    brand: "Elegant Velvet Curtains",
    description: "Premium velvet curtains that add a touch of sophistication and privacy to any room.",
    store: "Drape Styles",
    collection: "Home Decor",
  },
  {
    id: "lighting",
    image: lighting,
    price: "2.8 ETH",
    brand: "Modern LED Floor Lamp",
    description: "Sleek and energy-efficient LED floor lamp with adjustable brightness settings.",
    store: "Bright Spaces",
    collection: "Home Lighting",
  },
  {
    id: "mirror",
    image: mirror,
    price: "2.0 ETH",
    brand: "Vintage Wall Mirror",
    description: "Classic decorative wall mirror with an ornate frame, perfect for any stylish space.",
    store: "Reflections Decor",
    collection: "Home Accessories",
  },
];



const HomeAccesories = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="flex min-h-screen px-6 py-4 mt-16">
        {/* Sidebar */}
        <div className="w-1/4 min-h-screen border-r border-gray-300">
          <HomeAndGardenSideBar />
          <br />
          <CategorySideBar />
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-4">
          <h1 className="text-2xl font-bold mb-4">Home Accesories:</h1>

          {/* HomeAccesories Logos Grid */}
          <div className="grid grid-cols-4 md:grid-cols-3 gap-6">
            {HomeAccesoriestypes.map((HomeAccesories, index) => (
              <Link
                to={HomeAccesories.link}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={HomeAccesories.logo}
                    alt={HomeAccesories.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="mt-2 text-gray-700 font-medium hover:text-blue-600 transition duration-300">
                  {HomeAccesories.name}
                </p>
              </Link>
            ))}
          </div>

          {/* HomeAccesories for Sale Grid */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            Available Home Accesories:
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {HomeAccesoriesForSale.map((HomeAccesories, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`${HomeAccesories.link}`)}
              >
                {/* Car Image */}
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={HomeAccesories.image}
                    alt={HomeAccesories.brand}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* HomeAccesories Details */}
                <div className="bg-white p-3 ">
                  <p className="text-lg font-bold text-blue-600">{HomeAccesories.price}</p>
                  <p className="text-gray-800 font-semibold">{HomeAccesories.brand}</p>
                  <p className="text-gray-600 text-sm">{HomeAccesories.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Store: <span className="font-semibold">{HomeAccesories.store}</span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Collection:{" "}
                    <span className="font-semibold">{HomeAccesories.collection}</span>
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

export default HomeAccesories;
