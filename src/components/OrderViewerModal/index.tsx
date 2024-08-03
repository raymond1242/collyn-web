import { Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Order } from "@/services";
import Image from "next/image";

export default function OrderViewerModal ({ record }: { record: Order }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        type="primary"
        className="rounded-full"
        icon={<EyeOutlined />}
        onClick={() => {
          setOpenModal(true);
        }}
      />
      <Modal
        centered
        open={openModal}
        width={900}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
          <div className="flex flex-wrap justify-center items-center gap-4 lg:order-first order-last">
            {record?.images?.map(image => (
              <Image
                key={image.image!}
                src={image.image!}
                alt="Order image"
                width={350}
                height={100}
                className="rounded-xl"
              />
            ))}
          </div>
          <div className="lg:py-6 py-4 lg:px-4 p-1 col-span-2 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold">{record.name}</p>
              {record.hasProduction ? (
                <p className="text-sm bg-green-600 text-white py-1.5 px-2.5 w-fit rounded-lg">
                  Usa producción
                </p>
              ) : (
                <></>
              )}
            </div>
            <p className="text-[15px] font-light">{record.description}</p>
            <p>Precio: {record.price}</p>
            <p>Adelanto: {record.advancePayment}</p>
            <p>Pendiente: {record.pendingPayment}</p>
            <p>Recepción: {record.shippingPlace}</p>
            <p>Fecha registro: {record.createdAt?.toDateString()}</p>
            <p>Fecha entrega: {record.shippingDate.toDateString()}</p>
            <p>Hora entrega: {record.shippingDate.toTimeString()}</p>
            <p>Lugar entrega: {record.shippingPlace}</p>
            <p>Estado: {record.delivered ? 'Entregado' : 'No entregado'}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
