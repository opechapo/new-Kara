import React, { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaShoppingCart,
  FaComments,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import mercedesGwagon1 from "../../../assets/Gwagon1.png";
import mercedesGwagon2 from "../../../assets/Gwagon2.png";
import mercedesGwagon3 from "../../../assets/Gwagon3.png";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Footer from "../../../Layouts/Footer";
import { Link } from "react-router-dom";
import Header from "../../../Layouts/Header";

const images = [mercedesGwagon1, mercedesGwagon2, mercedesGwagon3];

const MercedesGwagon = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Header*/}
      <div className="mt-12">
        <Header />
      </div>
      <div className="min-h-screen flex items-center justify-center p-8 bg-gray-100">
      

        <div className="bg-white shadow-lg rounded-lg flex w-full max-w-5xl p-6">
          {/* Image Section */}
          <div className="w-2/3 relative">
            <img
              src={images[currentImage]}
              alt="Mercedes G-Wagon"
              className="w-full h-[400px] object-cover rounded-lg"
            />

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:opacity-20 text-white p-2 rounded-full cursor-pointer"
            >
              <FaArrowLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:opacity-20 text-white p-2 rounded-full cursor-pointer"
            >
              <FaArrowRight size={20} />
            </button>

            {/* Vehicle Description */}
            <div className="p-4  rounded-lg">
              <p className="text-gray-600 mt-1">
                The Mercedes G-Wagon is an iconic luxury SUV known for its
                rugged durability and powerful V8 engine. It features a high-end
                interior with state-of-the-art technology, advanced safety
                systems, and a design that blends elegance with off-road
                capability. Perfect for those who demand performance and style.
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="w-1/3 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold">Mercedes G-Wagon</h2>
              <p className="text-xl text-blue-600 font-semibold">2.5 ETH</p>
              <p className="text-gray-600">
                Luxury off-road SUV with V8 engine.
              </p>
              <Link>
                <p className="text-gray-500 mt-2 font-semibold">
                  Store: Cubanna Autos
                </p>
              </Link>
              <hr className="my-4" />

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1 bg-gray-300 text-black rounded cursor-pointer"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-1 bg-gray-300 text-black rounded cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => navigate("/deal")}
                  className="flex-1 bg-purple-900 text-white py-2 rounded-lg text-center font-semibold cursor-pointer"
                >
                  Trade
                </button>
                <button
                  onClick={() => navigate("/chat")}
                  className="bg-gray-300 p-3 rounded-lg cursor-pointer"
                >
                  <FaComments size={20} />
                </button>
                <button
                  onClick={() => navigate("/cart")}
                  className="bg-gray-300 p-3 rounded-lg cursor-pointer"
                >
                  <FaShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default MercedesGwagon;
