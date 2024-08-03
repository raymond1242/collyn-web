"use client";

import Image from "next/image"
import Link from "next/link"
import { Button, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AuthService, CompanyApiService } from "@/services";

export default function Header () {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const companyApi = CompanyApiService();

  useEffect(() => {
    setImageLoading(true);
    const token = AuthService.getAuthToken();
    if (token) {
      verifyToken();
    }
  }, []);

  const verifyToken = () => {
    companyApi.companyRead({ username: AuthService.getUserName() as string }).then((response) => {
      console.log(response);
      setCompanyName(response.name);
      setCompanyLogo(response.logo as string);
      setIsLoggedIn(true);
      router.push('/order');
    }).catch((error) => {
      console.log(error);
      router.push('/auth');
    });
  }

  const onLoadImage = (event: any) => {
    setImageLoading(false);
  }

  return (
    <header className="flex flex-row justify-between items-center top-0 sticky z-20 bg-neutral-50 px-6 py-2.5">
      <div className="flex flex-row gap-1 items-center">
        <Link href={"/"} className="flex flex-row items-center">
          <Image
            src={"/collyn-logo.svg"}
            width={50}
            height={50}
            alt="Logo"
          />
        </Link>
      </div>
      <div className="flex flex-row items-center gap-4">
        {isLoggedIn ? (
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col text-right">
              <p className="text-base font-medium">{companyName}</p>
              <p className="text-xs font-extralight">Organización</p>
            </div>
            <Spin spinning={imageLoading}>
              <Image
                src={companyLogo}
                width={50}
                height={50}
                onLoad={onLoadImage}
                alt="Company logo"
                className={`${imageLoading ? '' : 'w-auto h-auto'}`}
              />
            </Spin>
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
