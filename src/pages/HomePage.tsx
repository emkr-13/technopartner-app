import { useEffect, useState } from "react";
import { useAuth } from "../utils/authContext";
import { fetchHomeData } from "../services/apiService";
import BannerSlider from "../components/BannerSlider";
import QRCodePopup from "../components/QRCodePopup";
import Footer from "../components/Footer";
import HeaderHome from "../components/HeaderHome";

const HomePage = () => {
  const { token } = useAuth();
  const [homeData, setHomeData] = useState<any | null>(null);
  const [showQR, setShowQR] = useState(false);
  console.log("Token:", token);

  useEffect(() => {
    if (token) {
      fetchHomeData(token)
        .then((data) => setHomeData(data))
        .catch((error) => console.error("Failed to fetch home data:", error));
    }
  }, [token]);

  console.log("Home Data:", homeData);

  return (
    <div className="min-h-screen bg-white">
      <HeaderHome />

      <main className="py-16 px-4">
        {homeData && (
          <>
            <div className="bg-white p-4 mb-8">
              <p className="text-sm mb-2">{homeData.result.greeting},</p>
              <h2 className="text-xl font-bold">{homeData.result.name}</h2>
              <div className="flex items-center mt-4">
                <img
                  src={homeData.result.qrcode}
                  alt="QR Code"
                  className="w-12 h-12 mr-4 cursor-pointer"
                  onClick={() => setShowQR(true)}
                />
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Saldo</span>
                    <span className="font-bold">
                      Rp {homeData.result.saldo}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Points</span>
                    <span className="font-bold text-green-500">
                      {homeData.result.point}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900 text-white p-8 mb-8">
              <img
                src="/assets/logo-techno.png"
                alt="Logo"
                className="h-8 mb-4"
              />
              <p className="text-sm">View All {">"}</p>
            </div>

            <BannerSlider banners={homeData.result.banner} />
          </>
        )}
      </main>

      <Footer />

      {showQR && (
        <QRCodePopup
          qrUrl={homeData?.result.qrcode || ""}
          onClose={() => setShowQR(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
