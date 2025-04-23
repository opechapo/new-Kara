import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Layouts/Header";
import ElectronicsCategorySideBar from "../../Layouts/Pages/ElectronicsCategorySideBar";
import CategorySideBar from "../../Layouts/CategorySideBar";
import Footer from "../../Layouts/Footer";
import soundSystemsLogo from "./../../assets/soundSystemsLogo.png";
import microphonesLogo from "./../../assets/microphonesLogo.png";
import speakersLogo from "../../assets/speakersLogo.png";
import mixersLogo from "../../assets/mixersLogo.png";
import soundSystem from "../../assets/soundSystem.webp";
import microphone from "../../assets/microphone.webp";
import speaker from "../../assets/speaker.webp";
import mixer from "../../assets/mixer.webp";

const AudioAndMusicInstrumentstypes = [
  { name: "Sound Systems", logo: soundSystemsLogo, link: "#" },
  { name: "Microphones", logo: microphonesLogo, link: "#" },
  { name: "Speakers", logo: speakersLogo, link: "#" },
  { name: "Mixers", logo: mixersLogo, link: "#" },
];

const AudioAndMusicInstrumentsForSale = [
  {
    id: "soundSystem",
    image: soundSystem,
    price: "1.8 ETH",
    brand: "Sony High Power Audio System",
    description:
      "Powerful sound system with deep bass, Bluetooth connectivity, and party lights for an immersive audio experience.",
    store: "Sony Electronics",
    collection: "Audio Systems",
  },
  {
    id: "microphone",
    image: microphone,
    price: "2.2 ETH",
    brand: "Shure SM7B",
    description:
      "Dynamic cardioid microphone known for studio-quality sound, perfect for podcasts, vocals, and broadcasting.",
    store: "Shure Official Store",
    collection: "Microphones",
  },
  {
    id: "speaker",
    image: speaker,
    price: "2.5 ETH",
    brand: "JBL PartyBox 310",
    description:
      "Portable Bluetooth speaker with powerful sound, built-in light show, and long battery life for any occasion.",
    store: "JBL Sound Hub",
    collection: "Speakers",
  },
  {
    id: "mixer",
    image: mixer,
    price: "2.5 ETH",
    brand: "Yamaha MG10XU",
    description:
      "10-channel audio mixer with built-in effects, USB connectivity, and high-quality preamps for live sound and recording.",
    store: "Yamaha Music Store",
    collection: "Audio Mixers",
  },
];


const AudioAndMusicInstruments = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="flex min-h-screen px-6 py-4 mt-16">
        {/* Sidebar */}
        <div className="w-1/4 min-h-screen border-r border-gray-300">
          <ElectronicsCategorySideBar />
          <br />
          <CategorySideBar />
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-4">
          <h1 className="text-2xl font-bold mb-4">Audio and Music Instruments:</h1>

          {/* AudioAndMusicInstuments Logos Grid */}
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {AudioAndMusicInstrumentstypes.map((AudioAndMusicInstuments, index) => (
              <Link
                to={AudioAndMusicInstruments.link}
                key={index}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={AudioAndMusicInstruments.logo}
                    alt={AudioAndMusicInstruments.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <p className="mt-2 text-gray-700 font-medium hover:text-blue-600 transition duration-300">
                  {AudioAndMusicInstruments.name}
                </p>
              </Link>
            ))}
          </div>

          {/* AudioAndMusicInstuments for Sale Grid */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Available Audio and Music Instuments:</h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {AudioAndMusicInstrumentsForSale.map((AudioAndMusicInstruments, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`${AudioAndMusicInstruments.link}`)}
              >
                {/* Bag Image */}
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={AudioAndMusicInstruments.image}
                    alt={AudioAndMusicInstruments.brand}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Watches Details */}
                <div className="bg-white p-3 ">
                  <p className="text-lg font-bold text-blue-600">
                    {AudioAndMusicInstruments.price}
                  </p>
                  <p className="text-gray-800 font-semibold">{AudioAndMusicInstruments.brand}</p>
                  <p className="text-gray-600 text-sm">{AudioAndMusicInstruments.description}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Store: <span className="font-semibold">{AudioAndMusicInstruments.store}</span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Collection:{" "}
                    <span className="font-semibold">{AudioAndMusicInstruments.collection}</span>
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

export default AudioAndMusicInstruments;
