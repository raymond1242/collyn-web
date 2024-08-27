"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { useState } from "react";
import { Button } from "antd";

export default function Home() {
  const { isAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <main className="flex flex-col lg:px-12 lg:py-6 p-6 bg-white">
      <div className="flex flex-col gap-4">
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
      </div>
    </main>
  );
}
