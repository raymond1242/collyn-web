"use client";

import moment from "moment";
import 'moment/locale/es';
import OrderList from "@/components/OrderList";
import { dmSans } from "@/app/fonts";
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";

export default function Order() {
  return (
    <main className="flex flex-col lg:px-12 lg:py-6 p-6 bg-white">
      <div className="flex flex-row justify-between items-center py-2 gap-2">
        <p className={`${dmSans.className} lg:text-5xl text-2xl font-semibold`}>PEDIDOS REGISTRADOS</p>
        <div className="grid grid-cols-2">
          <p className="flex text-base gap-2 items-center">
            <ClockCircleOutlined />
            Hora actual:
          </p>
          <p className="text-lg font-light">
            {moment().format('HH:mm')}
          </p>
          <p className="flex text-base gap-2 items-center">
            <CalendarOutlined />
            Fecha actual:
          </p>
          <p className="text-lg capitalize font-light">
            {moment().format('dddd DD/MM/YY')}
          </p>
        </div>
      </div>
      <OrderList />
    </main>
  );
}
