import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ElectronicsCategories = [
  { name: "Audio and Music Instuments", link: "/electronics/audioandmusicinstrument" },
  { name: "Laptops and Computers", link: "/electronics/clothings" },
  { name: "Televisions and Projectors", link: "/electronics/shoes" },
  { name: "Cameras", link: "/electronics/watches" },
  { name: "Printers and Scanners", link: "/electronics/watches" },
  { name: "Video Games and COnsole", link: "/electronics/watches" },
];

const ElectronicsCategorySideBar = () => {
  return (
    <div className="w-64 bg-white shadow-lg rounded-lg p-4">
      {/* Categories Header */}
      <h2 className="text-xl font-bold text-white bg-purple-900 p-2 rounded-md text-center ">
        Categories
      </h2>

      {/* Subheader */}
      <h3 className="text-lg font-semibold text-gray-700 mt-4">Electronics:</h3>

      {/* Category List */}
      <ul className="mt-2 space-y-2">
        {ElectronicsCategories.map((category, index) => (
          <li key={index}>
            <Link
              to={category.link}
              className="flex justify-between items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 transition"
            >
              <span className="text-gray-700 font-medium">{category.name}</span>
              <ChevronRight size={20} className="text-gray-500" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ElectronicsCategorySideBar;
