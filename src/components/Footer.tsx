import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white shadow-inner p-4 flex justify-around items-center md:justify-between">
      <Link to="/home" className="flex flex-col items-center">
        <img src="/assets/home.png" alt="Home" className="w-6 h-6 mb-1" />
        <span className="text-xs">Home</span>
      </Link>
      <Link to="/menu" className="flex flex-col items-center">
        <img src="/assets/menu.svg" alt="Menu" className="w-6 h-6 mb-1" />
        <span className="text-xs">Menu</span>
      </Link>
    </footer>
  );
};

export default Footer;
