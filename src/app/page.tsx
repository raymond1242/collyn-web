"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { useState } from "react";
import Image from "next/image";
import { ubuntu } from "@/app/fonts";
import { Button } from "antd";
import { PhoneOutlined } from "@ant-design/icons";

export default function Home() {
  const { isAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <main className="flex flex-col bg-white pb-10">
      <div className="grid lg:grid-cols-2 grid-cols-1 h-[660px] bg-primary">
        <div className="flex flex-col lg:gap-10 gap-6 m-auto lg:px-16 px-8">
          <p
            className={`${ubuntu.className} text-white font-bold text-[99px] leading-[1]`} 
          >
            Collyn
          </p>
          <p className="text-[36px] leading-tight font-light text-neutral-300">
            Simplifica la gestión de pedidos<br/>y potencia tu&nbsp;
            <span className="text-orange-600 font-bold">
              negocio.
            </span>
          </p>
          <p className="font-extralight text-xl text-white">
            <span className="font-bold text-xl mr-1.5">
              Control total
            </span>
            sobre tus pedidos en un solo lugar. Nuestra plataforma intuitiva está diseñada para ayudarte a
            <span className="font-semibold mx-1 text-orange-600">
              optimizar
            </span>
            tus procesos,
            <span className="font-semibold mx-1 text-orange-600">
              reducir
            </span>
            tiempos y
            <span className="font-semibold mx-1 text-orange-600">
              mejorar
            </span>
            la eficiencia operativa.
            Todo lo que necesitas para gestionar tus órdenes de forma rápida y sencilla, lo encuentras
            <span className="font-semibold mx-1">
              aquí
            </span>
          </p>
          <div className="flex flex-row gap-2">
            <Button
              size="large"
              className="btn-secondary w-fit"
              icon={<PhoneOutlined />}
            >
              Contáctanos
            </Button>
            {isAuthenticated && (
              <Button
                size="large"
                type="primary"
                onClick={() => {
                  router.push('/order');
                  setLoading(true);
                }}
              >
                Ingresar
              </Button>
            )}
          </div>
        </div>
        <Image
          src={"/landing/client-sale.jpg"}
          width={920}
          height={700}
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 items-center bg-white">
        <div className="flex flex-col gap-4 lg:px-16 px-8">
          <p className={`${ubuntu.className} text-5xl font-medium text-primary mb-3`}>
            Sistema de Gestión<br/>de Pedidos
          </p>
          <p className="font-extralight text-lg">
            <span className="font-bold text-xl mr-1 text-primary">
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
            width={660}
            height={600}
            alt="Logo"
          />
        </div>
      </div>
      <div className="py-8 px-16">
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
