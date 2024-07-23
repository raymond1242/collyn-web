import Image from "next/image"
import Link from "next/link"
import { Button } from "antd";

export default function Header () {
  return (
    <header className="flex flex-row justify-between items-center top-0 sticky z-20 bg-neutral-50 px-6 py-2.5">
      <Link href={"/"} className="flex flex-row items-center">
        <Image
          src={"/collyn-logo.svg"}
          width={50}
          height={50}
          alt="Logo"
        />
      </Link>
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col text-right">
          <p className="text-base font-medium">Trópico</p>
          <p className="text-xs font-extralight">Organización</p>
        </div>
        <Button size="large">
          Iniciar sesión
        </Button>
      </div>
    </header>
  );
}
