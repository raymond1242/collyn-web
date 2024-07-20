import Image from "next/image"
import Link from "next/link"
import { Button } from "antd";

export default function Header () {
  return (
    <header className="flex flex-row justify-between items-center top-0 sticky z-20 bg-white px-6 py-2">
      <Link href={"/"} className="flex flex-row items-center">
        <Image
          src={"/collyn-logo.svg"}
          width={60}
          height={60}
          alt="Logo"
        />
      </Link>
      <Button size="large">
        Iniciar sesión
      </Button>
    </header>
  );
}
