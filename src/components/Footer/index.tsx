import Image from "next/image"
import { ubuntu } from "@/app/fonts";

export default function Footer () {
  return (
    <footer className="flex flex-col py-12 px-14 bg-primary text-neutral-100 gap-4">
      <div className="flex flex-row items-center gap-2">
        <Image
          src={"/collyn-white.svg"}
          width={65}
          height={65}
          alt="Logo"
        />
        <p className={`${ubuntu.className} text-3xl font-medium`}>
          Collyn
        </p>
      </div>
      <div className="flex flex-col gap-1 font-light">
        <p>
          Llámanos a: (+51) 950 160 458
        </p>
        <p>
          Ventas  y soporte (Whatsapp): +51 950 160 458
        </p>
      </div>
      <div className="flex flex-col gap-2">
        Síguenos en:

      </div>
      <div className="text-center font-light">
        <p>
          © 2023 Collyn. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
