"use client";

import Header from "@/components/Header";
import { useEffect, useState, createContext } from "react";
import { usePathname } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  companyName: string;
  setCompanyName: (value: string) => void;
  companyLogo: string;
  setCompanyLogo: (value: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthPage, setIsAuthPage] = useState(true);
  const pathname = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');

  useEffect(() => {
    if (pathname.includes("/auth")) {
      setIsAuthPage(true);
    } else {
      setIsAuthPage(false);
    }
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        companyName,
        setCompanyName,
        companyLogo,
        setCompanyLogo,
      }}
    >
      {/* {!isAuthPage && <Header />} */}
      <Header />
      {children}
    </AuthContext.Provider>
  );
}
