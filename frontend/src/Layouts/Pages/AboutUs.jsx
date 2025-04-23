import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import React from "react";
import Header from "../Header";
import Footer from "../Footer";

export default function AboutUs() {
  return (
   <>
   {/* Header */}
    <Header />
    <div className=" mt-16 max-w-4xl mx-auto p-6 relative">
      {/* Back Button */}
      <motion.button
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-200 transition"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => window.history.back()} // Navigates back
      >
        <ArrowLeft size={24} />
      </motion.button>

      <motion.h1
        className="text-4xl font-bold text-center mb-6 text-purple-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About KARA
      </motion.h1>
      <div className="shadow-lg p-6 rounded-2xl">
        <div>
          <motion.p
            className="text-lg text-gray-700 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Kara is an advanced decentralized marketplace application (dApp)
            designed to facilitate the seamless exchange of real goods and
            services for cryptocurrency. Built to operate on EVM-compatible
            blockchain platforms, Kara offers users a secure, efficient, and
            user-friendly trading environment. Users only need a browser
            equipped with a cryptocurrency wallet to access the platform. Our
            mission is to simplify and secure the process of purchasing goods
            and services with cryptocurrency, making it as intuitive and
            convenient as using traditional fiat currencies.
          </motion.p>
          <motion.p
            className="text-lg text-gray-700 leading-relaxed mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            Our goal is to create a secure and efficient platform that enables
            seamless trading of goods and services using cryptocurrency.
          </motion.p>
        </div>
      </div>
    </div>
    {/* Footer */}
    <Footer/>
   </>
  );
}
