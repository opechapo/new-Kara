import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../Layouts/Header";
import CarsCategorySideBar from "../../../Layouts/Pages/CarsCategorySideBar";
import CategorySideBar from "../../../Layouts/CategorySideBar";
import Footer from "../../../Layouts/Footer";
import toyotaLogo from "../../../assets/ToyotaLogo.png";
import manLogo from "../../../assets/manLogo.png";
import mackLogo from "../../../assets/mackLogo.png";
import toyotaTrailer from "../../../assets/toyotaTrailer.webp";
import manTruck from "../../../assets/manTruck.webp";
import mackTrailer from "../../../assets/mackTrailer.webp";



const TruckAndTrailerLogo = [
  { name: "Toyota", logo: toyotaLogo, link: "#" },
  { name: "Man", logo: manLogo, link: "#" },
  { name: "Mack", logo: mackLogo, link: "#" },
];

const truckforSale = [
  {
    id: "toyotaTrailer",
    image: toyotaTrailer,
    price: "2.5 ETH",
    brand: "Toyota Hino 700",
    description:
      "A heavy-duty trailer truck built for high-performance logistics and cargo transport.",
    store: "Toyota Trucks Hub",
    collection: "Heavy-Duty Trailers",
    link: "/toyotaHino700",
  },
  {
    id: "manTruck",
    image: manTruck,
    price: "3.2 ETH",
    brand: "MAN TGS 18.440",
    description:
      "A high-performance truck designed for long-haul freight with superior fuel efficiency.",
    store: "MAN Trucks Center",
    collection: "Long-Haul Trucks",
    link: "/manTGS18440",
  },
  {
    id: "mackTruck",
    image: mackTrailer,
    price: "2.8 ETH",
    brand: "Mack Anthem",
    description:
      "A powerful and rugged truck built for durability and heavy cargo transportation.",
    store: "Mack Trucks Hub",
    collection: "Commercial Trucks",
    link: "/mackAnthem",
  },
];



const TruckAndTrailer = () => {
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
          <h1 className="text-2xl font-bold mb-4">Truck and Trailer:</h1>

          {/* Trucks Logos Grid */}
          <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
            {TruckAndTrailerLogo.map((truck, index) => (
              <Link
                to={truck.link}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={truck.logo}
                    alt={truck.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="mt-2 text-gray-700 font-medium hover:text-blue-600 transition duration-300">
                  {truck.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Trucks for Sale Grid */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            Available Truck and Trailer:
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {truckforSale.map((truck, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`${truck.link}`)}
              >
                {/* Truck Image */}
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={truck.image}
                    alt={truck.brand}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>


                {/* truck Details */}
                <div className="bg-white p-3 ">
                  <p className="text-lg font-bold text-blue-600">{truck.price}</p>
                  <p className="text-gray-800 font-semibold">{truck.brand}</p>
                  <p className="text-gray-600 text-sm">{truck.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Store: <span className="font-semibold">{truck.store}</span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Collection:{" "}
                    <span className="font-semibold">{truck.collection}</span>
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

export default TruckAndTrailer;
