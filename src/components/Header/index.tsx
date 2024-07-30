"use client";

import Image from "next/image"
import Link from "next/link"
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function Header () {
  const router = useRouter();

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
        <p className="font-light text-sm">Sistema de pedidos</p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col text-right">
          <p className="text-base font-medium">Trópico</p>
          <p className="text-xs font-extralight">Organización</p>
        </div>
        <Button
          size="large"
          onClick={() => {
            router.push('/auth');
          }}
        >
          Iniciar sesión
        </Button>
      </div>
    </header>
  );
}
