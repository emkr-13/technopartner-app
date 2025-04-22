import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMenuData } from "../services/apiService";
import MenuCard from "../components/MenuCard";
import Footer from "../components/Footer";
import HeaderMenu from "../components/HeaderMenu";

const MenuPage = () => {
  const { category } = useParams<{ category: string }>();
  const [menuData, setMenuData] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Seasonal Product");

  useEffect(() => {
    // Ambil data menu dari API
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          const data = await fetchMenuData(token);
          setMenuData(data.result.categories);
        }
      } catch (error) {
        console.error("Failed to fetch menu data:", error);
      }
    };

    fetchData();
  }, []);
  // console.log("Menu Data:", menuData);

  useEffect(() => {
    // Set active tab berdasarkan URL parameter
    if (category) {
      setActiveTab(category);
    }
  }, [category]);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    // Update URL dengan nama kategori
    window.history.replaceState(null, "", `/menu/${tabName}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderMenu />

      <main className="py-8 px-4">
        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-4">
            {menuData?.map((category: any) => (
              <button
                key={category.category_name}
                onClick={() => handleTabClick(category.category_name)}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === category.category_name
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {category.category_name}
              </button>
            ))}
          </nav>
        </div>

        {/* Konten Menu */}
        {menuData && (
          <div>
            {menuData.map((category: any) => {
              if (category.category_name === activeTab) {
                return (
                  <div key={category.category_name} className="mb-8">
                    <h2 className="text-xl font-bold mb-4">
                      {category.category_name}
                    </h2>
                    {category.menu.map((item: any) => (
                      <MenuCard
                        key={item.name}
                        name={item.name}
                        description={item.description}
                        photo={item.photo}
                        price={item.price}
                      />
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MenuPage;
