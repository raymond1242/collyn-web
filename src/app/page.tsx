"use client";

import { useState } from "react";
import moment from "moment";
import 'moment/locale/es';
import Link from "next/link";
import OrderList from "@/components/OrderList";

export default function Home() {
  moment().locale('es')
  const [date, setDate] = useState(moment().format('LL'))
  const [time, setTime] = useState(moment().format('HH:mm'))

  setInterval(() => {
    setTime(moment().format('HH:mm'))
  }, 5000)

  return (
    <main className="flex flex-col lg:px-12 lg:py-4 p-6 bg-white">
      <div className="flex items-center justify-between py-2 gap-2">
        <div className="flex flex-col gap-4">
          <p className="text-3xl font-medium capitalize">
            {date}
          </p>
          <Link href={"/"} className="text-blue-500 hover:underline">
            Ver pedidos de mañana
          </Link>
        </div>
        <p className="text-5xl font-bold bg-neutral-200 p-4 rounded-lg">
          {time}
        </p>
      </div>
      <OrderList />
    </main>
  );
}
