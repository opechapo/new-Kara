import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Layouts/Header";
import MobilePhoneCategorySideBar from "../../Layouts/Pages/MobilePhoneCategorySideBar";
import CategorySideBar from "../../Layouts/CategorySideBar";
import Footer from "../../Layouts/Footer";
import appleLogo from "./../../assets/appleLogo.png";
import samsungLogo from "../../assets/samsungLogo.png";
import xiaomiLogo from "../../assets/xiaomiLogo.png";
import atouchLogo from "../../assets/atouchLogo.png";
import appleTablet from "../../assets/appleTablet.webp";
import samsungTablet from "../../assets/samsungTablet.webp";
import atouchTablet from "../../assets/atouchTablet.webp";
import xiaomiTablet from "../../assets/xiaomiTablet.webp";

const tabletsBrands = [
  { name: "Apple", logo: appleLogo, link: "#" },
  { name: "Samsung", logo: samsungLogo, link: "#" },
  { name: "Atouch", logo: atouchLogo, link: "#" },
  { name: "Xiaomi", logo: xiaomiLogo, link: "#" },
];

const tabletsForSale = [
  {
    id: "appleTablet",
    image: appleTablet,
    price: "2.5 ETH",
    brand: "iPad Pro M2",
    description:
      "Apple's most advanced tablet with an M2 chip, Liquid Retina XDR display, and Apple Pencil hover feature for creative professionals.",
    store: "Apple Store",
    collection: "Premium Tablets",
    link: "/ipadProM2",
  },
  {
    id: "samsungTablet",
    image: samsungTablet,
    price: "1.2 ETH",
    brand: "Samsung Galaxy Tab S9 Ultra",
    description:
      "A powerhouse Android tablet with a Snapdragon 8 Gen 2 chip, S Pen support, and an expansive AMOLED display.",
    store: "Samsung Hub",
    collection: "Flagship Android Tablets",
    link: "/samsungTabS9Ultra",
  },
  {
    id: "atouchTablet",
    image: atouchTablet,
    price: "2.0 ETH",
    brand: "A Touch X10 Pro",
    description:
      "A budget-friendly tablet designed for students and professionals, featuring a large display and smooth performance.",
    store: "A Touch Store",
    collection: "Affordable Tablets",
    link: "/atouchX10Pro",
  },
  {
    id: "xiaomiTablet",
    image: xiaomiTablet,
    price: "3.0 ETH",
    brand: "Xiaomi Pad 6 Pro",
    description:
      "A high-performance tablet with a Snapdragon 8+ Gen 1 chip, 144Hz refresh rate, and a sleek metal design.",
    store: "Xiaomi Official",
    collection: "High-End Tablets",
    link: "/xiaomiPad6Pro",
  },
];

const Tablets = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="flex min-h-screen px-3 py-4 mt-16">
        {/* Sidebar */}
        <div className="w-1/4 min-h-screen border-r border-gray-300">
          <MobilePhoneCategorySideBar />
          <br />
          <CategorySideBar />
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-4">
          <h1 className="text-2xl font-bold mb-4">Tablets:</h1>

          {/* Car Logos Grid */}
          <div className="grid grid-cols-4 md:grid-cols-3 gap-6">
            {tabletsBrands.map((tablet, index) => (
              <Link
                to={tablet.link}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={tablet.logo}
                    alt={tablet.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="mt-2 text-gray-700 font-medium hover:text-blue-600 transition duration-300">
                  {tablet.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Cars for Sale Grid */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Available Tablets:</h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {tabletsForSale.map((tablet, index) => (
              <div
                key={index}
                className="bg-gray-100  rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`${tablet.link}`)}
              >
                {/* Car Image */}
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={tablet.image}
                    alt={tablet.brand}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Car Details */}
                <div className="bg-white p-3 ">
                  <p className="text-lg font-bold text-blue-600">
                    {tablet.price}
                  </p>
                  <p className="text-gray-800 font-semibold">{tablet.brand}</p>
                  <p className="text-gray-600 text-sm">{tablet.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Store: <span className="font-semibold">{tablet.store}</span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Collection:{" "}
                    <span className="font-semibold">{tablet.collection}</span>
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

export default Tablets;
