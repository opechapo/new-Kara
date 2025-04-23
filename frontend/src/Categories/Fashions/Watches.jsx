import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Layouts/Header";
import FashionCategorySideBar from "../../Layouts/Pages/FashionCategorySideBar";
import CategorySideBar from "../../Layouts/CategorySideBar";
import Footer from "../../Layouts/Footer";
import cartierLogo from "../../assets/cartierLogo.png";
import casioLogo from "./../../assets/casioLogo.png";
import hublotLogo from "./../../assets/hublotLogo.png";
import rolexLogo from "./../../assets/rolexLogo.png";
import cartier from "./../../assets/cartier.webp";
import casio from "./../../assets/casio.webp";
import hublot from "./../../assets/hublot.webp";
import rolex from "./../../assets/rolex.webp";

const Watchtypes = [
  { name: "Cartier", logo: cartierLogo, link: "#" },
  { name: "Casio", logo: casioLogo, link: "#" },
  { name: "Hublot", logo: hublotLogo, link: "#" },
  { name: "Rolex", logo: rolexLogo, link: "#" },
];

const WatchForSale = [
  {
    id: "cartier",
    image: cartier,
    price: "2.5 ETH",
    brand: "Cartier Santos",
    description:
      "Luxury Swiss-made watch with a timeless design and automatic movement.",
    store: "Prestige Timepieces",
    collection: "Luxury Watches",
    link: "/cartierSantos",
  },
  {
    id: "casio",
    image: casio,
    price: "3.2 ETH",
    brand: "Casio G-Shock",
    description:
      "Shock-resistant and water-resistant sports watch built for durability.",
    store: "Casio World",
    collection: "Sports & Digital Watches",
  },
  {
    id: "hublot",
    image: hublot,
    price: "2.8 ETH",
    brand: "Hublot Big Bang",
    description:
      "Bold and innovative watch with a fusion of luxury materials and precision.",
    store: "Hublot Exclusive",
    collection: "High-End Watches",
  },
  {
    id: "rolex",
    image: rolex,
    price: "2.0 ETH",
    brand: "Rolex Submariner",
    description:
      "Iconic dive watch with a sleek design, automatic movement, and water resistance.",
    store: "Rolex Boutique",
    collection: "Classic & Dive Watches",
  },
];

const Watches = () => {
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
          <h1 className="text-2xl font-bold mb-4">Watches:</h1>

          {/* Watch Logos Grid */}
          <div className="grid grid-cols-4 md:grid-cols-3 gap-6">
            {Watchtypes.map((Watch, index) => (
              <Link
                to={Watch.link}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={Watch.logo}
                    alt={Watch.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="mt-2 text-gray-700 font-medium hover:text-blue-600 transition duration-300">
                  {Watch.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Watches for Sale Grid */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Available Watches:</h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {WatchForSale.map((Watch, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`${Watch.link}`)}
              >
                {/* Bag Image */}
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={Watch.image}
                    alt={Watch.brand}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Watches Details */}
                <div className="bg-white p-3 ">
                  <p className="text-lg font-bold text-blue-600">
                    {Watch.price}
                  </p>
                  <p className="text-gray-800 font-semibold">{Watch.brand}</p>
                  <p className="text-gray-600 text-sm">{Watch.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Store: <span className="font-semibold">{Watch.store}</span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Collection:{" "}
                    <span className="font-semibold">{Watch.collection}</span>
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

export default Watches;
