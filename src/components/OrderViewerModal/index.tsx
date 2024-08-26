import { Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Order } from "@/services";
import Image from "next/image";
import moment from "moment";

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
          <div className="flex flex-col justify-center gap-4 lg:order-first order-last">
            {record?.images?.map(image => (
              <Image
                key={image.image!}
                src={image.image!}
                alt="Order image"
                width={350}
                height={300}
                className="rounded-xl bg-neutral-100 border"
              />
            ))}
          </div>
          <div className="lg:py-6 py-4 lg:px-4 p-1 col-span-2 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="text-3xl font-bold">{record.name}</p>
              {record.hasProduction ? (
                <p className="text-sm bg-green-600 text-white py-1.5 px-2.5 w-fit rounded-lg">
                  Usa producción
                </p>
              ) : (
                <></>
              )}
            </div>
            <div className="border border-neutral-500"></div>
            <p className="whitespace-pre-wrap text-base font-light">
              {record.product}
            </p>
            <div className="border border-neutral-500"></div>
            <p className="text-[15px] font-light">{record.description}</p>
            <div className="border border-neutral-500"></div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <p className="text-title">Lugar de origen</p>
                  <p className="text-description">{record.registrationPlace}</p>
                </div>
                <div>
                  <p className="text-title">Fecha registro</p>
                  <p className="text-description">{moment(record.createdAt).format('DD/MM/YY')}</p>
                </div>
                <div>
                  <p className="text-title">Fecha entrega</p>
                  <p className="text-description">{moment(record.shippingDate).format('DD/MM/YY')}</p>
                </div>
                <div>
                  <p className="text-title">Hora entrega</p>
                  <p className="text-description">{moment(record.shippingDate).format('HH:mm')}</p>
                </div>
                <div className="border border-neutral-500 rounded-md py-1 px-2">
                  <p className="text-title">Lugar entrega</p>
                  <p className="text-xl font-medium">{record.shippingPlace}</p>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 grid-cols-3 gap-1 h-fit">
                <div className="flex flex-col">
                  <p className="text-title">Precio total</p>
                  <p className="text-subtitle">{record.price}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-title">Adelanto</p>
                  <p className="text-subtitle">{record.advancePayment}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-title">Pendiente</p>
                  {Number(record.pendingPayment) > 0 ? (
                    <p className="text-3xl font-medium text-red-500">
                      {record.pendingPayment}
                    </p>
                  ) : (
                    <p className="text-2xl font-normal text-neutral-500">
                      Cancelado
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-title">Estado:</p>
              <p className="text-xl font-medium">
                {record.completed ? 'Entregado' : 'No entregado'}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
