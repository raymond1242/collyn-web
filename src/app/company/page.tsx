"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { UserCompanyRoleEnum } from "@/services";

export default function Company() {
  const { userRole, companyName, companyStores } = useAuthContext();

  if (userRole !== UserCompanyRoleEnum.Admin) {
    return <p>No tienes permisos para acceder a esta página</p>
  }

  return (
    <main className="flex flex-col gap-4 lg:px-12 lg:py-6 p-6 bg-red-100">
      <div className="flex flex-col gap-3 border border-neutral-400 rounded-md p-4 w-fit">
        <p className="text-xl font-medium">Detalles de la empresa</p>
        <div className="flex flex-row items-end gap-2">
          <p className="text-sm">Nombre:</p>
          <p className="text-md">{companyName}</p>
        </div>
        <div className="flex flex-row items-end gap-2">
          <p className="text-sm">Código de la empresa:</p>
          <p className="text-md lowercase">{companyName}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 border border-neutral-400 rounded-md p-4 w-fit">
        <p className="text-xl font-medium">Usuarios</p>
        <div className="flex flex-wrap gap-2 items-center">
          {companyStores.map((store) => (
            <div key={store.name} className="flex flex-col gap-1 border border-neutral-400 rounded-md p-2">
              <p className="text-base">{store.name}</p>
              <p className="text-sm font-light text-center">Tienda</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
