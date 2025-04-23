import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const mobilePhoneCategories = [
  { name: "Mobile Phones", link: "/mobilephone" },
  { name: "Tablets", link: "/tablets" },
  { name: "Smart Watch", link: "/smartwatch" },
  { name: "Accesories for Phone and Tablets", link: "/phoneandtabaccesories" },
];

const MobilePhoneCategorySideBar = () => {
  return (
    <div className="w-64 bg-white shadow-lg rounded-lg p-4">
      {/* Categories Header */}
      <h2 className="text-xl font-bold text-white bg-purple-900 p-2 rounded-md text-center ">
        Categories
      </h2>

      {/* Subheader */}
      <h3 className="text-lg font-semibold text-gray-700 mt-4">Mobile Phones & Tablets:</h3>

      {/* Category List */}
      <ul className="mt-2 space-y-2">
        {mobilePhoneCategories.map((category, index) => (
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

export default MobilePhoneCategorySideBar;
