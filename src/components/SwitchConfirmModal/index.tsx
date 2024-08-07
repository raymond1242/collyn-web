import { Switch, Modal, Button } from "antd";
import { Order } from "@/services";
import { useState } from "react";
import { OrdersApiService } from "@/services";

interface Props {
  checked: boolean;
  record: Order;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export default function SwitchConfirmModal ({ checked, record, orders, setOrders }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(checked);
  const [loading, setLoading] = useState(false);

  const ordersApi = OrdersApiService();

  const onChangeDeliveryStatus = (status: boolean, currentOrder: Order) => {
    setOpenModal(true);
    setStatus(status);
  }

  const onConfirm = () => {
    setLoading(true);
    const requestParamas = {
      id: record.id as string,
      data: {
        delivered: status
      }
    }
    ordersApi.ordersUpdateDelivered(requestParamas).then((response) => {
      setLoading(false);
      setOpenModal(false);
      setOrders(orders.map(order => (order.id === record.id ? { ...order, delivered: response.delivered } : order)));
    }).catch((error) => {
      setLoading(false);
      console.error(error);
    });
  }

  return (
    <>
      <Switch checked={checked} onChange={(e) => onChangeDeliveryStatus(e, record)} />
      <Modal
        centered
        open={openModal}
        width={460}
        onCancel={() => setOpenModal(false)}
        onOk={() => {
          setOpenModal(false)
          setOrders(orders.map(order => (order.id === record.id ? { ...order, delivered: checked } : order)));
        }}
        footer={null}
      >
        <div className="flex flex-col gap-2">
          <p className="text-lg font-light">
            El pedido
            <span className="text-xl font-medium mx-1.5">
              {record.name}
            </span>
            será marcado como&nbsp;
            <span className="text-xl font-medium">
              {!checked ? 'entregado' : 'no entregado'}.
            </span>
          </p>
          <p className="text-lg font-medium">¿Estás seguro de continuar?</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button
              size="large"
              type="primary"
              loading={loading}
              onClick={() => onConfirm()}
            >
              Confirmar
            </Button>
            <Button
              size="large"
              onClick={() => setOpenModal(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
