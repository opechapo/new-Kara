import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../Layouts/Header";
import CarsCategorySideBar from "../../../Layouts/Pages/CarsCategorySideBar";
import CategorySideBar from "../../../Layouts/CategorySideBar";
import Footer from "../../../Layouts/Footer";
import tvsLogo from "../../../assets/tvsLogo.png"
import hondaLogo from "../../../assets/hondaLogo.png"
import bajajLogo from "../../../assets/bajajLogo.png"
import suzukiLogo from "../../../assets/suzukiLogo.png"
import tvsKeke from "../../../assets/tvsKeke.webp";
import hondaBike from "../../../assets/hondaBike.webp";
import bajajBike from "../../../assets/bajajBike.webp";
import suzukiBike from "../../../assets/suzukiBike.webp"



const MotorcycleAndTricycleLogo = [
  { name: "TVS", logo: tvsLogo, link: "#" },
  { name: "Honda", logo: hondaLogo, link: "#" },
  { name: "Bajaj", logo: bajajLogo, link: "#" },
  { name: "Suzuki", logo: suzukiLogo, link: "#" },
];

const bikesforSale = [
  {
    id: "tvsKeke",
    image: tvsKeke,
    price: "2.5 ETH",
    brand: "TVS King Tricycle",
    description:
      "A durable and fuel-efficient tricycle designed for commercial transportation.",
    store: "TVS Hub",
    collection: "Tricycles",
    link: "/tvsKingTricycle",
  },
  {
    id: "hondaBike",
    image: hondaBike,
    price: "3.2 ETH",
    brand: "Honda CBR 500R",
    description:
      "A powerful and stylish sports bike with superior handling and performance.",
    store: "Honda Motors",
    collection: "Sport Bikes",
    link: "/hondaCBR500R",
  },
  {
    id: "bajajBike",
    image: bajajBike,
    price: "2.8 ETH",
    brand: "Bajaj Boxer 150",
    description: "A reliable and fuel-efficient motorcycle ideal for daily commuting.",
    store: "Bajaj Auto",
    collection: "Commuter Bikes",
    link: "/bajajBoxer150",
  },
  {
    id: "suzukiBike",
    image: suzukiBike,
    price: "2.0 ETH",
    brand: "Suzuki GSX-R600",
    description:
      "A high-performance sports bike with cutting-edge technology and design.",
    store: "Suzuki Motors",
    collection: "Sport Bikes",
    link: "/suzukiGSXR600",
  },
];


const MotorcycleAndTricycle = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="flex min-h-screen px-6 py-4 mt-16">
        {/* Sidebar */}
        <div className="w-1/4 min-h-screen border-r border-gray-300">
          <CarsCategorySideBar />
          <br />
          <CategorySideBar />
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-4">
          <h1 className="text-2xl font-bold mb-4">Motorcycle and Tricycle:</h1>

          {/* Car Logos Grid */}
          <div className="grid grid-cols-4 md:grid-cols-3 gap-6">
            {MotorcycleAndTricycleLogo.map((bike, index) => (
              <Link
                to={bike.link}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={bike.logo}
                    alt={bike.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="mt-2 text-gray-700 font-medium hover:text-blue-600 transition duration-300">
                  {bike.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Cars for Sale Grid */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            Available Motorcycle and Tricycle:
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {bikesforSale.map((bike, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`${bike.link}`)}
              >
                {/* Car Image */}
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={bike.image}
                    alt={bike.brand}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Car Details */}
                <div className="bg-white p-3 ">
                  <p className="text-lg font-bold text-blue-600">{bike.price}</p>
                  <p className="text-gray-800 font-semibold">{bike.brand}</p>
                  <p className="text-gray-600 text-sm">{bike.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Store: <span className="font-semibold">{bike.store}</span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Collection:{" "}
                    <span className="font-semibold">{bike.collection}</span>
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

export default MotorcycleAndTricycle;
