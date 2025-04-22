import logo from "../../public/assets/logo-techno.png"; 

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50">
      <img src={logo} alt="Technopartner Logo" className="h-8" />
    </header>
  );
};

export default Header;
