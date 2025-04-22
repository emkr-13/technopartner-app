import { createContext, useContext, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    // Simulate login logic
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider value={{ login, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};