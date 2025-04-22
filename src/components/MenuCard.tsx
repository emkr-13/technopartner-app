import { useState } from "react";

interface MenuCardProps {
  name: string;
  description: string;
  photo: string;
  price: number;
}

const MenuCard: React.FC<MenuCardProps> = ({
  name,
  description,
  photo,
  price,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-center mb-6 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200">
      <img
        src={photo}
        alt={name}
        className="w-full sm:w-24 sm:h-24 mb-4 sm:mb-0 sm:mr-4 rounded-lg object-cover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>
      <div className="text-center sm:text-right mt-4 sm:mt-0">
        <span className="text-lg font-bold text-blue-600">
          Rp {price.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default MenuCard;
