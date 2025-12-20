"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { useState } from "react";
import Image from "next/image";
import { ubuntu } from "@/app/fonts";
import { Button } from "antd";
import {
  PhoneOutlined,
  CheckCircleFilled,
  RocketFilled,
  SafetyCertificateFilled,
  ThunderboltFilled,
} from "@ant-design/icons";

const features = [
  {
    icon: <RocketFilled className="text-3xl text-orange-500" />,
    title: "Rápido y Eficiente",
    description: "Gestiona cientos de pedidos en segundos con nuestra interfaz optimizada.",
  },
  {
    icon: <SafetyCertificateFilled className="text-3xl text-orange-500" />,
    title: "Seguro y Confiable",
    description: "Tus datos están protegidos con los más altos estándares de seguridad.",
  },
  {
    icon: <ThunderboltFilled className="text-3xl text-orange-500" />,
    title: "Tiempo Real",
    description: "Monitorea el estado de tus pedidos con actualizaciones instantáneas.",
  },
];

const benefits = [
  "Control centralizado de todos tus pedidos",
  "Generación automática de facturas",
  "Seguimiento de envíos en tiempo real",
  "Reportes y estadísticas detalladas",
  "Roles y permisos personalizables",
  "Soporte técnico dedicado",
];

export default function Home() {
  const { isAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <main className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-primary">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-hover to-primary-active" />

        {/* Geometric decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-orange-500/30 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-primary-active/50 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />

        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-[15%] w-20 h-20 border-2 border-white/10 rounded-2xl rotate-12 hidden lg:block" />
        <div className="absolute top-40 right-[25%] w-12 h-12 bg-orange-500/20 rounded-xl rotate-45 hidden lg:block" />
        <div className="absolute bottom-32 right-[20%] w-16 h-16 border-2 border-orange-500/20 rounded-full hidden lg:block" />
        <div className="absolute top-1/3 left-[8%] w-8 h-8 bg-white/10 rounded-lg rotate-12 hidden lg:block" />
        <div className="absolute bottom-1/4 left-[12%] w-14 h-14 border-2 border-white/5 rounded-2xl -rotate-12 hidden lg:block" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10 container mx-auto px-6 lg:px-16 min-h-screen flex items-center">
          <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto gap-8 py-20">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/10">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Sistema de Gestión de Pedidos</span>
            </div>

            <h1 className={`${ubuntu.className} text-white font-bold text-7xl lg:text-9xl leading-[1] tracking-tight`}>
              Collyn
            </h1>

            <p className="text-2xl lg:text-3xl leading-tight font-light text-white/80 max-w-3xl">
              Simplifica la gestión de pedidos y potencia tu{" "}
              <span className="text-orange-500 font-bold">negocio.</span>
            </p>

            <p className="text-lg text-white/60 max-w-xl leading-relaxed">
              <span className="font-semibold text-white/90">Control total</span> sobre tus pedidos en un solo lugar.
              Optimiza procesos, reduce tiempos y mejora la eficiencia operativa.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-8 lg:gap-16 mt-4 py-6 px-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-orange-500">100+</p>
                <p className="text-white/60 text-sm mt-1">Pedidos Diarios</p>
              </div>
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-orange-500">99.9%</p>
                <p className="text-white/60 text-sm mt-1">Disponibilidad</p>
              </div>
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-orange-500">10+</p>
                <p className="text-white/60 text-sm mt-1">Usuarios</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Button
                size="large"
                className="btn-secondary h-12 px-10 text-lg font-medium rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow"
                icon={<PhoneOutlined />}
              >
                Contáctanos
              </Button>
              {isAuthenticated && (
                <Button
                  size="large"
                  type="primary"
                  loading={loading}
                  className="h-14 px-10 text-lg font-medium rounded-xl"
                  onClick={() => {
                    setLoading(true);
                    router.push("/order");
                  }}
                >
                  Ir al Dashboard
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/50 text-sm">Descubre más</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <span className="inline-block text-orange-600 font-semibold text-sm uppercase tracking-wider mb-4">
              Características
            </span>
            <h2 className={`${ubuntu.className} text-4xl lg:text-5xl font-bold text-primary mb-6`}>
              ¿Por qué elegir Collyn?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Diseñado para empresas que buscan excelencia operativa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg shadow-gray-100 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-gray-100 hover:border-orange-200"
              >
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-3xl blur-2xl" />
              <Image
                src="/landing/collyn-app.png"
                width={1060}
                height={760}
                alt="Collyn Dashboard"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <span className="inline-block text-orange-600 font-semibold text-sm uppercase tracking-wider mb-4">
                  Sobre Collyn
                </span>
                <h2 className={`${ubuntu.className} text-4xl lg:text-5xl font-bold text-primary mb-6`}>
                  Sistema de Gestión de Pedidos
                </h2>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                <span className="font-bold text-primary">Collyn</span> es un sistema de gestión de pedidos diseñado para{" "}
                <span className="text-orange-600 font-semibold">optimizar y simplificar</span> el proceso de manejo de órdenes.
                Permite crear, editar y visualizar pedidos de manera eficiente, asegurando que cada transacción esté registrada con precisión.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircleFilled className="text-orange-500 text-lg flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button
                size="large"
                type="primary"
                className="w-fit h-14 px-8 text-lg font-medium rounded-xl mt-4"
              >
                Comenzar Ahora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary-hover to-primary-active relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 lg:px-16 relative z-10 text-center">
          <h2 className={`${ubuntu.className} text-4xl lg:text-5xl font-bold text-white mb-6`}>
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
            Únete a cientos de empresas que ya confían en Collyn para gestionar sus pedidos de manera eficiente.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="large"
              className="btn-secondary h-14 px-10 text-lg font-medium rounded-xl shadow-lg shadow-orange-500/25"
              icon={<PhoneOutlined />}
            >
              Solicitar Demo
            </Button>
            <Button
              size="large"
              className="h-14 px-10 text-lg font-medium rounded-xl bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Ver Precios
            </Button>
          </div>
        </div>
      </section>

      
    </main>
  );
}
