import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import CubannaBackground from "../../assets/CubannaBackground.png";
import CubannaDisplayPicture from "../../assets/CubannaDisplayPicture.png";
import mercedesGwagon from "../../assets/mercedesGwagon.png";
import lexusJeep from "../../assets/lexusJeep.png";

const Cubannaautoscars = [
  {
    id: "mercedes-gwagon",
    image: mercedesGwagon,
    price: "2.5 ETH",
    brand: "Mercedes G-Wagon",
    description: "Luxury off-road SUV with V8 engine.",
    store: "Cubanna Autos",
    collection: "Luxury Vehicles",
    link: "/mercedesGwagon",
  },
  {
    id: "lexus-jeep",
    image: lexusJeep,
    price: "2.0 ETH",
    brand: "Lexus RX 350",
    description: "Luxury crossover with smooth handling.",
    store: "Cubanna Autos",
    collection: "Luxury Vehicles",
  },
];

const CubannaAutosStores = () => {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Background Section */}
      <div
        className="relative w-full h-[300px] bg-cover bg-center"
        style={{ backgroundImage: `url(${CubannaBackground})` }}
      >
        {/* Display Picture */}
        <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2">
          <img
            src={CubannaDisplayPicture}
            alt="Cubanna Display"
            className="w-44 h-44 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Store Header */}
      <div className="mt-16 text-center">
        <h1 className="text-2xl font-bold">Cubanna Autos</h1>
      </div>

      {/* Store Info */}
      <div className="mt-8 text-center">
        <div className="grid grid-cols-4 gap-4 text-lg font-semibold">
          <span>ID</span>
          <span>ORDERS</span>
          <span>PRODUCTS</span>
          <span>RATINGS</span>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-2 text-gray-700">
          <span>7</span>
          <span>4</span>
          <span>2</span>
          <span>5.0</span>
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="mt-6 border-t border-gray-300 w-full"></div>

      {/* Sales and Collections Section */}
      <div className="mt-6 flex justify-between px-6">
        <div>
          <h2 className="text-xl font-bold">On Sales in:</h2>
          <p className="text-lg text-gray-700">ETH</p>
          <h2 className="text-xl font-bold mt-4">Collections:</h2>
          <p className="text-lg text-gray-700">Luxury Vehicles</p>
        </div>
        <div>
          {/* Cars List */}
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {Cubannaautoscars.map((car, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
              >
                <Link to={car.link}>
                  {/* Car Image */}
                  <div className="w-full h-48 flex items-center justify-center">
                    <img
                      src={car.image}
                      alt={car.brand}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Car Details */}
                  <div className="bg-white p-3">
                    <p className="text-lg font-bold text-blue-600">
                      {car.price}
                    </p>
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
                </Link>
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

export default CubannaAutosStores;
