import React, { useState, useEffect } from "react";
import { FaLaptop, FaMobileAlt, FaHome, FaTshirt, FaCar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const iconMap = {
  "Electronics": <FaLaptop />,
  "Mobile Phones & Tabs": <FaMobileAlt />,
  "Vehicles": <FaCar />,
  "Fashion": <FaTshirt />,
  "Home & Gardens": <FaHome />,
};

const CategorySideBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categories', {
          credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch categories');
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err.message);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-64 bg-white shadow-md rounded-lg p-4">
      <ul className="space-y-3">
        {categories.map((category, index) => (
          <li key={index} className="rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <Link to={category.link} className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 text-lg">{iconMap[category.name] || <FaLaptop />}</span>
                <span className="text-gray-600 font-medium">{category.name}</span>
              </div>
              <IoIosArrowForward className="text-gray-500" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySideBar;