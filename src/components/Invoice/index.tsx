import Image from "next/image"
import React from "react";
import { Order } from "@/services";
import moment from "moment";
import { useAuthContext } from "@/contexts/AuthContext";

interface InvoiceComponentProps {
  order: Order
  hide: boolean
}

const InvoiceComponent = React.forwardRef<HTMLDivElement | null, InvoiceComponentProps>((props, ref) => {
  const { order, hide } = props;
  const { companyLogo } = useAuthContext()

  return (
    <div className={`w-60 ${hide ? 'print' : ''}`} ref={ref}>
      <div className="flex pb-6 justify-center">
        <Image
          src={companyLogo}
          width={140}
          height={100}
          alt="Tropico"
        />
      </div>
      <div className="border-t-2 border-b-2 border-dashed border-black text-center py-0.5 font-semibold">
        PEDIDO
      </div>
      <div className="py-2 text-xs">
        <p>Fecha: {moment(order.createdAt).format('DD/MM/YY')}</p>
        <p>Hora: {moment(order.createdAt).format('HH:mm')}</p>
        <p>Lugar de origen: {order.registrationPlace}</p>
      </div>
      <div
        className="border-t-2 border-b-2 border-dashed border-black text-center py-0.5 font-semibold"
      >
        DETALLE DEL PEDIDO
      </div>
      <div className="py-2 text-xs">
        <p>Fecha de entrega: {moment(order.shippingDate).format('DD/MM/YY')}</p>
        <p>Hora de entrega: {moment(order.shippingDate).format('HH:mm')}</p>
        <p>Lugar de entrega: {order.shippingPlace}</p>
      </div>
      <div className="border-t-2 border-dashed border-black"></div>
      <div className="py-2 text-xs">
        <p>Precio total: {order.price}</p>
        <p>Adelanto: {order.advancePayment}</p>
        <p>Pendiente: {order.pendingPayment}</p>
      </div>
      <div className="border-t-2 border-b-2 border-dashed border-black text-center py-0.5 font-semibold">
        PRODUCTO(S)
      </div>
      <div className="py-2">
        <pre className="text-wrap">{order.product}</pre>
      </div>
      <div className="text-center py-2 font-semibold">
        GRACIAS POR SU COMPRA
      </div>
      <div className="text-xs">
        <p>Nuestros productos no contienen preservantes ni saborizantes, por lo que debe mantenerse refrigerado y ser consumido el mismo día de su compra.</p>
        <p>Es importante respetar la hora de recojo, La empresa no se responsabiliza del producto(s) pasadas las 3 horas.</p>
        <p>Esto es solo una nota de pedido, al pago del total, se emitirá la boleta o factura.</p>
      </div>
    </div>
  );
});

InvoiceComponent.displayName = 'InvoiceComponent';

export default InvoiceComponent;
