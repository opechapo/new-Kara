import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../Layouts/Header";
import CarsCategorySideBar from "../../../Layouts/Pages/CarsCategorySideBar";
import CategorySideBar from "../../../Layouts/CategorySideBar";
import Footer from "../../../Layouts/Footer";
import toyotaLogo from "../../../assets/toyotaLogo.png";
import mercedesLogo from "../../../assets/mercedesLogo.png";
import VolksLogo from "../../../assets/VolksLogo.png";
import FordLogo from "../../../assets/FordLogo.png";
import toyotaBus from "../../../assets/toyotaBus.png";
import mercedesBus from "../../../assets/mercedesBus.png";
import fordMiniBus from "../../../assets/fordMiniBus.png";
import volksMiniBus from "../../../assets/volksMiniBus.png";
import volksBus from "../../../assets/volksBus.png";

const carBrands = [
  { name: "Toyota", logo: toyotaLogo, link: "/cars/toyota" },
  { name: "Mercedes Benz", logo: mercedesLogo, link: "/cars/mercedes" },
  { name: "Volkswagen", logo: VolksLogo, link: "/cars/volks" },
  { name: "Ford", logo: FordLogo, link: "/cars/ford" },
];

const carsForSale = [
  {
    id: "toyotaBus",
    image: toyotaBus,
    price: "2.5 ETH",
    brand: "Toyota HiAce",
    description:
      "Reliable and spacious minibus ideal for commercial transport.",
    store: "Toyota Hub",
    collection: "Passenger Vans",
    link: "/toyotaHiAce",
  },
  {
    id: "mercedesBus",
    image: mercedesBus,
    price: "3.2 ETH",
    brand: "Mercedes-Benz Sprinter",
    description:
      "Premium van with advanced safety features and comfortable seating.",
    store: "Mercedes AutoWorld",
    collection: "Luxury Transport",
  },
  {
    id: "volksMiniBus",
    image: volksMiniBus,
    price: "2.8 ETH",
    brand: "Volkswagen Transporter",
    description: "Versatile and fuel-efficient van with modern design.",
    store: "Volkswagen Center",
    collection: "Business Vehicles",
  },
  {
    id: "volksBus",
    image: volksBus,
    price: "2.0 ETH",
    brand: "Volkswagen Crafter",
    description: "Spacious and powerful van perfect for logistics and travel.",
    store: "Volkswagen Center",
    collection: "Commercial Vans",
  },
  {
    id: "fordMiniBus",
    image: fordMiniBus,
    price: "1.9 ETH",
    brand: "Ford Transit",
    description:
      "Highly adaptable van with impressive cargo and passenger capacity.",
    store: "Ford Auto Dealers",
    collection: "Multi-Purpose Vans",
  },
];

const BusAndMinibus = () => {
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
          <h1 className="text-2xl font-bold mb-4">Bus and MiniBus:</h1>

          {/* Car Logos Grid */}
          <div className="grid grid-cols-4 md:grid-cols-3 gap-6">
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
          <h2 className="text-2xl font-bold mt-8 mb-4">
            Available Bus and Minibus:
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {carsForSale.map((car, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
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

export default BusAndMinibus;
