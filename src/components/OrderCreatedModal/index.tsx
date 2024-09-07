import moment from "moment";
import PrintInvoiceButton from "@/components/PrintInvoiceButton";
import { Order } from "@/services";
import { Modal, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OrderCreatedModal ({ order, open }: { order: Order, open: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      <Modal
        centered
        open={open}
        width={440}
        closable={false}
        footer={null}
      >
        <div className="flex flex-col gap-3 p-4">
          <div className="mx-auto border-4 border-green-500 w-24 h-24 flex rounded-full">
            <CheckOutlined className="text-green-500 font-medium m-auto text-6xl" />
          </div>
          <p className="text-green-500 text-2xl text-center font-medium">Pedido creado exitosamente</p>
          <p className="text-base font-light">
            Se ha creado un pedido con el siguiente detalle:
          </p>
          <div className="flex flex-col gap-0 my-1">
            <p className="font-light">
              Fecha: {moment(order.createdAt).format('DD/MM/YY HH:mm')}
            </p>
            <p className="font-light">
              Lugar de entrega: {order.shippingPlace}
            </p>
            <p className="font-light">
              Precio: {order.price}
            </p>
            <p className="font-light">
              Adelanto: {order.advancePayment}
            </p>
            <p className="font-light">
              Producto:
            </p>
            <p className="font-light">
              {order.product}
            </p>
          </div>
          <div className="flex flex-row justify-between gap-4">
            <Button
              loading={loading}
              onClick={() => {
                setLoading(true);
                router.push('/order');
              }}
            >
              Ir a pedidos
            </Button>
            <div className="w-fit h-fit">
              <PrintInvoiceButton hide={true} record={order} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
