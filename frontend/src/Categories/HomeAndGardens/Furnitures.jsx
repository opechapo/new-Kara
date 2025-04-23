import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./../../Layouts/Header";
import HomeAndGardenSideBar from "./../../Layouts/Pages/HomeAndGardenSideBar";
import CategorySideBar from "./../../Layouts/CategorySideBar";
import Footer from "./../../Layouts/Footer";
import chairsLogo from "./../../assets/chairsLogo.png";
import tablesLogo from "./../../assets/tablesLogo.png";
import sofasLogo from "./../../assets/sofasLogo.png";
import bedsAndBedFramesLogo from "./../../assets/bedsAndBedFramesLogo.png";
import chair from "./../../assets/chair.webp";
import table from "./../../assets/table.webp";
import sofa from "./../../assets/sofa.webp";
import bedAndBedFrame from "./../../assets/bedAndBedFrame.webp";


const furnuturetypes = [
  { name: "Chairs", logo: chairsLogo, link: "/cars/toyota" },
  { name: "Tables", logo: tablesLogo, link: "/cars/mercedes" },
  { name: "Sofas", logo: sofasLogo, link: "/cars/volks" },
  { name: "Beds and Bed Frames", logo: bedsAndBedFramesLogo, link: "/cars/ford" },
];

const furnituresForSale = [
  {
    id: "chair",
    image: chair,
    price: "2.5 ETH",
    brand: "Luxury Leather Chair",
    description: "Elegant and ergonomic leather chair for home or office use.",
    store: "Comfort Seating",
    collection: "Office & Home Chairs",
    link: "/luxuryLeatherChair",
  },
  {
    id: "table",
    image: table,
    price: "3.2 ETH",
    brand: "Modern Wooden Dining Table",
    description: "Spacious wooden dining table with a sleek contemporary finish.",
    store: "Furniture Hub",
    collection: "Dining Room Furniture",
  },
  {
    id: "sofa",
    image: sofa,
    price: "2.8 ETH",
    brand: "Premium 3-Seater Sofa",
    description: "Comfortable and stylish 3-seater fabric sofa with soft cushions.",
    store: "Cozy Living",
    collection: "Living Room Essentials",
  },
  {
    id: "bedAndBedFrame",
    image: bedAndBedFrame,
    price: "2.0 ETH",
    brand: "King-Size Wooden Bed Frame",
    description: "Sturdy and elegant king-size bed frame with a modern touch.",
    store: "Dream Beds",
    collection: "Bedroom Furniture",
  },
];


const Furnitures = () => {
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
          <h1 className="text-2xl font-bold mb-4">Furnitures:</h1>

          {/* Car Logos Grid */}
          <div className="grid grid-cols-4 md:grid-cols-3 gap-6">
            {furnuturetypes.map((furniture, index) => (
              <Link
                to={furniture.link}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={furniture.logo}
                    alt={furniture.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="mt-2 text-gray-700 font-medium hover:text-blue-600 transition duration-300">
                  {furniture.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Cars for Sale Grid */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            Available Furnitures:
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {furnituresForSale.map((furniture, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`${furniture.link}`)}
              >
                {/* Car Image */}
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={furniture.image}
                    alt={furniture.brand}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Car Details */}
                <div className="bg-white p-3 ">
                  <p className="text-lg font-bold text-blue-600">{furniture.price}</p>
                  <p className="text-gray-800 font-semibold">{furniture.brand}</p>
                  <p className="text-gray-600 text-sm">{furniture.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Store: <span className="font-semibold">{furniture.store}</span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Collection:{" "}
                    <span className="font-semibold">{furniture.collection}</span>
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

export default Furnitures;
