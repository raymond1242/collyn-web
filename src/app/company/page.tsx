"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { UserCompanyRoleEnum } from "@/services";
import Image from "next/image";

export default function Company() {
  const { userRole, companyName, companyStores, companyLogo } = useAuthContext();

  if (userRole !== UserCompanyRoleEnum.Admin) {
    return <p>No tienes permisos para acceder a esta página</p>
  }

  return (
    <main className="flex lg:flex-row flex-col gap-4 lg:px-12 lg:py-6 p-6 bg-white">
      <div className="flex flex-col gap-4 border border-neutral-500 rounded-lg p-4 w-fit h-fit">
        <p className="font-medium">Detalles de la empresa</p>
        <div className="grid grid-cols-2 gap-4">
          {companyLogo && (
            <Image
              src={companyLogo}
              width={230}
              height={210}
              alt="Company logo"
              className="h-auto"
            />
          )}
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-row gap-2">
              <p className="text-sm font-light">Nombre:</p>
              <p className="text-lg">{companyName}</p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="text-sm font-light">Código:</p>
              <p className="text-lg">@tropico</p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="text-sm font-light">Suscripción:</p>
              <p
                className="text-sm font-light border border-primary p-1.5 rounded-md bg-primary text-white"
              >
                Enterprise
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 border border-neutral-600 rounded-lg p-4 w-96">
          <p className="font-medium">Términos y condiciones</p>
          <p className="font-light text-sm">Nuestros productos no contienen preservantes ni saborizantes, por lo que debe mantenerse refrigerado y ser consumido el mismo día de su compra.</p>
          <p className="font-light text-sm">Es importante respetar la hora de recojo, La empresa no se responsabiliza del producto(s) pasadas las 3 horas.</p>
          <p className="font-light text-sm">Esto es solo una nota de pedido, al pago del total, se emitirá la boleta o factura.</p>
        </div>
        <div className="flex flex-col gap-2 border border-neutral-600 rounded-lg p-4 w-96">
          <p>Política de privacidad</p>
          <p className="text-sm font-light">No hay registro de datos personales</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 border border-neutral-500 rounded-lg p-4 w-fit h-fit">
        <p className="font-medium">Usuarios</p>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex flex-col gap-1 border border-neutral-500 rounded-md p-2">
            <p className="text-base">Administrador</p>
            <p className="text-sm font-light text-left">Admin</p>
          </div>
          {companyStores.map((store) => (
            <div key={store.name} className="flex flex-col gap-1 border border-neutral-500 rounded-md p-2">
              <p className="text-base">{store.name}</p>
              <p className="text-sm font-light text-left">Tienda</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
