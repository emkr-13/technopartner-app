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
    <div className="flex items-center mb-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition duration-200">
      <img
        src={photo}
        alt={name}
        className="w-16 h-16 mr-4 rounded-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <div className="flex-1">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>
      <div className="text-right">
        <span className="text-lg font-bold">Rp {price.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default MenuCard;
