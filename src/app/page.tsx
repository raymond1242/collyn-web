"use client";

// import { useRouter } from "next/navigation";
// import { useAuthContext } from "@/contexts/AuthContext";
// import { useState } from "react";
import Image from "next/image";
import { ubuntu } from "@/app/fonts";

export default function Home() {
  // const { isAuthenticated } = useAuthContext();
  // const [loading, setLoading] = useState(false);
  // const router = useRouter();

  return (
    <main className="flex flex-col bg-white">
      <div className="relative inline-block">
        <div className="hero-card flex flex-col gap-4">
          <p
            className={`${ubuntu.className} font-medium text-[84px] leading-[1]`} 
          >
            Collyn
          </p>
          <p className="text-6xl text-white">
            Sistema de Gestión de
            {/* <br /> */}
            <span className="text-orange-600 ml-2 font-bold">
              PEDIDOS
            </span>
          </p>
        </div>
        <Image
          src={"/landing/client-sale.jpg"}
          width={920}
          height={500}
          alt="Logo"
          // objectFit="cover"
          className="w-full block"
        />
      </div>
        {/* <div>
          <p className="text-lg font-light">
            Bienvenido a
            <span className="ml-1.5 text-primary text-xl font-normal">
              Collyn
            </span>
          </p>
          {isAuthenticated && (
              <Button
                loading={loading}
                className="w-fit"
                onClick={() => {
                  router.push('/order');
                  setLoading(true);
                }}
              >
                Ir a la página de inicio
              </Button>
          )}
        </div> */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 items-center bg-neutral-300">
        <div className="flex flex-col gap-4 px-6">
          <p className="text-5xl font-bold text-primary -mb-3">SISTEMA DE GESTIÓN</p>
          <p className="text-5xl font-bold text-primary">DE PEDIDOS</p>
          <p className="font-extralight text-lg">
            <span className="font-semibold mx-1 text-primary">
              Collyn
            </span>
            es un sistema de gestión de pedidos diseñado para
            <span className="font-semibold mx-1 text-orange-600">
              optimizar y simplificar
            </span>
            el proceso de manejo de órdenes dentro de una empresa. Permite a los usuarios
            <span className="font-semibold mx-1">
              crear, editar y visualizar
            </span>
            pedidos de manera eficiente, asegurando que cada transacción esté registrada con precisión y sea accesible en
            <span className="font-semibold mx-1">
              cualquier momento.
            </span>
          </p>
        </div>
        <div className="h-fit mx-auto">
          <Image
            src={"/landing/collyn-app.png"}
            width={620}
            height={600}
            alt="Logo"
          />
        </div>
      </div>
      <div className="py-2 px-6">
        <p className="text-4xl font-bold text-primary text-center mb-4">
          ¿QUÉ PUEDE HACER COLLYN?
        </p>
        <p className="font-light text-base">
          Con Collyn, las empresas pueden organizar sus pedidos de forma centralizada, gestionar el estado de los envíos, generar facturas personalizadas y mantener un control exhaustivo de cada operación. Además, ofrece roles personalizados para usuarios, como administradores y tiendas, lo que facilita la asignación de permisos y responsabilidades dentro del equipo.
        </p>
      </div>
    </main>
  );
}
