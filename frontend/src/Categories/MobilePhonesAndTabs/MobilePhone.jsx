import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Layouts/Header";
import MobilePhoneCategorySideBar from "../../Layouts/Pages/MobilePhoneCategorySideBar";
import CategorySideBar from "../../Layouts/CategorySideBar";
import Footer from "../../Layouts/Footer";
import appleLogo from "../../assets/appleLogo.png"; 
import samsungLogo from "../../assets/samsungLogo.png"; 
import xiaomiLogo from "../../assets/xiaomiLogo.png"; 
import googleLogo from "../../assets/googleLogo.png"; 
import applePhone from "../../assets/applePhone.webp"; 
import samsungPhone from "../../assets/samsungPhone.webp"; 
import xiaomiPhone from "../../assets/xiaomiPhone.webp"; 
import googlePhone from "../../assets/googlePhone.webp"; 


const phoneBrands = [
  { name: "Apple", logo: appleLogo, link: "#" },
  { name: "Samsung", logo: samsungLogo, link: "#" },
  { name: "Xiaomi", logo: xiaomiLogo, link: "#" },
  { name: "Google", logo: googleLogo, link: "#" },
];

const phoneForSale = [
  {
    id: "applePhone",
    image: applePhone,
    price: "2.5 ETH",
    brand: "iPhone 15 Pro Max",
    description: "Apple's flagship smartphone featuring an A17 Pro chip, 48MP camera, and a titanium body for durability and style.",
    store: "Apple Store",
    collection: "Premium Smartphones",
    link: "/iphone15ProMax",
  },
  {
    id: "samsungPhone",
    image: samsungPhone,
    price: "1.2 ETH",
    brand: "Samsung Galaxy S24 Ultra",
    description: "A high-performance smartphone with a 200MP camera, Snapdragon 8 Gen 3 processor, and S-Pen support.",
    store: "Samsung Hub",
    collection: "Flagship Android Phones",
    link: "/samsungS24Ultra",
  },
  {
    id: "xiaomiPhone",
    image: xiaomiPhone,
    price: "3.0 ETH",
    brand: "Xiaomi 14 Pro",
    description: "A cutting-edge device with a 1-inch Leica camera sensor, ultra-fast charging, and a stunning AMOLED display.",
    store: "Xiaomi Official",
    collection: "High-End Smartphones",
    link: "/xiaomi14Pro",
  },
  {
    id: "googlePhone",
    image: googlePhone,
    price: "2.0 ETH",
    brand: "Google Pixel 8 Pro",
    description: "Google's AI-powered smartphone with a Tensor G3 chip, top-tier computational photography, and pure Android experience.",
    store: "Google Store",
    collection: "AI-Enhanced Phones",
    link: "/googlePixel8Pro",
  }
];


const mobilePhones = () => {
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
          <h1 className="text-2xl font-bold mb-4">Phones:</h1>

          {/* Car Logos Grid */}
          <div className="grid grid-cols-4 md:grid-cols-3 gap-6">
            {phoneBrands.map((phone, index) => (
              <Link
                to={phone.link}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={phone.logo}
                    alt={phone.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="mt-2 text-gray-700 font-medium hover:text-blue-600 transition duration-300">
                  {phone.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Cars for Sale Grid */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Available Phones:</h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {phoneForSale.map((phone, index) => (
              <div
                key={index}
                className="bg-gray-100  rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`${phone.link}`)}
              >
                {/* Car Image */}
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={phone.image}
                    alt={phone.brand}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Car Details */}
                <div className="bg-white p-3 ">
                  <p className="text-lg font-bold text-blue-600">{phone.price}</p>
                  <p className="text-gray-800 font-semibold">{phone.brand}</p>
                  <p className="text-gray-600 text-sm">{phone.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Store: <span className="font-semibold">{phone.store}</span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Collection:{" "}
                    <span className="font-semibold">{phone.collection}</span>
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

export default mobilePhones;
