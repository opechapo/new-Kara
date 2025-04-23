import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Layouts/Header";
import HomeAndGardenSideBar from "../../Layouts/Pages/HomeAndGardenSideBar";
import CategorySideBar from "../../Layouts/CategorySideBar";
import Footer from "../../Layouts/Footer";
import fansLogo from "./../../assets/fansLogo.png";
import airConditionersLogo from "./../../assets/airConditionersLogo.png";
import washingMachineLogo from "./../../assets/washingMachineLogo.png";
import vacuumCleanerLogo from "../../assets/vacuumCleanersLogo.png";
import fan from "./../../assets/fan.webp";
import airConditioner from "./../../assets/airConditioner.webp";
import washingMachine from "./../../assets/washingMachine.webp";
import vacuumCleaner from "./../../assets/vacuumCleaner.webp";

const HomeAppliancetypes = [
  { name: "Fans", logo: fansLogo, link: "/cars/toyota" },
  {
    name: "Air Conditioners",
    logo: airConditionersLogo,
    link: "/cars/mercedes",
  },
  { name: "Washing Machine", logo: washingMachineLogo, link: "/cars/volks" },
  { name: "Vacuum Cleaners", logo: vacuumCleanerLogo, link: "/cars/ford" },
];

const HomeApplianceForSale = [
  {
    id: "fan",
    image: fan,
    price: "2.5 ETH",
    brand: "High-Speed Ceiling Fan",
    description:
      "Powerful and energy-efficient ceiling fan with adjustable speeds.",
    store: "Cool Breeze Appliances",
    collection: "Cooling & Ventilation",
    link: "/highSpeedCeilingFan",
  },
  {
    id: "airConditioner",
    image: airConditioner,
    price: "3.2 ETH",
    brand: "Smart Inverter Air Conditioner",
    description:
      "Energy-saving air conditioner with fast cooling and smart controls.",
    store: "Chill Zone",
    collection: "Cooling & Ventilation",
  },
  {
    id: "washingMachine",
    image: washingMachine,
    price: "2.8 ETH",
    brand: "Automatic Front-Load Washing Machine",
    description:
      "High-efficiency washing machine with multiple wash cycles and dryer function.",
    store: "Laundry Pro",
    collection: "Home Laundry Solutions",
  },
  {
    id: "vacuumCleaner",
    image: vacuumCleaner,
    price: "2.0 ETH",
    brand: "Cordless Smart Vacuum Cleaner",
    description:
      "Lightweight and powerful vacuum cleaner with HEPA filtration and long battery life.",
    store: "Clean Home Essentials",
    collection: "Cleaning Appliances",
  },
];

const HomeAppliance = () => {
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
          <h1 className="text-2xl font-bold mb-4">Home Appliances:</h1>

          {/* Car Logos Grid */}
          <div className="grid grid-cols-4 md:grid-cols-3 gap-6">
            {HomeAppliancetypes.map((HomeAppliance, index) => (
              <Link
                to={HomeAppliance.link}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={HomeAppliance.logo}
                    alt={HomeAppliance.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="mt-2 text-gray-700 font-medium hover:text-blue-600 transition duration-300">
                  {HomeAppliance.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Cars for Sale Grid */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            Available Home Appliances:
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {HomeApplianceForSale.map((HomeAppliance, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`${HomeAppliance.link}`)}
              >
                {/* Car Image */}
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={HomeAppliance.image}
                    alt={HomeAppliance.brand}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Car Details */}
                <div className="bg-white p-3 ">
                  <p className="text-lg font-bold text-blue-600">
                    {HomeAppliance.price}
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {HomeAppliance.brand}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {HomeAppliance.description}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    Store:{" "}
                    <span className="font-semibold">{HomeAppliance.store}</span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Collection:{" "}
                    <span className="font-semibold">
                      {HomeAppliance.collection}
                    </span>
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

export default HomeAppliance;
