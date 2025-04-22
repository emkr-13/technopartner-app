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

  useEffect(() => {
    if (token) {
      fetchHomeData(token)
        .then((data) => setHomeData(data))
        .catch((error) => console.error("Failed to fetch home data:", error));
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-white">
      <HeaderHome />

      <main className="py-16 px-4">
        {homeData && (
          <>
            {/* Informasi Pengguna */}
            <div className="bg-white p-4 mb-8 flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-sm mb-2">{homeData.result.greeting},</p>
                <h2 className="text-xl font-bold">{homeData.result.name}</h2>
              </div>

              {/* QR Code dan Informasi Saldo/Point */}
              <div className="flex flex-col items-center">
                <img
                  src={homeData.result.qrcode}
                  alt="QR Code"
                  className="w-16 h-16 md:w-12 md:h-12 mb-4 cursor-pointer"
                  onClick={() => setShowQR(true)}
                />
                <div className="text-center">
                  <div className="flex justify-between text-sm">
                    <span>Saldo:</span>
                    <span className="font-bold">
                      Rp {homeData.result.saldo}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Points:</span>
                    <span className="font-bold text-green-500">
                      {homeData.result.point}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* View All */}
            <div className="bg-blue-900 text-white p-8 mb-8 rounded-lg shadow-lg">
              <img
                src="/assets/BG-banner.jpg"
                alt="Technopartner Logo"
                className="h-8 mb-4 mx-auto"
              />
              <p className="text-sm text-center">View All {">"}</p>
            </div>

            {/* Slider Banner */}
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
