import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/authContext";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/menu/:category" element={<MenuPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
