import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./../../Layouts/Header";
import FashionCategorySideBar from "./../../Layouts/Pages/FashionCategorySideBar";
import CategorySideBar from "./../../Layouts/CategorySideBar";
import Footer from "./../../Layouts/Footer";
import dressesLogo from "./../../assets/dressesLogo.png";
import shirtsLogo from "./../../assets/shirtsLogo.png";
import tshirtsLogo from "./../../assets/tshirtsLogo.png";
import jeansLogo from "./../../assets/jeansLogo.png";
import dress from "./../../assets/dress.webp";
import shirt from "./../../assets/shirt.webp";
import tshirt from "./../../assets/shirt.webp";
import jean from "./../../assets/jean.webp";




const Clothingstypes = [
  { name: "Dresses", logo: dressesLogo, link: "#" },
  { name: "Shirts", logo: shirtsLogo, link: "#" },
  { name: "Tshirts", logo: tshirtsLogo, link: "#" },
  { name: "Jeans", logo: jeansLogo, link: "#" },
];

const ClothingsForSale = [
  {
    id: "dress",
    image: dress,
    price: "2.5 ETH",
    brand: "Elegant Evening Dress",
    description: "Stylish and comfortable evening dress with a sleek, modern fit.",
    store: "Fashion Forward",
    collection: "Women's Wear",
    link: "/elegantEveningDress",
  },
  {
    id: "shirt",
    image: shirt,
    price: "3.2 ETH",
    brand: "Classic Formal Shirt",
    description: "Premium cotton formal shirt, perfect for office and business meetings.",
    store: "Gentlemen's Closet",
    collection: "Men's Wear",
  },
  {
    id: "tshirt",
    image: tshirt,
    price: "2.8 ETH",
    brand: "Casual Graphic T-Shirt",
    description: "Soft and breathable cotton t-shirt with trendy graphic designs.",
    store: "Urban Styles",
    collection: "Casual Wear",
  },
  {
    id: "jean",
    image: jean,
    price: "2.0 ETH",
    brand: "Slim Fit Denim Jeans",
    description: "High-quality denim jeans with a slim fit and comfortable stretch.",
    store: "Denim Hub",
    collection: "Denim & Jeans",
  },
];




const Clothings = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="flex min-h-screen px-6 py-4 mt-16">
        {/* Sidebar */}
        <div className="w-1/4 min-h-screen border-r border-gray-300">
          <FashionCategorySideBar />
          <br />
          <CategorySideBar />
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-4">
          <h1 className="text-2xl font-bold mb-4">Clothings:</h1>

          {/* Bag Logos Grid */}
          <div className="grid grid-cols-4 md:grid-cols-3 gap-6">
            {Clothingstypes.map((clothing, index) => (
              <Link
                to={clothing.link}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={clothing.logo}
                    alt={clothing.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="mt-2 text-gray-700 font-medium hover:text-blue-600 transition duration-300">
                  {clothing.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Bags for Sale Grid */}
          <h2 className="text-2xl font-bold mt-8 mb-4">
            Available Clothings:
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {ClothingsForSale.map((clothing, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`${clothing.link}`)}
              >
                {/* Bag Image */}
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={clothing.image}
                    alt={clothing.brand}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Bag Details */}
                <div className="bg-white p-3 ">
                  <p className="text-lg font-bold text-blue-600">{clothing.price}</p>
                  <p className="text-gray-800 font-semibold">{clothing.brand}</p>
                  <p className="text-gray-600 text-sm">{clothing.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Store: <span className="font-semibold">{clothing.store}</span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Collection:{" "}
                    <span className="font-semibold">{clothing.collection}</span>
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

export default Clothings;
