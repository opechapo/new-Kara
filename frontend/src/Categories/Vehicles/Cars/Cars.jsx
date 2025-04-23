import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../Layouts/Header";
import CarsCategorySideBar from "../../../Layouts/Pages/CarsCategorySideBar";
import CategorySideBar from "../../../Layouts/CategorySideBar";
import Footer from "../../../Layouts/Footer";
import toyotaLogo from "../../../assets/toyotaLogo.png";
import mercedesLogo from "../../../assets/mercedesLogo.png";
import roverLogo from "../../../assets/roverLogo.png";
import mercedesGwagon from "../../../assets/mercedesGwagon.png";
import toyotaYaris from "../../../assets/toyotaYaris.png";
import landRover from "../../../assets/landRover.png";
import lexusJeep from "../../../assets/lexusJeep.png";
import toyotaCivic from "../../../assets/toyotaCivic.png";
import teslaModel from "../../../assets/tesla.png";

const carBrands = [
  { name: "Toyota", logo: toyotaLogo, link: "/cars/toyota" },
  { name: "Mercedes Benz", logo: mercedesLogo, link: "/cars/mercedes" },
  { name: "Rover", logo: roverLogo, link: "/cars/rover" },
  // { name: "BMW", logo: bmwLogo, link: "/cars/bmw" },
  // { name: "Ferarri", logo: ferarriLogo, link: "/cars/ferarri" },
  // { name: "Tesla", logo: teslaLogo, link: "/cars/tesla" },
];

const carsForSale = [
  {
    id: "mercedes-gwagon",
    image: mercedesGwagon,
    price: "2.5 ETH",
    brand: "Mercedes G-Wagon",
    description: "Luxury off-road SUV with V8 engine.",
    store: "Cubanna Autos",
    collection: "Luxury Vehicles",
    link: "/MercedesGwagon",
  },
  {
    id: "toyota-yaris",
    image: toyotaYaris,
    price: "1.2 ETH",
    brand: "Toyota Yaris",
    description: "Compact and fuel-efficient city car.",
    store: "Toyota Hub",
    collection: "Economy Cars",
  },
  {
    id: "land-rover",
    image: landRover,
    price: "3.0 ETH",
    brand: "Land Rover Defender",
    description: "Rugged SUV for all terrains.",
    store: "4x4 Dealership",
    collection: "Adventure Vehicles",
  },
  {
    id: "lexus-jeep",
    image: lexusJeep,
    price: "2.0 ETH",
    brand: "Lexus RX 350",
    description: "Luxury crossover with smooth handling.",
    store: "Lexus Center",
    collection: "Premium SUVs",
  },
  {
    id: "toyota-civic",
    image: toyotaCivic,
    price: "1.5 ETH",
    brand: "Toyota Civic",
    description: "Reliable and stylish sedan.",
    store: "Honda-Toyota Deals",
    collection: "Sedans & Coupes",
  },
  {
    id: "tesla-model-s",
    image: teslaModel,
    price: "4.5 ETH",
    brand: "Tesla Model S",
    description: "Electric sedan with autopilot features.",
    store: "Tesla Store",
    collection: "Electric Vehicles",
  },
];

const Cars = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="flex min-h-screen px-3 py-4 mt-16">
        {/* Sidebar */}
        <div className="w-1/4 min-h-screen border-r border-gray-300">
          <CarsCategorySideBar />
          <br />
          <CategorySideBar />
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-4">
          <h1 className="text-2xl font-bold mb-4">Cars:</h1>

          {/* Car Logos Grid */}
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {carBrands.map((car, index) => (
              <Link
                to={car.link}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={car.logo}
                    alt={car.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="mt-2 text-gray-700 font-medium hover:text-blue-600 transition duration-300">
                  {car.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Cars for Sale Grid */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Available Cars:</h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {carsForSale.map((car, index) => (
              <div
                key={index}
                className="bg-gray-100  rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`${car.link}`)}
              >
                {/* Car Image */}
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={car.image}
                    alt={car.brand}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Car Details */}
                <div className="bg-white p-3 ">
                  <p className="text-lg font-bold text-blue-600">{car.price}</p>
                  <p className="text-gray-800 font-semibold">{car.brand}</p>
                  <p className="text-gray-600 text-sm">{car.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Store: <span className="font-semibold">{car.store}</span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Collection:{" "}
                    <span className="font-semibold">{car.collection}</span>
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

export default Cars;
