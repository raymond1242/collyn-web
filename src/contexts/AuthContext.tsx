"use client";

import Header from "@/components/Header";
import { useEffect, useState, useContext, createContext } from "react";
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import { UserCompanyStore } from "@/services";
import { UserCompanyRoleEnum } from "@/services";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  companyName: string;
  setCompanyName: (value: string) => void;
  companyLogo: string;
  setCompanyLogo: (value: string) => void;
  companyStores: Array<UserCompanyStore>;
  setCompanyStores: (value: Array<UserCompanyStore>) => void;
  userRole: UserCompanyRoleEnum;
  setUserRole: (value: UserCompanyRoleEnum) => void;
  userName: string;
  setUserName: (value: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthPage, setIsAuthPage] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [userRole, setUserRole] = useState(UserCompanyRoleEnum.Store);
  const [userName, setUserName] = useState('');
  const [companyStores, setCompanyStores] = useState<Array<UserCompanyStore>>([]);

  useEffect(() => {
    if (!isAuthenticated && pathname.includes("/order")) {
      setCompanyName('');
      setCompanyLogo('');
      // tODO: veriffy if exists a token and verify it
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
        companyStores,
        setCompanyStores,
        userRole,
        setUserRole,
        userName,
        setUserName,
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
