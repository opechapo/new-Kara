import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Layouts/Header";
import HomeAndGardenSideBar from "../../Layouts/Pages/HomeAndGardenSideBar";
import CategorySideBar from "../../Layouts/CategorySideBar";
import Footer from "../../Layouts/Footer";
import refrigeratorsLogo from "./../../assets/refrigeratorsLogo.png";
import cookersLogo from "./../../assets/cookersLogo.png";
import freezersLogo from "./../../assets/freezersLogo.png";
import blendersLogo from "./../../assets/freezersLogo.png";
import cooker from "./../../assets/cooker.webp";
import refrigerator from "./../../assets/refrigerator.webp";
import freezer from "./../../assets/freezer.webp";
import blender from "./../../assets/blender.webp";

const KitchenAppliancestypes = [
  { name: "Refrigerators", logo: refrigeratorsLogo, link: "/cars/toyota" },
  {
    name: "Cookers",
    logo: cookersLogo,
    link: "/cars/mercedes",
  },
  { name: "Freezers", logo: freezersLogo, link: "/cars/volks" },
  { name: "Blenders", logo: blendersLogo, link: "/cars/ford" },
];

const KitchenAppliancesForSale = [
  {
    id: "cooker",
    image: cooker,
    price: "2.5 ETH",
    brand: "High-Speed Ceiling Fan",
    description:
      "Powerful and energy-efficient ceiling fan with adjustable speeds.",
    store: "Cool Breeze Appliances",
    collection: "Cooling & Ventilation",
    link: "/highSpeedCeilingFan",
  },
  {
    id: "refrigerator",
    image: refrigerator,
    price: "3.2 ETH",
    brand: "Smart Inverter Air Conditioner",
    description:
      "Energy-saving air conditioner with fast cooling and smart controls.",
    store: "Chill Zone",
    collection: "Cooling & Ventilation",
  },
  {
    id: "freezer",
    image: freezer,
    price: "2.8 ETH",
    brand: "Automatic Front-Load Washing Machine",
    description:
      "High-efficiency washing machine with multiple wash cycles and dryer function.",
    store: "Laundry Pro",
    collection: "Home Laundry Solutions",
  },
  {
    id: "blender",
    image: blender,
    price: "2.0 ETH",
    brand: "Cordless Smart Vacuum Cleaner",
    description:
      "Lightweight and powerful vacuum cleaner with HEPA filtration and long battery life.",
    store: "Clean Home Essentials",
    collection: "Cleaning Appliances",
  },
];

const KitchenAppliances = () => {
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
          <h1 className="text-2xl font-bold mb-4">Kitchen Appliances:</h1>

          {/* Car Logos Grid */}
          <div className="grid grid-cols-4 md:grid-cols-3 gap-6">
            {KitchenAppliancestypes.map((KitchenAppliance, index) => (
              <Link
                to={KitchenAppliance.link}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={KitchenAppliance.logo}
                    alt={KitchenAppliance.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="mt-2 text-gray-700 font-medium hover:text-blue-600 transition duration-300">
                  {KitchenAppliance.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Cars for Sale Grid */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            Available Kitchen Appliances:
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {KitchenAppliancesForSale.map((KitchenAppliance, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`${KitchenAppliance.link}`)}
              >
                {/* Car Image */}
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={KitchenAppliance.image}
                    alt={KitchenAppliance.brand}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Car Details */}
                <div className="bg-white p-3 ">
                  <p className="text-lg font-bold text-blue-600">
                    {KitchenAppliance.price}
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {KitchenAppliance.brand}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {KitchenAppliance.description}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    Store:{" "}
                    <span className="font-semibold">
                      {KitchenAppliance.store}
                    </span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Collection:{" "}
                    <span className="font-semibold">
                      {KitchenAppliance.collection}
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

export default KitchenAppliances;
