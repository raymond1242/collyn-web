"use client";

import Image from "next/image"
import Link from "next/link"
import { Button, Spin } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AuthService, CompanyApiService } from "@/services";
import { useAuthContext } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";

export default function Header () {
  const router = useRouter();
  const [imageLoading, setImageLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const companyApi = CompanyApiService();

  const pathname = usePathname();

  const {
    companyName,
    setCompanyName,
    companyLogo,
    setCompanyLogo,
    isAuthenticated,
    setIsAuthenticated,
    setUserRole,
    userName,
    setUserName,
    setCompanyStores,
  } = useAuthContext();

  useEffect(() => {
    const token = AuthService.getAuthToken();
    if (token) {
      verifyToken();
    } else {
      setImageLoading(false);
    }
  }, []);

  const verifyToken = () => {
    companyApi.companyRead({ user: AuthService.getUserName() as string }).then((response) => {
      setCompanyName(response.company.name);
      setUserName(response.name)
      setCompanyLogo(response.company.logo as string);
      setIsAuthenticated(true);
      setImageLoading(true);
      setUserRole(response.role);
      if (pathname === '/auth') {
        router.push('/order');
      }
    }).catch((error) => {
      console.log(error);
      AuthService.removeAuthToken()
      setIsAuthenticated(false);
      setCompanyName('');
      setCompanyLogo('');
      AuthService.removeUserName()
      router.push('/auth');
    });

    companyApi.companyStores().then((response) => {
      setCompanyStores(response);
    }).catch((error) => {
      console.error(error);
    });
  }

  const onLoadImage = (event: any) => {
    setImageLoading(false);
  }

  return (
    <header className="flex flex-row justify-between items-center top-0 sticky opacity-95 z-20 bg-white px-6 py-2.5">
      <div className="lg:flex flex-row gap-1 items-center hidden">
        <Link href={"/"} className="flex flex-row items-center ">
          <Image
            src={"/collyn-logo.svg"}
            width={50}
            height={50}
            alt="Logo"
          />
        </Link>
      </div>
      <div className="flex flex-row items-center gap-4">
        {isAuthenticated ? (
          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-col lg:text-right text-left">
              <p className="text-base font-medium">{userName}</p>
              <p className="text-sm font-extralight">{companyName}</p>
            </div>
            <Spin spinning={imageLoading}>
              {companyLogo && (
                <Image
                  src={companyLogo}
                  width={50}
                  height={35}
                  onLoad={onLoadImage}
                  alt="Company logo"
                  className="h-auto w-[72px]"
                />
              )}
            </Spin>
            <div>
              <Button
                loading={logoutLoading}
                className="btn-danger"
                onClick={() => {
                  setLogoutLoading(true);
                  AuthService.removeAuthToken()
                  AuthService.removeUserName()
                  AuthService.removeCompanyName()
                  router.push('/auth');
                }}
                icon={<LogoutOutlined />}
              >
                Cerrar sesión
              </Button>
            </div>
          </div>
        ) : (
          <Button
            size="large"
            onClick={() => {
              router.push('/auth');
            }}
          >
            Iniciar sesión
          </Button>
        )}
      </div>
    </header>
  );
}
