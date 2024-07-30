"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';

export default function AppContext({ children }: { children: React.ReactNode }) {
  const [isAuthPage, setIsAuthPage] = useState(true);
  const pathname = usePathname();
  
  useEffect(() => {
    if (pathname.includes("/auth") || pathname.includes("/order/create")) {
      setIsAuthPage(true);
    } else {
      setIsAuthPage(false);
    }
  }, [pathname]);
  return (
    <div>
      {!isAuthPage && <Header />}
      {children}
    </div>
  );
}
