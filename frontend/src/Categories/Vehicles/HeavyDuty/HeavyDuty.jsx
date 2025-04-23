import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../Layouts/Header";
import CarsCategorySideBar from "../../../Layouts/Pages/CarsCategorySideBar";
import CategorySideBar from "../../../Layouts/CategorySideBar";
import Footer from "../../../Layouts/Footer";
import excavatorsLogo from "../../../assets/excavatorsLogo.png";
import forkliftsLogo from "../../../assets/forkliftsLogo.png";
import cranesLogo from "../../../assets/cranesLogo.png";
import tractorsLogo from "../../../assets/tractorsLogo.png";
import excavators from "../../../assets/excavators.webp";
import forklifts from "../../../assets/forklifts.webp";
import cranes from "../../../assets/cranes.webp";
import tractors from "../../../assets/tractors.webp";




const heavydutyLogo = [
  { name: "Excavators", logo: excavatorsLogo, link: "#" },
  { name: "Forklifts", logo: forkliftsLogo, link: "#" },
  { name: "Cranes", logo: cranesLogo, link: "#" },
  { name: "Tractors", logo: tractorsLogo, link: "#" }
];

const heavydutyforSale = [
  {
    id: "forklifts",
    image: forklifts,
    price: "2.5 ETH",
    brand: "Toyota 8FGU25 Forklift",
    description:
      "A reliable and efficient forklift designed for warehouse operations, offering excellent lifting capacity and maneuverability.",
    store: "Toyota Equipment Hub",
    collection: "Industrial Forklifts",
    link: "/toyota8FGU25",
  },
  {
    id: "excavators",
    image: excavators,
    price: "3.2 ETH",
    brand: "Caterpillar 320 Excavator",
    description:
      "A powerful hydraulic excavator built for heavy construction, mining, and earthmoving applications with advanced fuel efficiency.",
    store: "Caterpillar Machinery",
    collection: "Construction Equipment",
    link: "/caterpillar320",
  },
  {
    id: "tractors",
    image: tractors,
    price: "2.8 ETH",
    brand: "John Deere 5050D Tractor",
    description:
      "A versatile and durable agricultural tractor ideal for plowing, tilling, and other farming operations.",
    store: "John Deere Agriculture",
    collection: "Farming Machinery",
    link: "/johnDeere5050D",
  },
  {
    id: "cranes",
    image: cranes,
    price: "4.0 ETH",
    brand: "Liebherr LTM 1055-3.1 Crane",
    description:
      "A high-performance mobile crane with superior lifting capabilities for construction and heavy lifting projects.",
    store: "Liebherr Heavy Equipment",
    collection: "Construction Cranes",
    link: "/liebherrLTM1055",
  },
];




const HeavyDuty = () => {
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
          <h1 className="text-2xl font-bold mb-4">Heavy Equipments:</h1>

          {/* Trucks Logos Grid */}
          <div className="grid grid-cols-4 md:grid-cols-3 gap-4">
            {heavydutyLogo.map((heavyduty, index) => (
              <Link
                to={heavyduty.link}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={heavyduty.logo}
                    alt={heavyduty.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="mt-2 text-gray-700 font-medium hover:text-blue-600 transition duration-300">
                  {heavyduty.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Trucks for Sale Grid */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            Available Heavy Equipments:
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {heavydutyforSale.map((heavyduty, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`${heavyduty.link}`)}
              >
                {/* Truck Image */}
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={heavyduty.image}
                    alt={heavyduty.brand}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>


                {/* truck Details */}
                <div className="bg-white p-3 ">
                  <p className="text-lg font-bold text-blue-600">{heavyduty.price}</p>
                  <p className="text-gray-800 font-semibold">{heavyduty.brand}</p>
                  <p className="text-gray-600 text-sm">{heavyduty.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Store: <span className="font-semibold">{heavyduty.store}</span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Collection:{" "}
                    <span className="font-semibold">{heavyduty.collection}</span>
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

export default HeavyDuty;
