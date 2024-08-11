"use client";

import Header from "@/components/Header";
import { useEffect, useState, useContext, createContext } from "react";
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";

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
  const [isAuthPage, setIsAuthPage] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');

  useEffect(() => {
    if (!isAuthenticated && pathname.includes("/order")) {
      setCompanyName('');
      setCompanyLogo('');
      router.push('/auth');
    }

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
      {!isAuthPage && <Header />}
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
