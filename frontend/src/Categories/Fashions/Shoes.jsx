import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Layouts/Header";
import FashionCategorySideBar from "../../Layouts/Pages/FashionCategorySideBar";
import CategorySideBar from "../../Layouts/CategorySideBar";
import Footer from "../../Layouts/Footer";
import bootsLogo from "./../../assets/bootsLogo.png";
import heelsLogo from "./../../assets/heelsLogo.png";
import sneakersLogo from "../../assets/sneakersLogo.png";
import boots from "../../assets/boots.webp";
import heel from "../../assets/heel.webp";
import sneakers from "../../assets/sneakers.webp";

const Shoestypes = [
  { name: "Boots", logo: bootsLogo, link: "#" },
  { name: "Heels", logo: heelsLogo, link: "#" },
  { name: "Sneakers", logo: sneakersLogo, link: "#" },
];

const ShoesForSale = [
  {
    id: "boots",
    image: boots,
    price: "1.8 ETH",
    brand: "Timberland Premium",
    description:
      "Durable and stylish leather boots designed for all-weather wear with a rugged sole for maximum traction.",
    store: "Timberland Outlet",
    collection: "Luxury Boots",
  },
  {
    id: "heel",
    image: heel,
    price: "2.2 ETH",
    brand: "Christian Louboutin So Kate",
    description:
      "Elegant high-heeled pumps with a sleek design and the signature red sole, perfect for any upscale occasion.",
    store: "Louboutin Boutique",
    collection: "Designer Heels",
  },
  {
    id: "sneakers",
    image: sneakers,
    price: "2.5 ETH",
    brand: "Nike Air Jordan 1 Retro High",
    description:
      "Classic high-top sneakers blending comfort and street style, featuring premium materials and bold colorways.",
    store: "Nike Sneaker Hub",
    collection: "Luxury Sneakers",
  },
];

const Shoes = () => {
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
          <h1 className="text-2xl font-bold mb-4">Shoes:</h1>

          {/* Watch Logos Grid */}
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {Shoestypes.map((Shoes, index) => (
              <Link
                to={Shoes.link}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={Shoes.logo}
                    alt={Shoes.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="mt-2 text-gray-700 font-medium hover:text-blue-600 transition duration-300">
                  {Shoes.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Watches for Sale Grid */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Available Shoes:</h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {ShoesForSale.map((Shoes, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`${Shoes.link}`)}
              >
                {/* Bag Image */}
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={Shoes.image}
                    alt={Shoes.brand}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Watches Details */}
                <div className="bg-white p-3 ">
                  <p className="text-lg font-bold text-blue-600">
                    {Shoes.price}
                  </p>
                  <p className="text-gray-800 font-semibold">{Shoes.brand}</p>
                  <p className="text-gray-600 text-sm">{Shoes.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Store: <span className="font-semibold">{Shoes.store}</span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Collection:{" "}
                    <span className="font-semibold">{Shoes.collection}</span>
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

export default Shoes;
