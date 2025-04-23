import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-6">
        <p className="text-lg font-semibold">&copy; {new Date().getFullYear()} KARA . All rights reserved.</p>
        <nav className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
          <a href="#" className="hover:text-gray-400">Contact Us</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
